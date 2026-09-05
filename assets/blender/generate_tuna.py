import argparse
import array
import json
import math
import random
import struct
import sys
from pathlib import Path

import bmesh
import bpy
from mathutils import Vector


OUTPUT_DIRECTORY = Path(__file__).resolve().parent
REPOSITORY = OUTPUT_DIRECTORY.parents[1]
MODEL_PATH = REPOSITORY / "static/models/dongwon-tuna.glb"
POSTER_PATH = REPOSITORY / "static/images/tuna-poster.webp"
BLEND_PATH = OUTPUT_DIRECTORY / "dongwon-tuna.blend"
PALETTE = {
    "ink": "071A35",
    "navy": "0A2546",
    "blue": "115775",
    "cyan": "53C4D1",
    "ice": "BEF0E8",
    "cream": "FFF2B0",
    "gold": "FFBC17",
    "amber": "F89B09",
    "orange": "FF6519",
    "red": "E9212E",
    "coral": "FF4845",
    "wine": "9A203A",
}


def linear_channel(value):
    return value / 12.92 if value <= 0.04045 else ((value + 0.055) / 1.055) ** 2.4


def rgba(value):
    value = PALETTE.get(value, value)
    return tuple(linear_channel(int(value[index:index + 2], 16) / 255) for index in (0, 2, 4)) + (1.0,)


COLORS = {name: rgba(value) for name, value in PALETTE.items()}


def mix(first, second, factor):
    factor = max(0.0, min(1.0, factor))
    return tuple(start + (end - start) * factor for start, end in zip(first, second))


def gradient(stops, position):
    if position <= stops[0][0]:
        return COLORS[stops[0][1]]
    for (start, first), (end, second) in zip(stops, stops[1:]):
        if position <= end:
            return mix(COLORS[first], COLORS[second], (position - start) / (end - start))
    return COLORS[stops[-1][1]]


def material(name, color="cream", roughness=0.35, metallic=0.18, painted=False, coat=0.25):
    result = bpy.data.materials.new(name)
    result.use_nodes = True
    shader = result.node_tree.nodes.get("Principled BSDF")
    shader.inputs["Base Color"].default_value = rgba(color)
    shader.inputs["Roughness"].default_value = roughness
    shader.inputs["Metallic"].default_value = metallic
    shader.inputs["Coat Weight"].default_value = coat
    shader.inputs["Coat Roughness"].default_value = 0.24
    if painted:
        paint = result.node_tree.nodes.new("ShaderNodeVertexColor")
        paint.layer_name = "Paint"
        paint.label = "Editable baked pigment"
        result.node_tree.links.new(paint.outputs["Color"], shader.inputs["Base Color"])
    return result


def mesh_object(name, vertices, faces, shader, colors=None, parent=None):
    mesh = bpy.data.meshes.new(name)
    mesh.from_pydata(vertices, [], faces)
    mesh.update()
    working_mesh = bmesh.new()
    working_mesh.from_mesh(mesh)
    bmesh.ops.recalc_face_normals(working_mesh, faces=working_mesh.faces)
    working_mesh.to_mesh(mesh)
    working_mesh.free()
    for polygon in mesh.polygons:
        polygon.use_smooth = True
    if colors is not None:
        attribute = mesh.color_attributes.new(name="Paint", type="FLOAT_COLOR", domain="POINT")
        attribute.data.foreach_set("color", [channel for color in colors for channel in color])
        mesh.color_attributes.active_color_index = 0
    result = bpy.data.objects.new(name, mesh)
    bpy.context.collection.objects.link(result)
    result.data.materials.append(shader)
    result.parent = parent if parent is not None else ROOT
    return result


PROFILE = [
    (-2.12, 0.014, 0.018, 0.18),
    (-2.02, 0.16, 0.19, 0.16),
    (-1.82, 0.32, 0.37, 0.13),
    (-1.50, 0.47, 0.60, 0.085),
    (-1.08, 0.595, 0.785, 0.035),
    (-0.62, 0.635, 0.865, 0.0),
    (-0.12, 0.58, 0.78, -0.02),
    (0.40, 0.43, 0.58, -0.035),
    (0.88, 0.255, 0.35, -0.035),
    (1.25, 0.12, 0.16, -0.025),
    (1.55, 0.078, 0.085, -0.005),
    (1.69, 0.014, 0.022, 0.0),
]


def profile(position):
    position = max(PROFILE[0][0], min(PROFILE[-1][0], position))
    for index in range(len(PROFILE) - 1):
        if position <= PROFILE[index + 1][0]:
            before = PROFILE[max(0, index - 1)]
            start = PROFILE[index]
            end = PROFILE[index + 1]
            after = PROFILE[min(len(PROFILE) - 1, index + 2)]
            factor = (position - start[0]) / (end[0] - start[0])
            values = []
            for component in (1, 2, 3):
                lower_slope = (end[component] - before[component]) / (end[0] - before[0])
                upper_slope = (after[component] - start[component]) / (after[0] - start[0])
                interval = end[0] - start[0]
                value = (2 * factor ** 3 - 3 * factor ** 2 + 1) * start[component]
                value += (factor ** 3 - 2 * factor ** 2 + factor) * lower_slope * interval
                value += (-2 * factor ** 3 + 3 * factor ** 2) * end[component]
                value += (factor ** 3 - factor ** 2) * upper_slope * interval
                values.append(value)
            return max(0.005, values[0]), max(0.005, values[1]), values[2]
    return PROFILE[-1][1:]


