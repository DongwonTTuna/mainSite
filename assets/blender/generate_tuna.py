"""Sculpt a complete tuna with independent PBR pigments and real anatomy.

The supplied illustration informs outlines and art direction only. No source
photograph, image projection, billboard, or unlit material is used.
"""
import argparse
from collections import Counter
import json
import math
from pathlib import Path
import struct
import sys
from types import SimpleNamespace

import bmesh
import bpy
import numpy as np
from mathutils import Vector
from mathutils.geometry import delaunay_2d_cdt, interpolate_bezier

HERE = Path(__file__).resolve().parent
sys.path.insert(0,str(HERE))
REPO = HERE.parents[1]
SHAPE = json.loads((HERE / "tuna-shapes.json").read_text())
FRAME, SCALE = 1024, 160
ROOT = None


def rgba(color):
    def linear(c):
        c = int(c,16)/255
        return c/12.92 if c<=0.04045 else ((c+0.055)/1.055)**2.4
    return tuple(linear(color[i:i+2]) for i in (0,2,4))+(1,)


def mix(a,b,t):
    t=max(0,min(1,float(t)))
    return tuple(x*(1-t)+y*t for x,y in zip(a,b))


def material(name, hex_color, roughness=0.4, metallic=0.1, coat=0.1):
    result=bpy.data.materials.new(name)
    result.use_nodes=True
    shader=result.node_tree.nodes.get("Principled BSDF")
    shader.inputs["Base Color"].default_value=rgba(hex_color)
    shader.inputs["Roughness"].default_value=roughness
    shader.inputs["Metallic"].default_value=metallic
    shader.inputs["Coat Weight"].default_value=coat
    shader.inputs["Coat Roughness"].default_value=0.3
    return result


def painted_material(name):
    result=material(name,"FFFFFF",0.62,0.0,0.04)
    shader=result.node_tree.nodes.get("Principled BSDF")
    paint=result.node_tree.nodes.new("ShaderNodeVertexColor")
    paint.layer_name="Paint"
    result.node_tree.links.new(paint.outputs["Color"],shader.inputs["Base Color"])
    return result


def body_material():
    from tuna_paint import pigment_color
    size=2048
    pixels=np.ones((size,size,4),dtype=np.float32)
    u=(np.arange(size)+0.5)[None,:]*FRAME/size
    for row in range(0,size,64):
        # Blender image buffers are bottom-up; drawing coordinates are top-down.
        v=FRAME-(np.arange(row,min(row+64,size))[:,None]+0.5)*FRAME/size
        pixels[row:row+64,:,:3]=pigment_color(u,v)
    image=bpy.data.images.new("Authored clean pigments",width=size,height=size,alpha=True)
    image.colorspace_settings.name="sRGB"
    image.pixels.foreach_set(pixels.ravel())
    image.filepath_raw=str(HERE/"tuna-pigments.png");image.file_format="PNG";image.save();image.pack()
    result=material("Painted body","FFFFFF",0.32,0,0.22)
    tex=result.node_tree.nodes.new("ShaderNodeTexImage");tex.image=image;tex.interpolation="Linear"
    result.node_tree.links.new(tex.outputs["Color"],result.node_tree.nodes["Principled BSDF"].inputs["Base Color"])
    return result


def configure_body_sections():
    global SECTION_S, SECTION_LO, SECTION_HI, FORWARD, CROSS
    outline=np.asarray(SHAPE["parts"][0]["outline"],dtype=float)
    FORWARD=np.asarray((0.685,0.7285));FORWARD/=np.linalg.norm(FORWARD)
    CROSS=np.asarray((-FORWARD[1],FORWARD[0]))
    along,across=outline@FORWARD,outline@CROSS
    SECTION_S=np.linspace(min(along)+0.001,max(along)-0.001,800)
    lows,highs=[],[]
    for s in SECTION_S:
        intersections=[]
        for i in range(len(outline)):
            j=(i+1)%len(outline)
            if min(along[i],along[j])<=s<max(along[i],along[j]):
                t=(s-along[i])/(along[j]-along[i])
                intersections.append(across[i]*(1-t)+across[j]*t)
        lows.append(min(intersections) if intersections else across[np.argmin(abs(along-s))])
        highs.append(max(intersections) if intersections else across[np.argmin(abs(along-s))])
    SECTION_LO,SECTION_HI=np.asarray(lows),np.asarray(highs)


