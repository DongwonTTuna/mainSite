"""Anatomical facial sculpture for the tuna, authored without image textures.

The drawing coordinates locate bones and tissue; every visible detail is a
closed, shaded mesh.  In particular the eyes have continuous corneal domes and
the mouth is a recessed oral pocket surrounded by separate jaw structures.
"""

import math

from mathutils import Vector


def _curve(points, steps=7):
    """A centripetal-looking, interpolated artist curve with stable endpoints."""
    result = []
    for index in range(len(points) - 1):
        p0 = Vector(points[max(0, index - 1)])
        p1 = Vector(points[index])
        p2 = Vector(points[index + 1])
        p3 = Vector(points[min(len(points) - 1, index + 2)])
        for step in range(steps):
            t = step / steps
            result.append(tuple(0.5 * ((2 * p1) + (-p0 + p2) * t
                                + (2*p0 - 5*p1 + 4*p2 - p3) * t*t
                                + (-p0 + 3*p1 - 3*p2 + p3) * t*t*t)))
    result.append(tuple(points[-1]))
    return result


def _ribbon(ctx, name, path, width, lift, relief, material, side):
    """A sharpened anatomical edge, flattened across its width, with tapered ends.

    Unlike a round tube, the edge has a low elliptical section and settles into
    the skin.  Three rails on each face make a closed, genuinely solid strip.
    """
    points = _curve(path)
    vertices, faces = [], []
    for index, (u, v) in enumerate(points):
        before = Vector(points[max(0, index - 1)])
        after = Vector(points[min(len(points) - 1, index + 1)])
        tangent = (after - before).normalized()
        across = Vector((-tangent.y, tangent.x))
        t = index / (len(points) - 1)
        taper = 0.12 + 0.88 * math.sin(math.pi * t)**0.55
        for rail, height in ((-1, 0), (0, relief*taper), (1, 0),
                             (1, -0.35), (0, -0.45), (-1, -0.35)):
            offset = across * (width * taper * rail / 2)
            vertices.append(ctx.surface(u+offset.x, v+offset.y, side,
                                        lift+height))
    rails = 6
    for index in range(len(points)-1):
        for rail in range(rails):
            a = index*rails+rail
            b = index*rails+(rail+1) % rails
            faces.append((a, b, b+rails, a+rails))
    faces.append(tuple(reversed(range(rails))))
    faces.append(tuple((len(points)-1)*rails+i for i in range(rails)))
    return ctx.mesh(name, vertices, faces, material)


def _eye_frame(ctx, u, v, side):
    n = ctx.normal(u, v, side).normalized()
    along = ctx.surface(u+1, v, side) - ctx.surface(u-1, v, side)
    along = (along - n*along.dot(n)).normalized()
    down = ctx.surface(u, v+1, side) - ctx.surface(u, v-1, side)
    down = (down - n*down.dot(n) - along*down.dot(along)).normalized()
    center = ctx.surface(u, v, side, 2.2)
    return center, along, down, n