def surface(position, height, side=-1, lift=0.0):
    radius, vertical_radius, center = profile(position)
    relative = max(-0.992, min(0.992, (height - center) / vertical_radius))
    depth = radius * math.sqrt(1.0 - relative ** 2)
    return Vector((position, side * (depth + lift), center + relative * vertical_radius))


def body_color(position, vertical, angle):
    grain = math.sin(position * 31 + math.sin(angle * 13)) * math.sin(angle * 23 + position * 9)
    broken_edge = vertical + 0.028 * math.sin(position * 8) + 0.035 * grain
    result = gradient([
        (-1.0, "wine"), (-0.85, "red"), (-0.60, "red"),
        (-0.39, "orange"), (-0.08, "amber"), (0.20, "gold"),
        (0.40, "gold"), (0.465, "gold"), (0.52, "blue"),
        (0.73, "navy"), (1.0, "ink"),
    ], broken_edge)
    if 0.20 < vertical < 0.61 and position > -1.2:
        fleck = math.sin(position * 54 + vertical * 31) * math.sin(vertical * 69 - position * 19)
        if fleck > 0.64:
            result = mix(result, COLORS["cyan" if vertical > 0.40 else "orange"], 0.52)
    if position < -1.38 and -0.12 < vertical < 0.52:
        cheek = math.exp(-((position + 1.69) / 0.34) ** 4 - ((vertical - 0.27) / 0.3) ** 4)
        result = mix(result, COLORS["red"], cheek * 0.8)
    return mix(result, COLORS["cream"], max(0, grain) * 0.025)


def build_body():
    vertices = []
    colors = []
    faces = []
    rings = 108
    segments = 80
    for ring in range(rings):
        position = PROFILE[0][0] + (PROFILE[-1][0] - PROFILE[0][0]) * ring / (rings - 1)
        radius, vertical_radius, center = profile(position)
        for segment in range(segments):
            angle = math.tau * segment / segments
            vertical = math.sin(angle)
            depth = -radius * math.cos(angle)
            depth *= 1 + 0.012 * math.sin(position * 5 + angle * 4)
            vertices.append((position, depth, center + vertical_radius * vertical))
            colors.append(body_color(position, vertical, angle))
    for ring in range(rings - 1):
        for segment in range(segments):
            first = ring * segments + segment
            following = ring * segments + (segment + 1) % segments
            faces.append((first, following, following + segments, first + segments))
    faces.append(tuple(reversed(range(segments))))
    faces.append(tuple((rings - 1) * segments + index for index in range(segments)))
    return mesh_object("Body • hand-painted fuselage", vertices, faces, BODY_MATERIAL, colors)


def catmull_points(points, subdivisions=8, closed=False):
    points = [Vector(point) for point in points]
    samples = []
    intervals = len(points) if closed else len(points) - 1
    for index in range(intervals):
        before = points[(index - 1) % len(points)] if closed else points[max(0, index - 1)]
        start = points[index]
        end = points[(index + 1) % len(points)]
        after = points[(index + 2) % len(points)] if closed else points[min(len(points) - 1, index + 2)]
        for step in range(subdivisions):
            factor = step / subdivisions
            samples.append(0.5 * ((2 * start) + (-before + end) * factor
                + (2 * before - 5 * start + 4 * end - after) * factor ** 2
                + (-before + 3 * start - 3 * end + after) * factor ** 3))
    if not closed:
        samples.append(points[-1])
    return samples


def tube(name, points, radius, shader, taper=True, subdivisions=6, sides=8, parent=None):
    points = catmull_points(points, subdivisions)
    vertices = []
    faces = []
    for index, point in enumerate(points):
        tangent = (points[min(index + 1, len(points) - 1)] - points[max(0, index - 1)]).normalized()
        reference = Vector((0, 1, 0))
        if abs(tangent.dot(reference)) > 0.95:
            reference = Vector((0, 0, 1))
        normal = tangent.cross(reference).normalized()
        bitangent = tangent.cross(normal).normalized()
        factor = index / (len(points) - 1)
        width = radius * (0.22 + 0.78 * math.sin(math.pi * factor) ** 0.42) if taper else radius
        for segment in range(sides):
            angle = math.tau * segment / sides
            vertices.append(point + width * (normal * math.cos(angle) + bitangent * math.sin(angle)))
    for index in range(len(points) - 1):
        for segment in range(sides):
            first = index * sides + segment
            following = index * sides + (segment + 1) % sides
            faces.append((first, following, following + sides, first + sides))
    faces.append(tuple(reversed(range(sides))))
    faces.append(tuple((len(points) - 1) * sides + index for index in range(sides)))
    return mesh_object(name, vertices, faces, shader, parent=parent)