def depths(coords):
    a=np.asarray(coords,dtype=float).reshape(-1,2)
    along,across=a@FORWARD,a@CROSS
    low=np.interp(along,SECTION_S,SECTION_LO)
    high=np.interp(along,SECTION_S,SECTION_HI)
    radius=np.maximum((high-low)/2,0.1)
    offset=(across-(low+high)/2)/radius
    depth=radius*0.72*np.sqrt(np.clip(1-offset**2,0,1))
    return np.maximum(depth,0.9)


def surface(u,v,side=1,lift=0):
    depth=float(depths([(u,v)])[0])+lift
    return Vector(((u-512)/SCALE,-side*depth/SCALE,(512-v)/SCALE))


def normal(u,v,side=1):
    values=depths([(u+0.5,v),(u-0.5,v),(u,v+0.5),(u,v-0.5)])
    du,dv=values[0]-values[1],values[2]-values[3]
    return Vector((-du,-side,dv)).normalized()


def resample_outline(outline,step=4):
    result=[]
    for first,second in zip(outline,outline[1:]+outline[:1]):
        count=max(1,math.ceil(math.dist(first,second)/step))
        for i in range(count):
            t=i/count
            result.append(Vector((first[0]*(1-t)+second[0]*t,first[1]*(1-t)+second[1]*t)))
    return result


def triangulate(outline,spacing=6):
    boundary=resample_outline(outline)
    vertices=boundary.copy()
    low,high=np.min(outline,axis=0),np.max(outline,axis=0)
    for row,y in enumerate(np.arange(low[1]+spacing/2,high[1],spacing)):
        for x in np.arange(low[0]+spacing/2+(row%2)*spacing/2,high[0],spacing):
            vertices.append(Vector((x,y)))
    edges=[(i,(i+1)%len(boundary)) for i in range(len(boundary))]
    points,_,faces,_,_,_=delaunay_2d_cdt(vertices,edges,[],1,0.001,False)
    used=sorted({i for face in faces for i in face})
    mapping={old:new for new,old in enumerate(used)}
    return [tuple(points[i]) for i in used],[tuple(mapping[i] for i in face) for face in faces]


def distance_to_outline(coords,outline):
    points=np.asarray(coords,dtype=float)
    distance=np.full(len(points),np.inf)
    for a,b in zip(outline,outline[1:]+outline[:1]):
        start=np.asarray(a,dtype=float)
        direction=np.asarray(b,dtype=float)-start
        t=np.clip(((points-start)@direction)/(direction@direction),0,1)
        distance=np.minimum(distance,np.linalg.norm(points-(start+t[:,None]*direction),axis=1))
    return distance


def mesh(name,vertices,faces,shader,colors=None,parent=None):
    data=bpy.data.meshes.new(name)
    data.from_pydata(vertices,[],faces);data.update()
    bm=bmesh.new();bm.from_mesh(data)
    bmesh.ops.recalc_face_normals(bm,faces=bm.faces)
    bm.to_mesh(data);bm.free()
    for polygon in data.polygons: polygon.use_smooth=True
    if colors is not None:
        attribute=data.color_attributes.new(name="Paint",type="FLOAT_COLOR",domain="POINT")
        attribute.data.foreach_set("color",[channel for color in colors for channel in color])
        data.color_attributes.active_color_index=0
    obj=bpy.data.objects.new(name,data)
    bpy.context.collection.objects.link(obj)
    obj.data.materials.append(shader)
    obj.parent=parent if parent is not None else ROOT
    return obj


def solid_mesh(name,coords,triangles,front,back,shader,colors=None,parent=None,pivot=(0,0,0)):
    def position(index,depth):
        u,v=coords[index]
        return Vector(((u-512)/SCALE,-depth/SCALE,(512-v)/SCALE))-Vector(pivot)
    count=len(coords)
    vertices=[position(i,front[i]) for i in range(count)]+[position(i,back[i]) for i in range(count)]
    faces=list(triangles)+[tuple(i+count for i in reversed(face)) for face in triangles]
    edges=Counter(tuple(sorted((a,b))) for face in triangles for a,b in zip(face,face[1:]+face[:1]))
    faces.extend((a,b,b+count,a+count) for (a,b),uses in edges.items() if uses==1)
    return mesh(name,vertices,faces,shader,colors,parent)