def _optical_eye(ctx, name, frame, mats):
    """One uninterrupted ocular dome with tissue material regions.

    Corneal gloss is the Principled dielectric coat over this convex surface.
    A continuous ocular boundary avoids intersecting refractive solids and
    keeps pupil, iris and limbus seated on the same smooth anatomical profile.
    """
    center, along, down, normal = frame
    segments = 96
    # Radius, anterior height, material for the annulus ending at this station.
    profile = [(4.0, 8.65, "pupil"), (8.0, 8.3, "pupil"),
               (10.8, 7.8, "pupil"), (12.3, 7.15, "pupil"),
               (13.0, 6.92, "iris"), (16.25, 6.05, "iris"),
               (17.0, 5.65, "iris_light"), (17.65, 5.25, "ivory"),
               (18.8, 4.7, "iris_gold"), (20.1, 4.0, "iris_gold"),
               (20.65, 3.6, "ink"), (21.6, 2.55, "ink"),
               (21.7, 0.9, "brow")]
    vertices = [center+normal*(8.75/ctx.scale)]
    for radius, height, _ in profile:
        for index in range(segments):
            a = index*2*math.pi/segments
            # Slightly taller posterior half is the globe's natural asymmetry.
            ry = radius*(1.025+0.015*math.sin(a))
            vertices.append(center+(along*(radius*math.cos(a))
                            + down*(ry*math.sin(a))+normal*height)/ctx.scale)
    back = len(vertices)
    vertices.append(center-normal*(0.35/ctx.scale))
    faces, regions = [], []
    for index in range(segments):
        nxt = (index+1) % segments
        faces.append((0, 1+index, 1+nxt))
        regions.append("pupil")
        for ring in range(len(profile)-1):
            a = 1+ring*segments+index
            b = 1+ring*segments+nxt
            faces.append((a, a+segments, b+segments, b))
            regions.append(profile[ring+1][2])
        edge = 1+(len(profile)-1)*segments
        faces.append((back, edge+nxt, edge+index))
        regions.append("ink")
    obj = ctx.mesh(name, vertices, faces, mats["pupil"])
    # A small authored enamel glint echoes the crisp illustrative eye.
    # It lies on the ocular dome, with real clearcoat reflections above it.
    for index,face in enumerate(faces):
        if back in face: continue
        midpoint=sum((vertices[i] for i in face), vertices[0]*0)/len(face)-center
        x,y=midpoint.dot(along)*ctx.scale,midpoint.dot(down)*ctx.scale
        if ((x+4.0)/3.6)**2+((y+6.2)/4.2)**2<1:
            regions[index]="eye_glint"
        elif regions[index]=="iris" and index%5==0:
            regions[index]="iris_light"
    slots = {"pupil": 0}
    for key in dict.fromkeys(regions):
        if key not in slots:
            slots[key] = len(obj.data.materials)
            obj.data.materials.append(mats[key])
    for face, key in zip(obj.data.polygons, regions):
        face.material_index = slots[key]
    return obj


def _build_eye(ctx, side, mats):
    suffix = "near" if side == 1 else "far"
    # The broad red preorbital tissue in the reference wraps around the globe;
    # its irregular shape prevents the eye from looking like an applied button.
    ctx.patch(f"Vermilion preorbital cheek {suffix}",
              [(235, 214), (261, 207), (283, 208), (303, 205),
               (322, 208), (334, 218), (342, 231), (340, 243),
               (325, 256), (305, 259), (287, 252), (269, 240),
               (249, 237)],
              1.2, 2.2, mats["brow"], side)
    ctx.patch(f"Ivory postorbital scale plane {suffix}",
              [(329, 207), (346, 216), (358, 230), (355, 231),
               (363, 245), (355, 242), (366, 254), (355, 252),
               (361, 263), (344, 258), (330, 249), (340, 237), (341, 222)],
              1.4, 1.2, mats["ivory"], side)
    frame = _eye_frame(ctx, 323, 228, side)
    _optical_eye(ctx, f"Continuous dark ocular dome {suffix}", frame, mats)
    # Partial orbital bones blend into soft tissue instead of surrounding it
    # with a second complete, mechanically concentric ring.
    _ribbon(ctx, f"Supraorbital brow {suffix}",
            [(299, 224), (304, 211), (317, 205), (331, 209), (341, 217)],
            2.8, 3.4, 0.85, mats["bone"], side)
    _ribbon(ctx, f"Supraorbital ivory crest {suffix}",
            [(305, 211), (315, 207), (325, 208), (333, 213)],
            1.1, 4.1, 0.4, mats["ivory"], side)
    _ribbon(ctx, f"Lower orbital skin fold {suffix}",
            [(305, 242), (317, 251), (330, 250), (341, 240)],
            1.8, 3.0, 0.5, mats["lip_red"], side)