def surface_tube(name, points, radius, shader, side=-1, lift=0.012):
    samples = catmull_points([(position, 0, height) for position, height in points], 7)
    projected = [surface(point.x, point.z, side, lift) for point in samples]
    return tube(name, projected, radius, shader, subdivisions=1)


def sphere(name, location, scale, shader, normal=None, segments=40, rings=24):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=segments, ring_count=rings, location=location)
    result = bpy.context.object
    result.name = name
    result.scale = scale
    if normal is not None:
        result.rotation_euler = normal.to_track_quat("Z", "Y").to_euler()
    for polygon in result.data.polygons:
        polygon.use_smooth = True
    result.data.materials.append(shader)
    result.parent = ROOT
    return result


def build_eye(side):
    position = surface(-1.58, 0.32, side, 0.018)
    normal = Vector((-0.38, side * 0.89, 0.24)).normalized()
    horizontal = Vector((1, 0, 0))
    horizontal = (horizontal - normal * normal.dot(horizontal)).normalized()
    upward = normal.cross(horizontal).normalized() * (-side)
    label = "Near" if side < 0 else "Far"
    sphere(f"{label} eye • sculpted socket", position, (0.205, 0.205, 0.048), INK_MATERIAL, normal)
    sphere(f"{label} eye • antique gold iris", position + normal * 0.034, (0.179, 0.179, 0.058), GOLD_MATERIAL, normal)
    sphere(f"{label} eye • petrol limbal ring", position + normal * 0.075, (0.141, 0.141, 0.032), CYAN_MATERIAL, normal)
    sphere(f"{label} eye • glossy obsidian", position + normal * 0.091, (0.121, 0.121, 0.048), EYE_MATERIAL, normal)
    reflection = position + normal * 0.135 - horizontal * 0.034 + upward * 0.043
    sphere(f"{label} eye • keylight glint", reflection, (0.018, 0.025, 0.007), GLINT_MATERIAL, normal, 20, 12)
    sphere(f"{label} eye • small reflection", position + normal * 0.139 + horizontal * 0.045 - upward * 0.045,
           (0.010, 0.014, 0.006), GLINT_MATERIAL, normal, 16, 10)
    for index in range(16):
        angle = math.tau * index / 16
        radial = horizontal * math.cos(angle) + upward * math.sin(angle)
        inner = position + normal * 0.077 + radial * 0.146
        outer = position + normal * 0.068 + radial * 0.166
        tube(f"{label} iris engraved ray {index + 1:02}", [inner, outer], 0.0045,
             AMBER_MATERIAL, subdivisions=1, sides=5)


def build_gill(side):
    center = Vector((-1.11, 0, -0.07))
    boundary = catmull_points([
        (-1.54, 0, 0.14), (-1.40, 0, 0.43), (-1.02, 0, 0.53),
        (-0.79, 0, 0.31), (-0.72, 0, -0.04), (-0.91, 0, -0.43),
        (-1.27, 0, -0.48), (-1.58, 0, -0.21),
    ], 5, True)
    vertices = [surface(center.x, center.z, side, 0.04)]
    colors = [COLORS["gold"]]
    faces = []
    rings = 8
    for ring in range(1, rings + 1):
        factor = ring / rings
        for point in boundary:
            projected = center.lerp(point, factor)
            lift = 0.008 + 0.032 * (1 - factor ** 2)
            vertices.append(surface(projected.x, projected.z, side, lift))
            color = gradient([(-0.50, "red"), (-0.26, "orange"), (0.03, "amber"), (0.44, "gold")], projected.z)
            colors.append(mix(color, COLORS["amber"], 0.12 * math.sin(projected.x * 34 + projected.z * 17) ** 2))
    segments = len(boundary)
    for segment in range(segments):
        faces.append((0, segment + 1, (segment + 1) % segments + 1))
    for ring in range(rings - 1):
        for segment in range(segments):
            first = 1 + ring * segments + segment
            following = 1 + ring * segments + (segment + 1) % segments
            faces.append((first, following, following + segments, first + segments))
    faces.append(tuple(reversed([1 + (rings - 1) * segments + segment for segment in range(segments)])))
    label = "Near" if side < 0 else "Far"
    mesh_object(f"{label} gill • raised operculum", vertices, faces, BODY_MATERIAL, colors)
    surface_tube(f"{label} gill • navy crescent", [(-1.02, 0.56), (-0.77, 0.32), (-0.72, -0.02),
        (-0.86, -0.38), (-1.16, -0.51), (-1.45, -0.37)], 0.025, INK_MATERIAL, side, 0.023)
    surface_tube(f"{label} gill • gilded bevel", [(-1.05, 0.49), (-0.84, 0.28), (-0.79, -0.04),
        (-0.92, -0.34), (-1.16, -0.43)], 0.011, GOLD_MATERIAL, side, 0.052)
    surface_tube(f"{label} jaw • mouth seam", [(-2.105, 0.17), (-1.99, 0.13), (-1.83, 0.035),
        (-1.64, -0.085), (-1.52, -0.08)], 0.026, INK_MATERIAL, side, 0.02)
    surface_tube(f"{label} jaw • warm lower lip", [(-2.075, 0.105), (-1.94, 0.04), (-1.77, -0.065),
        (-1.62, -0.13)], 0.012, ORANGE_MATERIAL, side, 0.024)
    surface_tube(f"{label} brow • sharp navy upper ridge", [(-1.95, 0.31), (-1.79, 0.51), (-1.53, 0.60),
        (-1.27, 0.65)], 0.018, INK_MATERIAL, side, 0.015)
    surface_tube(f"{label} brow • cool edge", [(-1.90, 0.36), (-1.71, 0.54), (-1.48, 0.62)],
        0.009, ICE_MATERIAL, side, 0.022)