def patch(name,outline,lift,bulge,material,side=1,color_fn=None):
    coords,triangles=triangulate(outline,4)
    distance=distance_to_outline(coords,outline)
    dome=np.clip(distance/4.0,0,1)
    dome=dome*dome*(3-2*dome)
    base=depths(coords)+lift
    front=side*(base+bulge*dome)
    back=side*(base-0.9)
    colors=([color_fn(u,v) for u,v in coords]*2) if color_fn else None
    return solid_mesh(name,coords,triangles,front,back,material,colors)


def smooth_path(points,steps=6):
    points=[Vector(point) for point in points]
    result=[]
    for i in range(len(points)-1):
        before=points[max(0,i-1)];a=points[i];b=points[i+1];after=points[min(len(points)-1,i+2)]
        result.extend(interpolate_bezier(a,a+(b-before)/6,b-(after-a)/6,b,steps)[:-1])
    return result+[points[-1]]


def world_tube(name,points,radius,shader,parent=None,sides=8,smooth=True):
    points=smooth_path(points) if smooth else [Vector(p) for p in points]
    vertices=[];faces=[]
    for i,point in enumerate(points):
        tangent=(points[min(i+1,len(points)-1)]-points[max(i-1,0)]).normalized()
        reference=Vector((0,1,0)) if abs(tangent.y)<0.95 else Vector((1,0,0))
        n=tangent.cross(reference).normalized();bitangent=tangent.cross(n).normalized()
        r=radius*(0.2+0.8*math.sin(math.pi*i/(len(points)-1))**0.35)
        for j in range(sides):
            vertices.append(point+r*(n*math.cos(j*math.tau/sides)+bitangent*math.sin(j*math.tau/sides)))
    for i in range(len(points)-1):
        for j in range(sides):
            a=i*sides+j;b=i*sides+(j+1)%sides
            faces.append((a,b,b+sides,a+sides))
    faces.append(tuple(reversed(range(sides))))
    faces.append(tuple((len(points)-1)*sides+j for j in range(sides)))
    return mesh(name,vertices,faces,shader,parent=parent)


def tube(name,points,radius,material,side=1):
    points=smooth_path(points,5)
    positions=[surface(p.x,p.y,side,p.z) for p in points]
    return world_tube(name,positions,radius/SCALE,material)


def fin_color(name,u,v,distance):
    navy=rgba("092B4B");blue=rgba("17688B");cyan=rgba("6BBAD3")
    red=rgba("EF3348");gold=rgba("FFB62F")
    if name=="Dorsal":
        t=np.clip((v-146)/155,0,1)
        color=mix(gold,red,t)
        color=mix(color,navy,np.clip((5-distance)/5,0,1)*0.9)
    elif name=="TailFan":
        t=np.clip((v-708)/168,0,1)
        color=mix(rgba("6C1630"),red,t**0.55)
        color=mix(color,rgba("FF8290"),t**3*0.65)
    else:
        t=np.clip((v-355)/(335 if name=="Ventral" else 120),0,1)
        color=mix(navy,blue,t)
        color=mix(color,cyan,max(0,1-distance/9)*0.7)
        if name=="Anal": color=mix(red,color,np.clip((v-607)/65,0,1))
    return color


