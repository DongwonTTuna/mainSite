# 동원 참치 3D 에셋

참고 그림의 실루엣과 배색을 바탕으로 만든 양면 입체 모델이다. 몸통은 길이별 타원 단면으로 부피를 만들고, 눈·턱·아가미 덮개와 지느러미는 별도 메시로 구성한다. 사진 투영, 이미지 평면, 이미지 텍스처, unlit 재질을 사용하지 않는다. 색은 독립적으로 작성한 버텍스 컬러와 PBR 재질이다.

## 편집 원본과 재생성

- `generate_tuna.py`: 몸통 단면, 지느러미, 재질별 웹 메시 병합, 조명 및 내보내기.
- `tuna-shapes.json`: 직접 작성한 부위별 윤곽 좌표.
- `tuna_face.py`: 양면 눈, 입과 턱, 아가미 덮개.
- `tuna_paint.py`: 남색·청록 등, 황금색 옆구리, 주홍색 배와 얕은 붓 자국.
- `dongwon-tuna.blend`: 개별 편집 객체, 정면·사선·뒷면 카메라와 스튜디오 조명.
- `../../static/models/dongwon-tuna.glb`: 재질별로 병합한 웹 모델. 이미지와 압축 디코더가 필요 없다.
- `../../static/images/tuna-poster.webp`: 같은 모델을 렌더한 1000 × 1000 투명 포스터.

저장소 루트에서 Blender 5.2.1로 실행한다. 재생성은 수동으로 수정한 `.blend`와 GLB·포스터를 대체한다.

```sh
/Applications/Blender.app/Contents/MacOS/Blender \
  --background --factory-startup --disable-autoexec --threads 8 \
  --python assets/blender/generate_tuna.py -- --samples 64 --resolution 1000
```

`--samples 24`는 빠른 미리보기다. `--no-render`는 포스터를 갱신하지 않으므로 배포 전 전체 생성이 필요하다. 출력 `TUNA_REPORT`는 실제 파일 크기, 삼각형·메시·재질 수와 이미지 수를 표시한다. 이미지 포함, unlit 재질 또는 3 MB 이상 GLB는 오류 처리한다.

## 웹 배치

GLB는 Y up이며 +Z에서 본다. 머리는 왼쪽 위, 꼬리는 오른쪽 아래다. 프런트엔드는 실제 bounds로 중심과 크기를 정하며 추가로 자세를 꺾지 않는다. `Tail`은 꼬리 기부 피벗으로 로컬 Y에 작은 수영 동작을 적용한다.

등지느러미와 꼬리 가장자리에는 얇은 청색 투과 재질을 적용했다. 몸통은 불투명한 물감 재질을 유지한다.

포스터는 Cycles와 Khronos PBR Neutral, 웹은 Three.js의 PBR 조명과 Neutral 톤 매핑를 사용하므로 광택과 색조에 차이가 있다. 정면뿐 아니라 사선·뒷면·무채색 렌더로 부피를 확인하고 실제 웹에서도 검토한다. 한 장의 참고 그림에서 보이지 않는 반대편 형태는 모델링으로 보완했다.