def bezier_outline(sections, steps=12):
    points = []
    for start, control_first, control_second, end in sections:
        start, control_first, control_second, end = map(Vector, (start, control_first, control_second, end))
        for step in range(steps):
            factor = step / steps
            points.append((1 - factor) ** 3 * start + 3 * (1 - factor) ** 2 * factor * control_first
                          + 3 * (1 - factor) * factor ** 2 * control_second + factor ** 3 * end)
    return points


def fin(name, outline, center, thickness, color_function, parent=None, depth_function=None):
    center = Vector(center)
    rings = 7
    segments = len(outline)
    vertices = []
    colors = []
    faces = []
    for side in (-1, 1):
        for ring in range(rings):
            factor = 0.001 + 0.999 * ring / (rings - 1)
            for point in outline:
                projected = center.lerp(point, factor)
                depth = depth_function(projected.x, projected.z) if depth_function else projected.y
                depth += side * thickness * math.sqrt(max(0, 1 - factor ** 2))
                vertices.append((projected.x, depth, projected.z))
                colors.append(color_function(projected.x, projected.z, factor))
        offset = 0 if side < 0 else rings * segments
        for ring in range(rings - 1):
            for segment in range(segments):
                first = offset + ring * segments + segment
                following = offset + ring * segments + (segment + 1) % segments
                faces.append((first, following, following + segments, first + segments))
        faces.append(tuple(offset + segment for segment in range(segments)))
    for segment in range(segments):
        first = (rings - 1) * segments + segment
        following = (rings - 1) * segments + (segment + 1) % segments
        faces.append((first, following, following + rings * segments, first + rings * segments))
    return mesh_object(name, vertices, faces, FIN_MATERIAL, colors, parent)


def dorsal_color(position, height, edge):
    result = gradient([(0.50, "wine"), (0.85, "red"), (1.24, "orange"), (1.57, "amber")], height)
    if edge > 0.86:
        result = mix(result, COLORS["navy"], min(0.95, (edge - 0.86) * 7))
    return result


def fin_ray(name, points, outline, center, thickness, shader, radius):
    samples = catmull_points([(position, 0, height) for position, height in points], 8)
    center = Vector(center)
    projected = []
    for point in samples:
        direction = point - center
        distances = []
        for start, end in zip(outline, outline[1:] + outline[:1]):
            edge = end - start
            offset = start - center
            determinant = direction.x * edge.z - direction.z * edge.x
            if abs(determinant) < 0.000001:
                continue
            distance = (offset.x * edge.z - offset.z * edge.x) / determinant
            segment = (offset.x * direction.z - offset.z * direction.x) / determinant
            if distance > 0 and 0 <= segment <= 1:
                distances.append(distance)
        factor = min(1.0, 1 / max(distances)) if distances else 1.0
        depth = -thickness * math.sqrt(max(0, 1 - factor ** 2)) - radius * 0.65
        projected.append((point.x, depth, point.z))
    return tube(name, projected, radius, shader, sides=6, subdivisions=1)