def build_fin(part,shader,tail,edge_glaze):
    name=part["name"]
    coords,triangles=triangulate(part["outline"],4.5)
    distance=distance_to_outline(coords,part["outline"])
    c=np.asarray(coords)
    if name=="Pectoral":
        t=np.clip((c[:,0]-428)/195,0,1)
        center=depths(coords)+4+t*38
        half=1.0+6*np.sqrt(np.clip(distance/26,0,1))
    elif name=="Ventral":
        center=15+np.clip((c[:,1]-440)/250,0,1)*18
        half=0.8+7*np.sqrt(np.clip(distance/30,0,1))
    else:
        center=np.full(len(coords),0.0)
        half=0.55+part["depth"]*0.5*np.sqrt(np.clip(distance/30,0,1))
    # Model actual membrane corrugations; no reference imagery is involved.
    base=np.asarray(part["outline"][0])
    angle=np.arctan2(c[:,1]-base[1],c[:,0]-base[0])
    half*=1+0.055*np.sin(angle*44)*np.minimum(distance/6,1)
    colors=[fin_color(name,u,v,float(d)) for (u,v),d in zip(coords,distance)]
    parent=tail if name=="TailFan" else ROOT
    pivot=tuple(tail.location) if parent==tail else (0,0,0)
    fin=solid_mesh(name,coords,triangles,center+half,center-half,shader,colors*2,parent,pivot)
    # A thin continuous glazed edge avoids a jagged triangle-material border.
    if name in ("Dorsal","TailFan"):
        outline=part["outline"]
        rim=[Vector(((u-512)/SCALE,0,(512-v)/SCALE))-Vector(pivot) for u,v in outline+[outline[0]]]
        world_tube(name+" glazed rim",rim,0.7/SCALE,edge_glaze,parent,6)
    if name in ("Pectoral","Ventral"):
        solid_mesh("Far "+name,coords,triangles,-center-half,-center+half,shader,colors*2,ROOT)
    return coords,center,half


def fin_rays(part,shader,tail):
    name=part["name"]
    if name=="Pectoral":
        paths=[[(432,361+i*3),(485,368+i*6),(557,394+i*5),(612-i*6,424)] for i in range(7)]
    elif name=="Dorsal":
        paths=[[(504+i*12,227+i*8),(550+i*8,209+i*8),(609,151+i*16)] for i in range(8)]
    elif name=="Ventral":
        paths=[[(320+i*7,450+i*5),(325+i*7,528+i*7),(360+i*5,675-i*17)] for i in range(7)]
    elif name=="TailFan":
        paths=[]
        for i in range(7):
            paths.append([(711,711),(660-i*4,767+i*6),(533+i*15,867-i*8)])
            paths.append([(720,713),(756+i*5,771+i*5),(839-i*8,866-i*9)])
    else: return
    for side in (-1,1):
        for i,path in enumerate(paths):
            path=[tuple(point) for point in smooth_path(path,12)]
            distance=distance_to_outline(path,part["outline"])
            points=[]
            for (u,v),d in zip(path,distance):
                if name=="Pectoral":
                    t=np.clip((u-428)/195,0,1);center=float(depths([(u,v)])[0])+4+t*38;half=1+6*math.sqrt(min(d/26,1))
                elif name=="Ventral":
                    center=15+np.clip((v-440)/250,0,1)*18;half=0.8+7*math.sqrt(min(d/30,1))
                else: center=0;half=0.55+part["depth"]*0.5*math.sqrt(min(d/30,1))
                base=part["outline"][0]
                angle=math.atan2(v-base[1],u-base[0])
                half*=1+0.055*math.sin(angle*44)*min(d/6,1)
                points.append(Vector(((u-512)/SCALE,-side*(center+half+0.7)/SCALE,(512-v)/SCALE)))
            parent=tail if name=="TailFan" else ROOT
            if parent==tail: points=[p-tail.location for p in points]
            world_tube(f"{name} rib {side} {i}",points,0.65/SCALE,shader,parent,6,smooth=False)


def point_camera(obj,target):
    obj.rotation_euler=(Vector(target)-obj.location).to_track_quat("-Z","Y").to_euler()


def camera(name,location,target=(0,0,0),ortho=6.4):
    data=bpy.data.cameras.new(name);data.type="ORTHO";data.ortho_scale=ortho
    obj=bpy.data.objects.new(name,data);bpy.context.collection.objects.link(obj)
    obj.location=location;point_camera(obj,target)
    return obj


def area_light(name,location,energy,size,color):
    data=bpy.data.lights.new(name,"AREA");data.energy=energy;data.shape="DISK";data.size=size;data.color=color
    obj=bpy.data.objects.new(name,data);bpy.context.collection.objects.link(obj)
    obj.location=location;point_camera(obj,(0,0,0));return obj


