import json,struct,numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d.art3d import Poly3DCollection
from pathlib import Path
b=Path('dist/models/fetus-gelmi.glb').read_bytes(); n=struct.unpack_from('<I',b,12)[0];j=json.loads(b[20:20+n]);blob=b[28+n:]
def accessor(k):
 a=j['accessors'][k];v=j['bufferViews'][a['bufferView']];d=np.float32 if a['componentType']==5126 else np.uint32; count=3 if a['type']=='VEC3' else 1
 return np.frombuffer(blob,dtype=d,count=a['count']*count,offset=v.get('byteOffset',0)+a.get('byteOffset',0)).reshape(-1,count)
p=accessor(0)*.038537; p[:,1]-=.305; faces=accessor(3).reshape(-1,3);tri=p[faces]
fig=plt.figure(figsize=(16,7),facecolor='#172c35')
for i,(el,az) in enumerate([(0,90),(0,0),(18,55)]):
 ax=fig.add_subplot(1,3,i+1,projection='3d',facecolor='#172c35'); poly=Poly3DCollection(tri[:,:, [0,2,1]],linewidths=0,shade=True,facecolors='#d4a58e');ax.add_collection3d(poly);ax.set_xlim(-1.8,1.8);ax.set_ylim(-1.4,2.7);ax.set_zlim(-1.8,2.5);ax.set_box_aspect((3.6,4.1,4.3));ax.view_init(el,az);ax.set_xlabel('X');ax.set_ylabel('Z anterior');ax.set_zlabel('Y cranial');ax.tick_params(colors='white');ax.set_title(['Front','Side','Perspective'][i],color='white')
plt.tight_layout();plt.savefig('research/model-inspection.png',dpi=130)