def build_fins():
    dorsal = bezier_outline([
        ((-0.97, 0, 0.72), (-0.82, 0, 1.12), (-0.35, 0, 1.50), (-0.13, 0, 1.57)),
        ((-0.13, 0, 1.57), (-0.17, 0, 1.23), (-0.11, 0, 0.88), (0.31, 0, 0.65)),
        ((0.31, 0, 0.65), (-0.1, 0, 0.67), (-0.65, 0, 0.83), (-0.97, 0, 0.72)),
    ], 14)
    fin("Dorsal • swept flame sail", dorsal, (-0.37, 0, 1.02), 0.052, dorsal_color)
    for index in range(7):
        factor = index / 6
        start = Vector((-0.86 + factor * 0.51, 0, 0.80))
        end = Vector((-0.75 + factor * 0.60, 0, 1.07 + factor * 0.46))
        middle = start.lerp(end, 0.52) + Vector((0.018, 0, 0))
        fin_ray(f"Dorsal • ink ray {index + 1:02}", [(point.x, point.z) for point in (start, middle, end)],
                dorsal, (-0.37, 0, 1.02), 0.052, INK_MATERIAL, 0.007)
    tube("Dorsal • cyan leading glint", [(-0.97, -0.012, 0.76), (-0.71, -0.018, 1.16),
         (-0.38, -0.014, 1.44), (-0.14, -0.008, 1.56)], 0.012, CYAN_MATERIAL, sides=6)
    for side in (-1, 1):
        depth = lambda position, height, side=side: side * (0.58 + (position + 0.65) * 0.27)
        outline = bezier_outline([
            ((-0.77, 0, 0.0), (-0.39, 0, 0.055), (0.43, 0, -0.15), (0.77, 0, -0.46)),
            ((0.77, 0, -0.46), (0.28, 0, -0.42), (-0.12, 0, -0.37), (-0.57, 0, -0.18)),
            ((-0.57, 0, -0.18), (-0.76, 0, -0.12), (-0.85, 0, -0.05), (-0.77, 0, 0.0)),
        ], 12)
        def pectoral_color(position, height, edge):
            result = gradient([(-0.48, "cyan"), (-0.31, "blue"), (-0.06, "navy"), (0.06, "ink")], height)
            return mix(result, COLORS["gold"], max(0, edge - 0.92) * 6)
        fin(f"{'Near' if side < 0 else 'Far'} pectoral • midnight scythe", outline, (-0.27, 0, -0.19),
            0.049, pectoral_color, depth_function=depth)
        for index in range(5):
            factor = index / 4
            points = [(-0.68, -0.06 - factor * 0.07), (-0.14, -0.09 - factor * 0.19),
                      (0.65 - factor * 0.14, -0.42)]
            tube(f"{'Near' if side < 0 else 'Far'} pectoral • satin ray {index + 1:02}",
                 [(position, depth(position, height) + side * 0.044, height) for position, height in points],
                 0.007, CYAN_MATERIAL if index % 2 == 0 else BLUE_MATERIAL, sides=6)
        ventral = bezier_outline([
            ((-0.56, side * 0.25, -0.66), (-0.47, side * 0.32, -0.94), (-0.05, side * 0.41, -1.31), (0.10, side * 0.40, -1.35)),
            ((0.10, side * 0.40, -1.35), (-0.03, side * 0.32, -0.98), (-0.09, side * 0.25, -0.80), (-0.26, side * 0.24, -0.74)),
            ((-0.26, side * 0.24, -0.74), (-0.38, side * 0.25, -0.68), (-0.45, side * 0.25, -0.65), (-0.56, side * 0.25, -0.66)),
        ], 10)
        fin(f"{'Near' if side < 0 else 'Far'} pelvic • blue blade", ventral, (-0.20, side * 0.32, -0.95),
            0.03, lambda position, height, edge: gradient([(-1.4, "cyan"), (-1.0, "blue"), (-0.82, "navy"), (-0.65, "red")], height))
    for polarity in (-1, 1):
        secondary = bezier_outline([
            ((0.47, 0, polarity * 0.46), (0.76, 0, polarity * 0.65), (1.02, 0, polarity * 0.93), (1.13, 0, polarity * 0.96)),
            ((1.13, 0, polarity * 0.96), (1.02, 0, polarity * 0.61), (0.98, 0, polarity * 0.38), (1.20, 0, polarity * 0.15)),
            ((1.20, 0, polarity * 0.15), (0.9, 0, polarity * 0.3), (0.69, 0, polarity * 0.42), (0.47, 0, polarity * 0.46)),
        ], 10)
        fin("Second dorsal • gold sickle" if polarity > 0 else "Anal • vermilion sickle", secondary,
            (0.89, 0, polarity * 0.49), 0.038,
            lambda position, height, edge, polarity=polarity: mix(COLORS["gold" if polarity > 0 else "red"], COLORS["navy"], max(0, edge - 0.75) * 3))
        for index in range(5):
            position = 0.91 + index * 0.133
            radius, height, center = profile(position)
            base = center + polarity * height * 0.93
            size = 0.145 - index * 0.014
            outline = [Vector((position - 0.06, 0, base)), Vector((position + 0.09, 0, base + polarity * size)),
                       Vector((position + 0.095, 0, base - polarity * 0.045))]
            fin(f"{'Dorsal' if polarity > 0 else 'Ventral'} golden finlet {index + 1:02}", outline,
                (position + 0.041, 0, base + polarity * size * 0.25), 0.023,
                lambda position, height, edge: mix(COLORS["gold"], COLORS["orange"], edge * 0.6))


