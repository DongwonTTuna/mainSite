"""Authored pigments for the volumetric tuna.

The coordinates describe painted shapes in the sculpture's drawing plane.  No
image is opened, sampled, projected, or used by a material.  All returned colors
are scene-linear; the caller's ``Paint`` attribute feeds a lit PBR material.
"""

from math import exp, hypot, pi, sin


def _clamp(value, low=0.0, high=1.0):
    return max(low, min(high, value))


def _smooth(low, high, value):
    t = _clamp((value - low) / (high - low))
    return t * t * (3.0 - 2.0 * t)


def _mix(first, second, amount):
    t = _clamp(amount)
    return tuple(a + (b - a) * t for a, b in zip(first, second))


def _rgb(value):
    return tuple(int(value[i:i + 2], 16) / 255.0 for i in (0, 2, 4))


def _linear(color):
    def channel(value):
        value = _clamp(value)
        return value / 12.92 if value <= 0.04045 else ((value + 0.055) / 1.055) ** 2.4

    return tuple(channel(value) for value in color) + (1.0,)


def _path_distance(u, v, points):
    """Distance to an authored paint boundary; also return its path fraction."""
    closest = float("inf")
    fraction = 0.0
    lengths = [hypot(b[0] - a[0], b[1] - a[1]) for a, b in zip(points, points[1:])]
    total = sum(lengths)
    travelled = 0.0
    for (a, b), length in zip(zip(points, points[1:]), lengths):
        dx, dy = b[0] - a[0], b[1] - a[1]
        t = _clamp(((u - a[0]) * dx + (v - a[1]) * dy) / (length * length))
        distance = hypot(u - a[0] - t * dx, v - a[1] - t * dy)
        if distance < closest:
            closest = distance
            fraction = (travelled + t * length) / total
        travelled += length
    return closest, fraction


# Broad anatomical color boundaries, deliberately independent of mesh topology.
_DORSAL = (
    (189, 200), (240, 189), (303, 183), (365, 185), (427, 194),
    (490, 218), (547, 258), (598, 316), (639, 387), (674, 470),
    (698, 566), (712, 664), (715, 741),
)
_VENTRAL = (
    (185, 247), (212, 321), (261, 386), (306, 417), (362, 468),
    (419, 519), (477, 572), (537, 611), (607, 644), (669, 673),
    (695, 696), (714, 747),
)
_IVORY_SWEEP = (
    (437, 282), (478, 323), (519, 369), (565, 421),
    (610, 474), (650, 525), (683, 576),
)

_INK = _rgb("092541")
_NAVY = _rgb("123D60")
_TEAL = _rgb("287C98")
_BLUE = _rgb("599EB8")
_GOLD = _rgb("FFC431")
_YELLOW = _rgb("FFDA48")
_ORANGE = _rgb("FF8E38")
_CORAL = _rgb("F75346")
_RED = _rgb("E92D32")
_IVORY = _rgb("FFF4CB")