def _mouth(ctx, side, mats):
    suffix = "near" if side == 1 else "far"
    # Upper and lower lips meet at the posterior commissure (285, 267).
    # Their gap is backed by an actual concave oral mesh, not a painted line.
    upper = _curve([(177, 222), (191, 217), (215, 224),
                    (239, 240), (265, 260), (285, 267)], 8)
    lower = _curve([(179, 228), (195, 231), (218, 239),
                    (243, 255), (267, 274), (285, 267)], 8)
    outline = upper + list(reversed(lower[:-1]))
    center_u = sum(p[0] for p in outline)/len(outline)
    center_v = sum(p[1] for p in outline)/len(outline)
    vertices, faces = [], []
    count = len(outline)
    for radial, height in ((1, 3.7), (0.79, 1.65), (0.37, 0.45)):
        for u, v in outline:
            vertices.append(ctx.surface(center_u+(u-center_u)*radial,
                                        center_v+(v-center_v)*radial,
                                        side, height))
    front_center = len(vertices)
    vertices.append(ctx.surface(center_u, center_v, side, 0.38))
    back_center = len(vertices)
    vertices.append(ctx.surface(center_u, center_v, side, 0.1))
    for index in range(count):
        nxt = (index+1) % count
        for ring in range(2):
            faces.append((ring*count+index, ring*count+nxt,
                          (ring+1)*count+nxt, (ring+1)*count+index))
        faces.append((2*count+index, 2*count+nxt, front_center))
        faces.append((index, back_center, nxt))
    ctx.mesh(f"Recessed oral vestibule {suffix}", vertices, faces, mats["mouth"])

    ctx.patch(f"Upper maxillary bone {suffix}",
              [(187, 203), (209, 207), (239, 223), (260, 242),
               (281, 263), (282, 267), (267, 260), (237, 239),
               (213, 223), (192, 217), (180, 222)],
              3.7, 3.0, mats["maxilla"], side)
    _ribbon(ctx, f"Upper lip vermilion edge {suffix}",
            [(180, 222), (192, 219), (216, 227), (244, 246), (278, 267)],
            2.9, 5.5, 1.1, mats["lip_red"], side)
    _ribbon(ctx, f"Lower dentary lip {suffix}",
            [(181, 229), (194, 231), (218, 241), (245, 258), (269, 274), (285, 267)],
            4.0, 4.9, 1.55, mats["bone"], side)
    _ribbon(ctx, f"Maxillary highlight ridge {suffix}",
            [(194, 205), (217, 212), (242, 229), (264, 250)],
            1.4, 6.6, 0.55, mats["silver"], side)
    # The anterior nostril is a short, open-looking soft-tissue depression.
    ctx.patch(f"Olfactory pit {suffix}",
              [(248, 207), (254, 202), (264, 201), (260, 209), (253, 214)],
              1.3, 0.3, mats["ink"], side)
    _ribbon(ctx, f"Nostril raised rim {suffix}",
            [(249, 208), (254, 202), (263, 202)],
            1.65, 2.1, 0.55, mats["silver"], side)


def _gills_and_jaw(ctx, side, mats):
    suffix = "near" if side == 1 else "far"
    ctx.patch(f"Sculpted lower dentary {suffix}",
              [(180, 232), (207, 244), (234, 265), (266, 291),
               (302, 315), (328, 337), (334, 360), (316, 379),
               (285, 365), (253, 343), (225, 314), (202, 279), (188, 250)],
              1.4, 4.1, mats["jaw"], side)
    ctx.patch(f"Dentary gold plane {suffix}",
              [(195, 240), (223, 251), (245, 264), (253, 278),
               (279, 294), (314, 319), (292, 316), (260, 297),
               (235, 279), (211, 256)],
              4.4, 1.0, mats["gold"], side)
    ctx.patch(f"Branchiostegal membrane {suffix}",
              [(225, 304), (255, 331), (301, 355), (340, 369),
               (381, 369), (410, 357), (419, 359), (399, 381),
               (365, 395), (332, 397), (304, 386), (279, 361), (246, 337)],
              1.9, 3.2, mats["membrane"], side)
    # The opercular cover overlaps the softer membrane with a free, fine edge.
    ctx.patch(f"Subopercular bone {suffix}",
              [(391, 244), (415, 255), (441, 281), (459, 316),
               (450, 339), (428, 358), (398, 369), (364, 371),
               (337, 357), (367, 343), (394, 318), (404, 284)],
              3.6, 5.1, mats["suboperculum"], side)
    ctx.patch(f"Raised opercular plate {suffix}",
              [(273, 261), (295, 265), (326, 262), (350, 251),
               (376, 235), (392, 241), (400, 259), (401, 283),
               (395, 307), (383, 328), (367, 339), (345, 340),
               (318, 332), (293, 319), (275, 299), (264, 279)],
              4.2, 7.6, mats["operculum"], side)
    _ribbon(ctx, f"Free opercular rear edge {suffix}",
            [(395, 244), (402, 267), (401, 295), (390, 323),
             (372, 342), (349, 347), (321, 339)],
            2.65, 6.3, 1.2, mats["ink"], side)
    _ribbon(ctx, f"Operculum nacre edge {suffix}",
            [(397, 269), (396, 299), (385, 322), (369, 333), (348, 336)],
            1.75, 7.6, 0.65, mats["ivory"], side)
    _ribbon(ctx, f"Posterior gill opening {suffix}",
            [(407, 250), (429, 272), (447, 302), (454, 324),
             (444, 344), (422, 361), (393, 374), (363, 378),
             (331, 369), (307, 356)],
            4.2, 4.8, 1.15, mats["ink"], side)
    _ribbon(ctx, f"Subopercular enamel rim {suffix}",
            [(424, 269), (440, 296), (447, 319), (438, 338), (416, 354)],
            2.0, 6.2, 0.75, mats["ivory"], side)
    _ribbon(ctx, f"Lower branchiostegal crease {suffix}",
            [(231, 314), (269, 348), (309, 376), (344, 390),
             (377, 389), (403, 378)],
            3.8, 4.0, 1.0, mats["ink"], side)
    _ribbon(ctx, f"Throat fold {suffix}",
            [(222, 308), (249, 347), (287, 382), (313, 410)],
            3.2, 3.1, 0.8, mats["ink"], side)
    _ribbon(ctx, f"Dentary underside light {suffix}",
            [(204, 281), (227, 320), (257, 348), (286, 365)],
            2.0, 3.5, 0.6, mats["ochre"], side)
    # Raised cheek channels follow bony anatomy, not painted random strokes.
    for index, (a, b, c) in enumerate([
            ((261, 219), (258, 227), (263, 235)),
            ((267, 218), (264, 226), (268, 234)),
            ((274, 218), (270, 226), (274, 234)),
            ((359, 244), (368, 253), (378, 259)),
            ((364, 237), (375, 246), (385, 251))]):
        _ribbon(ctx, f"Facial sensory ridge {suffix} {index+1}",
                [a, b, c], 1.1, 4.1, 0.5, mats["ivory"], side)