def build_tail():
    pivot = Vector((1.45, 0, 0))
    tail = bpy.data.objects.new("Tail", None)
    bpy.context.collection.objects.link(tail)
    tail.parent = ROOT
    tail.location = pivot
    tail.empty_display_type = "PLAIN_AXES"
    tail.empty_display_size = 0.18
    outline = bezier_outline([
        ((1.42, 0, 0), (1.58, 0, 0.36), (2.03, 0.035, 1.10), (2.44, 0.085, 1.22)),
        ((2.44, 0.085, 1.22), (2.31, 0.04, 0.91), (1.99, 0, 0.31), (1.82, 0, 0)),
        ((1.82, 0, 0), (1.99, 0, -0.31), (2.31, 0.04, -0.91), (2.44, 0.085, -1.22)),
        ((2.44, 0.085, -1.22), (2.03, 0.035, -1.10), (1.58, 0, -0.36), (1.42, 0, 0)),
    ], 24)
    def tail_color(position, height, edge):
        result = gradient([(0, "wine"), (0.20, "red"), (0.65, "red"), (1.25, "coral")], abs(height))
        if edge > 0.84:
            result = mix(result, COLORS["ink"], max(0, edge - 0.84) * 4.8)
        return result
    caudal = fin("Caudal • continuous forked crescent", outline, (1.63, 0.012, 0), 0.045, tail_color)
    caudal.parent = tail
    caudal.location = -pivot
    for polarity in (-1, 1):
        for index in range(6):
            factor = index / 5
            start = (1.55 + factor * 0.18, -0.021, polarity * 0.075)
            middle = (1.82 + factor * 0.19, -0.028, polarity * (0.44 + factor * 0.12))
            end = (2.16 + factor * 0.26, 0.018 + factor * 0.045, polarity * (0.82 + factor * 0.35))
            ray = tube(f"Caudal • {'upper' if polarity > 0 else 'lower'} ray {index + 1:02}", [start, middle, end],
                       0.008, ORANGE_MATERIAL if index % 3 == 0 else WINE_MATERIAL, sides=6)
            ray.parent = tail
            ray.location = -pivot
    for side in (-1, 1):
        surface_tube(f"Peduncle • {'near' if side < 0 else 'far'} gold keel", [(1.01, 0.03), (1.30, 0.025), (1.57, 0.014)],
                     0.028, GOLD_MATERIAL, side, 0.035)
    return tail


def stroke(name, points, widths, color, side=-1, lift=0.009):
    samples = catmull_points([(position, 0, height) for position, height in points], 8)
    vertices = []
    faces = []
    for index, point in enumerate(samples):
        factor = index / (len(samples) - 1)
        tangent = samples[min(index + 1, len(samples) - 1)] - samples[max(index - 1, 0)]
        normal = Vector((-tangent.z, 0, tangent.x)).normalized()
        width = (widths[0] * (1 - factor) + widths[1] * factor) * math.sin(math.pi * factor) ** 0.65
        for direction in (-1, 1):
            location = point + normal * max(0.0008, width) * direction
            vertices.append(surface(location.x, location.z, side, lift))
    for index in range(len(samples) - 1):
        first = index * 2
        faces.append((first, first + 1, first + 3, first + 2))
    return mesh_object(name, vertices, faces, color)


def build_paint():
    for side in (-1, 1):
        label = "Near" if side < 0 else "Far"
        stroke(f"{label} back • long cyan brush", [(-1.28, 0.66), (-0.70, 0.76), (-0.05, 0.66), (0.70, 0.34)], (0.018, 0.01), CYAN_MATERIAL, side)
        stroke(f"{label} back • porcelain glint", [(-0.97, 0.77), (-0.45, 0.78), (0.20, 0.58)], (0.008, 0.006), ICE_MATERIAL, side)
        stroke(f"{label} flank • cream drybrush", [(-0.45, 0.32), (-0.1, 0.23), (0.35, -0.06), (0.94, -0.14)], (0.042, 0.012), CREAM_MATERIAL, side)
        stroke(f"{label} flank • amber speedstroke", [(-0.78, -0.36), (-0.18, -0.41), (0.48, -0.32), (1.12, -0.10)], (0.029, 0.01), GOLD_MATERIAL, side)
        stroke(f"{label} belly • vermilion slash", [(-1.14, -0.52), (-0.61, -0.73), (0.03, -0.62), (0.71, -0.26)], (0.028, 0.014), RED_MATERIAL, side)
        stroke(f"{label} belly • red-gold edge", [(-0.72, -0.78), (-0.26, -0.73), (0.39, -0.49)], (0.009, 0.01), ORANGE_MATERIAL, side)
        stroke(f"{label} cheek • vermilion brush", [(-1.56, -0.13), (-1.34, -0.29), (-1.03, -0.28)], (0.022, 0.01), RED_MATERIAL, side, 0.055)
        stroke(f"{label} cheek • gold sweep", [(-1.46, 0.02), (-1.25, -0.17), (-0.98, -0.12)], (0.02, 0.007), GOLD_MATERIAL, side, 0.057)
        for index in range(4):
            position = -1.78 + index * 0.041
            stroke(f"{label} face • ivory drybrush {index + 1:02}", [(position - 0.018, 0.24), (position - 0.01, 0.17),
                (position + 0.012, 0.12)], (0.007, 0.004), CREAM_MATERIAL, side, 0.054)
        generator = random.Random(41)
        for index in range(44):
            position = generator.uniform(-0.64, 1.0)
            radius, vertical_radius, center = profile(position)
            relative = generator.uniform(0.23, 0.62)
            height = center + vertical_radius * relative
            length = generator.uniform(0.016, 0.064)
            width = generator.uniform(0.007, 0.02)
            pigment = generator.choice([GOLD_MATERIAL, GOLD_MATERIAL, CYAN_MATERIAL, CREAM_MATERIAL, ORANGE_MATERIAL])
            stroke(f"{label} pigment fleck {index + 1:02}", [(position - length, height + width),
                   (position, height), (position + length * 0.7, height - width * 1.1)], (width, width * 0.3), pigment, side)


def point_camera(camera, target):
    direction = Vector(target) - camera.location
    camera.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()