def configure_stage(samples,resolution):
    scene=bpy.context.scene;scene.render.engine="CYCLES"
    scene.cycles.samples=samples;scene.cycles.use_denoising=True
    scene.render.resolution_x=resolution;scene.render.resolution_y=resolution;scene.render.resolution_percentage=100
    scene.render.film_transparent=True
    scene.render.image_settings.file_format="WEBP";scene.render.image_settings.color_mode="RGBA";scene.render.image_settings.quality=96
    scene.view_settings.view_transform="Khronos PBR Neutral";scene.view_settings.look="None"
    scene.view_settings.exposure=-0.35
    world=bpy.data.worlds.new("Studio world");world.use_nodes=True;scene.world=world
    world.node_tree.nodes["Background"].inputs["Color"].default_value=(0.32,0.4,0.52,1)
    world.node_tree.nodes["Background"].inputs["Strength"].default_value=0.25
    scene.camera=camera("Portrait camera",(0,-12,0))
    camera("Three-quarter camera",(5.3,-10,1.1))
    camera("Rear camera",(3.5,10,1))
    area_light("Key softbox",(-4,-5,7),750,5.0,(1,0.91,0.78))
    area_light("Broad cool fill",(4,-4,0.8),380,4.5,(0.68,0.86,1))
    area_light("Rim",(1,4,4),950,3,(0.52,0.78,1))
    area_light("Eye reflection",(-4,-7,4),80,1.3,(1,1,1))
    for screen in bpy.data.screens:
        for area in screen.areas:
            if area.type=="VIEW_3D":
                space=area.spaces.active;space.shading.type="MATERIAL"
                space.region_3d.view_perspective="CAMERA";space.overlay.show_overlays=False


def web_batches():
    groups={}
    bpy.context.view_layer.update()
    for obj in list(bpy.context.scene.objects):
        if obj.type!="MESH": continue
        for index,shader in enumerate(obj.data.materials):
            polygons=[p for p in obj.data.polygons if p.material_index==index]
            if polygons: groups.setdefault((obj.parent,shader),[]).append((obj,polygons))
    batches=[]
    for (parent,shader),parts in groups.items():
        vertices=[];faces=[];colors=[]
        painted=any("Paint" in obj.data.color_attributes for obj,_ in parts)
        for obj,polygons in parts:
            transform=parent.matrix_world.inverted()@obj.matrix_world
            used=sorted({i for p in polygons for i in p.vertices})
            mapping={old:len(vertices)+i for i,old in enumerate(used)}
            vertices.extend(transform@obj.data.vertices[i].co for i in used)
            faces.extend(tuple(mapping[i] for i in p.vertices) for p in polygons)
            if painted:
                attr=obj.data.color_attributes.get("Paint")
                if attr and attr.domain=="POINT": colors.extend(tuple(attr.data[i].color) for i in used)
                else: colors.extend([(1,1,1,1)]*len(used))
        batch=mesh("Web "+shader.name,vertices,faces,shader,colors if painted else None,parent)
        if shader.name=="Painted body":
            uv=batch.data.uv_layers.new(name="Pigment coordinates")
            for loop in batch.data.loops:
                vertex=batch.data.vertices[loop.vertex_index].co
                uv.data[loop.index].uv=((vertex.x*SCALE+512)/FRAME,(vertex.z*SCALE+512)/FRAME)
        batches.append(batch)
    return batches


