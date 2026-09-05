# 동원 참치 3D 에셋

로컬 참고 사진의 남색 등, 금빛 옆구리, 주홍 배와 꼬리를 실제 입체 메시로 재해석했다.
몸통, 양쪽 눈과 아가미, 두께 있는 지느러미와 갈라진 꼬리는 모두 편집 가능한 메시다.
붓 자국은 `Paint` 버텍스 컬러와 표면 장식이며, 이미지 평면·외부 텍스처·런타임 절차 셰이더를 사용하지 않는다.
참고 사진은 읽기만 했으며 복사하거나 외부로 전송하지 않았다.

## 결과물

- `generate_tuna.py`: 재현 가능한 생성기. Blender 5.2.1에서 실행했다.
- `dongwon-tuna.blend`: 개별 부위, 카메라, 5개 Area 조명을 보존한 편집 원본.
- 원본을 열면 Material Preview와 포스터 카메라 구도로 색을 바로 확인할 수 있다. 사용자 전역 시작 파일은 바꾸지 않는다.
- `../../static/models/dongwon-tuna.glb`: 웹용 모델. 1,307,140 bytes, 59,248 triangles, 16 meshes, 14 materials.
- `../../static/images/tuna-poster.webp`: 같은 모델의 Cycles 192 samples 렌더. 1000 × 1000 RGBA, 74,710 bytes.
- `tuna-gltf-front.webp`, `tuna-gltf-angle.webp`: 최종 GLB를 다시 불러와 렌더한 정면·사선 검토 이미지.
- `tuna-poster-on-paper.png`: 투명 포스터를 프런트엔드의 `#f8f7f3` 위에 합성한 검토 이미지. 배포용이 아니다.

GLB는 재질별로 묶어 드로우콜을 줄인다. `.blend`의 개별 편집 오브젝트는 병합하지 않는다.
압축 디코더, 이미지 다운로드, 내장 카메라·조명·애니메이션이 필요 없다.
`KHR_materials_clearcoat`는 선택적이며 기본 metallic/roughness와 버텍스 컬러만으로도 표현된다.

## 재생성

저장소 루트에서 실행한다. 생성기는 이 폴더의 `.blend`와 위의 GLB·포스터만 갱신한다.

```sh
/Applications/Blender.app/Contents/MacOS/Blender \
  --background --factory-startup --disable-autoexec --threads 8 \
  --python assets/blender/generate_tuna.py -- --samples 192 --resolution 1000
```

`--samples 32`로 빠르게 미리 볼 수 있다. `--no-render`는 원본과 GLB만 갱신하므로
포스터를 배포하기 전에는 반드시 전체 명령을 다시 실행한다.
`TUNA_REPORT` stdout에 실제 크기, 삼각형 수, bounds, 알파 검사 결과가 출력된다.
3,000,000 bytes 이상인 GLB는 오류로 보고한다.
별도 의존성 설치나 GUI 실행, 사용자 설정 저장은 하지 않는다.

## 수정 위치

- `PALETTE`, `body_color()`, `build_paint()`: 색, 깨진 색 경계, 붓 자국.
- `PROFILE`: 몸통의 길이별 두께와 높이. 주된 실루엣은 여기서 수정한다.
- `build_eye()`, `build_gill()`: 양면 눈, 반사점, 입선, 입체 아가미 덮개.
- `build_fins()`, `build_tail()`: 유선형 지느러미, 골드 finlet, 연결된 꼬리.
- `configure_stage()`: 포스터 카메라와 조명. 원본에서 수동 편집한 내용은 재생성 시 대체된다.

## 웹 배치 계약

- GLB는 **Y up / +Z에서 보는 정면**. 머리는 왼쪽 위, 꼬리는 오른쪽 아래다.
- `Tuna` 루트에 이미 약 -25°의 Z 자세가 포함된다. 기본 자세를 다시 회전시키지 않는다.
- 전체 yaw·부유 모션은 `gltf.scene` 또는 바깥 Group에 적용하고 `Tuna`의 저장된 변환은 보존한다.
- 월드 bounds: min `(-2.5, -1.9780, -1.0658)`, max `(2.5, 1.9780, 1.0658)`.
- 크기 약 `(5.0, 3.9560, 2.1317)`. 중심은 원점이며 몸통과 지느러미에 실제 깊이가 있다.
- `Tail`은 꼬리 기부 피벗이다. Three.js 로컬 Y를 약 ±0.08–0.12 rad 흔들 수 있다.
- 정사각형 포스터 구도: 카메라 `(-0.18, 1.25, 10.6)`, target `(0, 0, 0)`, 세로 FOV 약 `31.42°`.
- bounds 기반 auto-fit과 전체 yaw `-0.12 rad`에 적합하다. 약 8% 이상의 화면 여백을 남긴다.

## 조명과 확인 범위

포스터는 AgX Medium High Contrast, exposure -0.3 stops, 따뜻한 큰 key와 청색 rim으로 렌더했다.
웹의 중성 RoomEnvironment + ACES 1.08은 같은 캐릭터를 보여 주지만 톤 매핑과 광원이 달라
색이 완전히 일치하지는 않는다. 제안된 directional 3.2 / hemi 2.2 / environment 0.65에서
금색이 너무 밝아지면 exposure 0.9–1.0 또는 hemi 1.2–1.6부터 비교한다. 이 수치는 브라우저 조정 출발점이다.
버텍스 컬러를 별도로 sRGB 변환하거나 재질의 색을 다시 곱하지 않는다.

헤드리스에서 최종 GLB 재수입, 16개 메시와 루트·꼬리 이름, 약 5-unit bounds,
정면·사선 렌더를 확인했다. 포스터는 알파 0–1, 1000 × 1000이며 가장자리가 잘리지 않는다.
최종 프런트엔드의 실제 ACES 조명 및 모바일 GPU 성능 검증은 통합 작업에서 수행한다.