def area_light(name, location, energy, size, color, target=(0, 0, 0), shape="DISK"):
    data = bpy.data.lights.new(name, "AREA")
    data.energy = energy
    data.shape = shape
    data.size = size
    data.color = color
    result = bpy.data.objects.new(name, data)
    bpy.context.collection.objects.link(result)
    result.location = location
    point_camera(result, target)
    return result


def world_bounds():
    bpy.context.view_layer.update()
    vertices = [obj.matrix_world @ vertex.co for obj in bpy.context.scene.objects if obj.type == "MESH"
                for vertex in obj.data.vertices]
    lower = Vector(tuple(min(vertex[axis] for vertex in vertices) for axis in range(3)))
    upper = Vector(tuple(max(vertex[axis] for vertex in vertices) for axis in range(3)))
    return lower, upper


def configure_stage(samples, resolution):
    scene = bpy.context.scene
    scene.render.engine = "CYCLES"
    scene.cycles.samples = samples
    scene.cycles.use_denoising = True
    scene.cycles.max_bounces = 8
    scene.cycles.diffuse_bounces = 3
    scene.cycles.glossy_bounces = 4
    scene.render.resolution_x = resolution
    scene.render.resolution_y = resolution
    scene.render.resolution_percentage = 100
    scene.render.film_transparent = True
    scene.render.image_settings.file_format = "WEBP"
    scene.render.image_settings.color_mode = "RGBA"
    scene.render.image_settings.quality = 94
    scene.render.filepath = str(POSTER_PATH)
    scene.view_settings.view_transform = "AgX"
    scene.view_settings.look = "AgX - Medium High Contrast"
    scene.view_settings.exposure = -0.3
    scene.world.use_nodes = True
    scene.world.node_tree.nodes["Background"].inputs["Color"].default_value = (0.29, 0.40, 0.55, 1)
    scene.world.node_tree.nodes["Background"].inputs["Strength"].default_value = 0.25
    camera_data = bpy.data.cameras.new("Portrait camera")
    camera = bpy.data.objects.new("Portrait camera", camera_data)
    bpy.context.collection.objects.link(camera)
    camera.location = (-0.18, -10.6, 1.25)
    camera_data.type = "PERSP"
    camera_data.lens = 64
    point_camera(camera, (0, 0, 0))
    scene.camera = camera
    area_light("Key • warm giant softbox", (-3.5, -4.5, 6.2), 740, 4.4, (1, 0.88, 0.72))
    area_light("Fill • cool front", (3, -4, 1.7), 300, 3.8, (0.53, 0.79, 1))
    area_light("Rim • blue edge", (0.6, 3, 4.3), 1000, 3.0, (0.40, 0.75, 1))
    area_light("Bounce • coral underbelly", (-1.6, -0.4, -4), 130, 3.1, (1, 0.43, 0.24))
    area_light("Eye • crisp softbox", (-3.7, -6, 3.4), 95, 1.1, (1, 0.98, 0.86))
    for screen in bpy.data.screens:
        for area in screen.areas:
            if area.type == "VIEW_3D":
                area.spaces.active.shading.type = "MATERIAL"
                area.spaces.active.region_3d.view_perspective = "CAMERA"
                area.spaces.active.overlay.show_overlays = False


def web_batches():
    grouped = {}
    bpy.context.view_layer.update()
    for obj in list(bpy.context.scene.objects):
        if obj.type != "MESH":
            continue
        key = (obj.parent, obj.data.materials[0])
        grouped.setdefault(key, []).append(obj)
    batches = []
    for (parent, shader), objects in grouped.items():
        vertices = []
        colors = []
        faces = []
        for obj in objects:
            transform = parent.matrix_world.inverted() @ obj.matrix_world
            offset = len(vertices)
            vertices.extend(transform @ vertex.co for vertex in obj.data.vertices)
            faces.extend(tuple(offset + index for index in polygon.vertices) for polygon in obj.data.polygons)
            if "Paint" in obj.data.color_attributes:
                colors.extend(tuple(item.color) for item in obj.data.color_attributes["Paint"].data)
        batches.append(mesh_object(f"Web • {parent.name} • {shader.name}", vertices, faces, shader,
                                   colors if colors else None, parent))
    return batches