def body_color(u, v, side=1):
    """Return opaque linear RGBA for the body's independently painted surface.

    Pigment follows the long flank and tapering back.  Broken edges, fine
    directional variation and sparse pigment islands keep it from becoming a
    set of clean gradient bands.  Lighting and the real body surface provide
    highlights and shadow; this color function does not bake either into paint.
    """
    dorsal, dorsal_t = _path_distance(u, v, _DORSAL)
    belly, _ = _path_distance(u, v, _VENTRAL)
    ivory, ivory_t = _path_distance(u, v, _IVORY_SWEEP)
    along = 0.69 * (u - 350.0) + 0.724 * (v - 330.0)
    across = 0.724 * (u - 350.0) - 0.69 * (v - 330.0)
    phase = 0.0 if side >= 0 else 1.7
    broken = sin(u * 0.127 + sin(v * 0.083) * 1.7 + phase)
    broken *= sin(v * 0.171 - u * 0.041)
    grain = sin(along * 0.69 + sin(across * 0.13) * 1.6)
    grain *= sin(across * 0.43 + phase)
    flowing = sin(across * 0.076 + 0.65 * sin(along * 0.023))

    # A warm flank with a cool, narrow back and a red lower abdominal sweep.
    color = _mix(_GOLD, _YELLOW, 0.27 + 0.17 * flowing)
    warmth = _smooth(335.0, 610.0, v) * (0.29 + 0.16 * sin(along * 0.009))
    color = _mix(color, _ORANGE, warmth)
    lower = (1.0 - _smooth(29.0, 88.0, belly + flowing * 4.0))
    lower *= _smooth(285.0, 398.0, v)
    color = _mix(color, _CORAL, lower * 0.90)
    vermilion = (1.0 - _smooth(17.0, 43.0, belly + broken * 3.0))
    vermilion *= _smooth(280.0, 407.0, v)
    color = _mix(color, _RED, vermilion * 0.87)

    # Cobalt at the shoulder turns into teal and thins toward the caudal keel.
    width = 43.0 + 14.0 * sin(min(1.0, dorsal_t) * pi)
    width *= 1.0 - 0.78 * _smooth(425.0, 670.0, v)
    boundary = dorsal + 3.8 * broken + 1.8 * flowing
    cool_mask = 1.0 - _smooth(width - 11.0, width + 8.0, boundary)
    cool_mask *= 1.0 - _smooth(535.0, 650.0, v)
    cool = _mix(_NAVY, _TEAL, _smooth(190.0, 450.0, v) * 0.88)
    cool = _mix(cool, _BLUE, (0.23 + 0.12 * flowing) * _smooth(5.0, 32.0, dorsal))
    color = _mix(color, cool, cool_mask)

    # Small detached islands carry the blue into the golden shoulder.  These
    # are pigment, rather than circles or false scale-shaped surface geometry.
    islands = _smooth(0.43, 0.76, broken)
    islands *= exp(-((dorsal - width - 10.0) / 18.0) ** 2)
    islands *= _smooth(280.0, 342.0, v) * (1.0 - _smooth(430.0, 495.0, v))
    color = _mix(color, _TEAL, islands * 0.75)

    # An irregular ivory brush travels along the upper flank.  Its relief is
    # articulated by narrower pigment strokes below.
    ivory_width = 7.0 + 7.0 * sin(ivory_t * pi)
    ivory_mask = 1.0 - _smooth(ivory_width - 3.0, ivory_width + 7.0, ivory + broken * 2.7)
    ivory_mask *= _smooth(284.0, 327.0, v) * (1.0 - _smooth(564.0, 612.0, v))
    color = _mix(color, _IVORY, ivory_mask * (0.77 + 0.11 * flowing))

    # Thin ink only at silhouette edges, not thick cartoon outlining.
    belly_ink = (1.0 - _smooth(3.2, 11.0, belly)) * _smooth(297.0, 405.0, v)
    belly_ink *= 1.0 - _smooth(709.0, 748.0, v)
    crown_ink = (1.0 - _smooth(2.0, 5.7, dorsal)) * (1.0 - _smooth(451.0, 590.0, v))
    color = _mix(color, _INK, max(belly_ink, crown_ink) * 0.92)

    # Broken, tapered strokes are pigments following the full curved flank.
    # They stay flush with the volume rather than becoming embossed scratches.
    for path, width, pigment in (
        (((365,411),(443,459),(545,542),(663,635)), 8.5, _rgb("FF6540")),
        (((410,421),(494,474),(553,518)), 5.0, _rgb("FFE052")),
        (((435,444),(512,500),(605,569)), 3.2, _rgb("FFF1AA")),
        (((466,465),(564,539),(677,647)), 4.5, _rgb("FFAE29")),
        (((218,191),(304,188),(402,197),(492,232)), 2.1, _rgb("8BD1E3")),
        (((475,298),(530,365),(603,455)), 4.5, _rgb("FFFBE9")),
        (((581,433),(621,487),(672,578)), 7.5, _rgb("FFFBE9")),
    ):
        dist, progress = _path_distance(u,v,path)
        taper = max(0.15, sin(progress*pi)**0.5)
        edge = width*taper + broken*1.5
        mask = 1.0-_smooth(edge-1.2,edge+1.2,dist)
        color = _mix(color,pigment,mask*0.94)

    # Minute pigment variation is intentionally low contrast.  A metal/coat
    # shader and actual lighting, not this function, establish material sheen.
    variation = 1.0 + grain * 0.04 + broken * 0.025
    return _linear(tuple(channel * variation for channel in color))

