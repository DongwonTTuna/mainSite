"""Independently authored pigment fields for the volumetric tuna.

Only geometric paths and palette values are used. No reference image is read.
The same function supports scalar samples and a high-resolution UV color map.
"""
import numpy as np


def smooth(lo,hi,value):
    t=np.clip((value-lo)/(hi-lo),0,1)
    return t*t*(3-2*t)


def rgb(value):
    return np.array([int(value[i:i+2],16)/255 for i in (0,2,4)])


def mix(a,b,t):
    return a+(b-a)*np.asarray(t)[...,None]


def path_distance(u,v,points):
    lengths=[np.hypot(b[0]-a[0],b[1]-a[1]) for a,b in zip(points,points[1:])]
    nearest=np.full(np.broadcast_shapes(np.shape(u),np.shape(v)),np.inf)
    progress=np.zeros_like(nearest);travelled=0;total=sum(lengths)
    for a,b,length in zip(points,points[1:],lengths):
        dx,dy=b[0]-a[0],b[1]-a[1]
        t=np.clip(((u-a[0])*dx+(v-a[1])*dy)/(length*length),0,1)
        distance=np.hypot(u-a[0]-t*dx,v-a[1]-t*dy)
        progress=np.where(distance<nearest,(travelled+t*length)/total,progress)
        nearest=np.minimum(nearest,distance);travelled+=length
    return nearest,progress


DORSAL=((189,200),(240,189),(303,183),(365,185),(427,194),(490,218),(547,258),(598,316),(639,387),(674,470),(698,566),(712,664),(715,741))
VENTRAL=((185,247),(212,321),(261,386),(306,417),(362,468),(419,519),(477,572),(537,611),(607,644),(669,673),(695,696),(714,747))
IVORY=((437,282),(478,323),(519,369),(565,421),(610,474),(650,525),(683,576))
STROKES=(
    (((367,413),(454,479),(547,550),(671,649)),5.0,"FFB441"),
    (((416,429),(492,477),(575,541)),3.2,"FFE077"),
    (((449,451),(519,498),(609,564)),2.7,"FFF0C5"),
    (((483,305),(530,365),(603,455)),3.8,"FFFBEF"),
    (((598,445),(631,495),(676,578)),3.7,"FFFBEF"),
)


def pigment_color(u,v):
    dorsal,t=path_distance(u,v,DORSAL);belly,_=path_distance(u,v,VENTRAL)
    ivory,it=path_distance(u,v,IVORY)
    shape=np.broadcast_shapes(np.shape(u),np.shape(v))
    color=np.broadcast_to(rgb("FFC83D"),shape+(3,)).copy()
    color=mix(color,rgb("FF8738"),(1-smooth(89,94,belly))*smooth(320,360,v))
    color=mix(color,rgb("EF4140"),(1-smooth(31,35,belly))*smooth(298,348,v))
    width=(43+12*np.sin(t*np.pi))*(1-0.73*smooth(425,700,v))
    cool=mix(rgb("123C59"),rgb("317E9B"),smooth(width*.34,width*.75,dorsal))
    color=mix(color,cool,(1-smooth(width-1.4,width+1.4,dorsal))*(1-smooth(645,715,v)))
    width=1+18*np.sin(it*np.pi)**.7
    color=mix(color,rgb("FFF8E9"),(1-smooth(width-1,width+1,ivory))*smooth(285,321,v)*(1-smooth(587,620,v)))
    for path,width,pigment in STROKES:
        distance,progress=path_distance(u,v,path)
        taper=np.maximum(.06,np.sin(progress*np.pi)**.7)
        color=mix(color,rgb(pigment),1-smooth(width*taper-.7,width*taper+.7,distance))
    color=mix(color,rgb("12344F"),(1-smooth(3,5.5,belly))*smooth(310,380,v))
    color=mix(color,rgb("D93D46"),smooth(690,740,v))
    return color


def body_color(u,v,side=1):
    color=pigment_color(u,v)
    linear=np.where(color<=.04045,color/12.92,((color+.055)/1.055)**2.4)
    return np.concatenate((linear,np.ones(linear.shape[:-1]+(1,))),axis=-1)