def export_and_report(render=True):
    scene = bpy.context.scene
    batches = web_batches()
    bpy.ops.object.select_all(action="DESELECT")
    for obj in scene.objects:
        if obj == ROOT or obj.name == "Tail" or obj in batches:
            obj.select_set(True)
    bpy.context.view_layer.objects.active = ROOT
    MODEL_PATH.parent.mkdir(parents=True, exist_ok=True)
    POSTER_PATH.parent.mkdir(parents=True, exist_ok=True)
    bpy.ops.export_scene.gltf(filepath=str(MODEL_PATH), export_format="GLB", use_selection=True,
        export_yup=True, export_apply=True, export_cameras=False, export_lights=False,
        export_animations=False, export_extras=False, export_texcoords=False)
    for obj in batches:
        mesh = obj.data
        bpy.data.objects.remove(obj, do_unlink=True)
        bpy.data.meshes.remove(mesh)
    bpy.context.preferences.filepaths.save_version = 0
    bpy.ops.wm.save_as_mainfile(filepath=str(BLEND_PATH), compress=True)
    if render:
        bpy.ops.render.render(write_still=True)
    lower, upper = world_bounds()
    data = MODEL_PATH.read_bytes()
    chunk_length = struct.unpack_from("<I", data, 12)[0]
    document = json.loads(data[20:20 + chunk_length])
    triangle_count = sum(document["accessors"][primitive["indices"]]["count"] // 3
                         for mesh in document["meshes"] for primitive in mesh["primitives"])
    report = {
        "glb_bytes": len(data),
        "blend_bytes": BLEND_PATH.stat().st_size,
        "poster_bytes": POSTER_PATH.stat().st_size if POSTER_PATH.exists() else None,
        "triangles": triangle_count,
        "mesh_objects": len(document["meshes"]),
        "materials": len(document["materials"]),
        "blender_bounds_min": [round(value, 4) for value in lower],
        "blender_bounds_max": [round(value, 4) for value in upper],
        "gltf_bounds_min": [round(lower.x, 4), round(lower.z, 4), round(-upper.y, 4)],
        "gltf_bounds_max": [round(upper.x, 4), round(upper.z, 4), round(-lower.y, 4)],
        "has_cameras": "cameras" in document,
        "has_lights": "KHR_lights_punctual" in document.get("extensions", {}),
        "has_vertex_colors": any("COLOR_0" in primitive["attributes"] for mesh in document["meshes"] for primitive in mesh["primitives"]),
        "tail_node": any(node.get("name") == "Tail" for node in document["nodes"]),
    }
    if render:
        image = bpy.data.images.load(str(POSTER_PATH), check_existing=False)
        pixels = array.array("f", [0]) * (len(image.pixels))
        image.pixels.foreach_get(pixels)
        alpha = pixels[3::4]
        report["poster_dimensions"] = list(image.size)
        report["poster_alpha_min_max"] = [min(alpha), max(alpha)]
        report["poster_nontransparent_pixels"] = sum(value > 0.01 for value in alpha)
        bpy.data.images.remove(image)
    if len(data) >= 3_000_000:
        raise RuntimeError(f"GLB exceeds the 3 MB hard limit: {len(data)} bytes")
    print("TUNA_REPORT " + json.dumps(report, ensure_ascii=False))


def main():
    global ROOT, BODY_MATERIAL, FIN_MATERIAL, INK_MATERIAL, GOLD_MATERIAL, AMBER_MATERIAL
    global CYAN_MATERIAL, BLUE_MATERIAL, EYE_MATERIAL, GLINT_MATERIAL, CREAM_MATERIAL
    global ORANGE_MATERIAL, ICE_MATERIAL, RED_MATERIAL, WINE_MATERIAL
    parser = argparse.ArgumentParser()
    parser.add_argument("--samples", type=int, default=192)
    parser.add_argument("--resolution", type=int, default=1000)
    parser.add_argument("--no-render", action="store_true")
    options = parser.parse_args(sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else [])
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete(use_global=False)
    ROOT = bpy.data.objects.new("Tuna", None)
    bpy.context.collection.objects.link(ROOT)
    ROOT.empty_display_type = "PLAIN_AXES"
    BODY_MATERIAL = material("Pigment • painted enamel skin", roughness=0.44, metallic=0.08, painted=True, coat=0.12)
    FIN_MATERIAL = material("Pigment • satin fins", roughness=0.46, metallic=0.07, painted=True, coat=0.08)
    INK_MATERIAL = material("Midnight ink", "ink", 0.31, 0.24)
    GOLD_MATERIAL = material("Brushed marigold", "gold", 0.32, 0.3)
    AMBER_MATERIAL = material("Iris bronze engraving", "orange", 0.36, 0.4)
    CYAN_MATERIAL = material("Electric turquoise", "cyan", 0.32, 0.2)
    BLUE_MATERIAL = material("Ocean blue", "blue", 0.38, 0.18)
    CREAM_MATERIAL = material("Warm porcelain stroke", "cream", 0.4, 0.12)
    ORANGE_MATERIAL = material("Tangerine pigment", "orange", 0.43, 0.12)
    ICE_MATERIAL = material("Pale cyan reflection", "ice", 0.28, 0.1)
    RED_MATERIAL = material("Vermilion pigment", "red", 0.39, 0.12)
    WINE_MATERIAL = material("Tail oxblood engraving", "wine", 0.43, 0.1)
    EYE_MATERIAL = material("Obsidian • glossy eye", "030C22", 0.105, 0.08, coat=0.3)
    GLINT_MATERIAL = material("Eye • ivory catchlight", "FFF8D8", 0.16, 0.0)
    build_body()
    for side in (-1, 1):
        build_gill(side)
        build_eye(side)
    build_fins()
    build_tail()
    build_paint()
    ROOT.rotation_euler.y = math.radians(25)
    lower, upper = world_bounds()
    ROOT.scale *= 5.0 / max(upper - lower)
    lower, upper = world_bounds()
    ROOT.location = -(lower + upper) / 2
    configure_stage(options.samples, options.resolution)
    export_and_report(not options.no_render)


if __name__ == "__main__":
    main()