def build_face(ctx):
    """Build both sides of the fish's fully shaded anatomical face."""
    palette = {
        "ink": ("0B2448", 0.37, 0.12, 0.12),
        "mouth": ("170E26", 0.48, 0.0, 0.05),
        "maxilla": ("18364F", 0.31, 0.23, 0.18),
        "lip_red": ("E84043", 0.34, 0.12, 0.18),
        "bone": ("F5BE39", 0.33, 0.22, 0.15),
        "jaw": ("F86B35", 0.36, 0.11, 0.13),
        "gold": ("FFD14A", 0.36, 0.10, 0.14),
        "membrane": ("F94543", 0.40, 0.04, 0.10),
        "suboperculum": ("FFBC28", 0.34, 0.12, 0.20),
        "operculum": ("FFD34A", 0.34, 0.13, 0.20),
        "ochre": ("FFA934", 0.39, 0.13, 0.13),
        "ivory": ("FFF3CC", 0.28, 0.17, 0.16),
        "silver": ("E6EEF1", 0.23, 0.38, 0.28),
        "iris_gold": ("FFC839", 0.40, 0.12, 0.12),
        "iris": ("124E9A", 0.22, 0.0, 0.18),
        "iris_light": ("3B97CB", 0.24, 0.0, 0.18),
        "pupil": ("02081B", 0.22, 0.0, 0.08),
        "brow": ("F93D43", 0.42, 0.06, 0.12),
        "eye_glint": ("F3FDFF", 0.12, 0.0, 0.45),
    }
    mats = {key: ctx.material(f"Anatomy {key}", color, roughness=roughness,
                             metallic=metallic, coat=coat)
            for key, (color, roughness, metallic, coat) in palette.items()}
    # A corneal dielectric coat supplies physical highlights over the geometry;
    # no overlapping white glass volume washes out the iris and pupil.
    for key in ("pupil", "iris", "iris_light", "iris_gold"):
        shader = mats[key].node_tree.nodes.get("Principled BSDF")
        shader.inputs["IOR"].default_value = 1.333
        shader.inputs["Specular IOR Level"].default_value = 0.12 if key == "pupil" else 0.3
        shader.inputs["Coat IOR"].default_value = 1.333
        shader.inputs["Coat Roughness"].default_value = 0.08
    for side in (1, -1):
        _gills_and_jaw(ctx, side, mats)
        _mouth(ctx, side, mats)
        _build_eye(ctx, side, mats)