def export_model():
    batches=web_batches()
    for obj in bpy.context.scene.objects: obj.select_set(obj in batches or obj.type=="EMPTY")
    bpy.context.view_layer.objects.active=ROOT
    path=REPO/"static/models/dongwon-tuna.glb"
    bpy.ops.export_scene.gltf(filepath=str(path),export_format="GLB",use_selection=True,
        export_yup=True,export_apply=True,export_cameras=False,export_lights=False,export_animations=False,
        export_extras=False,export_texcoords=True)
    for obj in batches:
        data=obj.data;bpy.data.objects.remove(obj,do_unlink=True);bpy.data.meshes.remove(data)
    payload=path.read_bytes();doc=json.loads(payload[20:20+struct.unpack_from("<I",payload,12)[0]])
    triangles=sum(doc["accessors"][p["indices"]]["count"]//3 for m in doc["meshes"] for p in m["primitives"])
    if len(doc.get("images",[]))!=1 or "KHR_materials_unlit" in doc.get("extensionsUsed",[]):
        raise RuntimeError("Expected one independently authored pigment map and lit PBR geometry")
    if len(payload)>=3_000_000: raise RuntimeError(f"GLB exceeds 3 MB: {len(payload)}")
    print("TUNA_REPORT",json.dumps({"bytes":len(payload),"triangles":triangles,"meshes":len(doc["meshes"]),"materials":len(doc["materials"]),"images":len(doc.get("images",[]))}))


def main():
    global ROOT
    parser=argparse.ArgumentParser();parser.add_argument("--samples",type=int,default=64)
    parser.add_argument("--resolution",type=int,default=1000);parser.add_argument("--no-render",action="store_true")
    args=parser.parse_args(sys.argv[sys.argv.index("--")+1:] if "--" in sys.argv else [])
    bpy.ops.object.select_all(action="SELECT");bpy.ops.object.delete(use_global=False)
    for collection in (bpy.data.meshes,bpy.data.materials,bpy.data.images,bpy.data.cameras):
        for block in list(collection):
            if block.users==0: collection.remove(block)
    ROOT=bpy.data.objects.new("Tuna",None);bpy.context.collection.objects.link(ROOT)
    tail=bpy.data.objects.new("Tail",None);bpy.context.collection.objects.link(tail);tail.parent=ROOT
    tail.location=((711-512)/SCALE,0,(512-711)/SCALE)
    configure_body_sections()
    from tuna_face import build_face
    body_shader=body_material();fin_shader=painted_material("Painted fin membranes")
    part=SHAPE["parts"][0];coords,triangles=triangulate(part["outline"],5)
    half=depths(coords)
    body=solid_mesh("Body",coords,triangles,half,-half,body_shader)
    uv=body.data.uv_layers.new(name="Pigment coordinates")
    for loop in body.data.loops:
        vertex=body.data.vertices[loop.vertex_index].co
        uv.data[loop.index].uv=((vertex.x*SCALE+512)/FRAME,(vertex.z*SCALE+512)/FRAME)
    ctx=SimpleNamespace(root=ROOT,body=body,scale=SCALE,surface=surface,normal=normal,material=material,tube=tube,patch=patch,mesh=mesh)
    edge_glaze=material("Glazed fin edges","22546D",0.32,0.0,0.22)
    edge_glaze.node_tree.nodes["Principled BSDF"].inputs["Transmission Weight"].default_value=0.0
    edge_glaze.node_tree.nodes["Principled BSDF"].inputs["IOR"].default_value=1.46
    edge_glaze.node_tree.nodes["Principled BSDF"].inputs["Coat Roughness"].default_value=0.08
    for part in SHAPE["parts"][1:]: build_fin(part,fin_shader,tail,edge_glaze)
    rib_shader=material("Fin ray pigment","16384E",0.47,0.05,0.08)
    for part in SHAPE["parts"][1:]: fin_rays(part,rib_shader,tail)
    build_face(ctx)
    # Clean dielectric glaze over opaque pigment; no metallic body response.
    for shader in bpy.data.materials:
        if shader.name in ("Painted body","Anatomy operculum","Anatomy suboperculum","Anatomy jaw","Anatomy gold","Anatomy membrane"):
            node=shader.node_tree.nodes.get("Principled BSDF")
            node.inputs["Roughness"].default_value=0.32
            node.inputs["Metallic"].default_value=0.0
            node.inputs["Coat Weight"].default_value=0.22
            node.inputs["Coat Roughness"].default_value=0.18
    configure_stage(args.samples,args.resolution)
    export_model()
    bpy.context.preferences.filepaths.save_version=0
    bpy.ops.wm.save_as_mainfile(filepath=str(HERE/"dongwon-tuna.blend"),compress=True)
    if not args.no_render:
        bpy.context.scene.render.filepath=str(REPO/"static/images/tuna-poster.webp")
        bpy.ops.render.render(write_still=True)


if __name__=="__main__": main()
