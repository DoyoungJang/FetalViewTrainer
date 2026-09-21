# 2·3분기 추가 방향 — v42

대상: 각 36개, 총 72개 기존 학습 항목. 기존 목록을 유지하고 제목 아래 방향 선택 메뉴 추가. 172개 추가 선택 조합은 해부학 탐색 방향이며 신규 공식 표준 View 수를 뜻하지 않음.

- Orbit: 기존 Axial, Coronal, Left/Right parasagittal. 굴곡된 머리의 기존 양안·후방 기준점으로 관상 법선을 산출. 방시상면 중심은 각각 안와 기준점.
- 뇌: 기존 경사 횡단면과 관상·시상. 뇌의 TTP 기준점을 이용해 머리 좌표계의 관상 방향 산출. 측뇌실 시상면은 방시상 위치. 미세 분할 구조는 모델에 없음.
- 사지: 기존 장축과 단축·직교 장축. 화면 축이 아닌 각 사지 관절 기준점의 장축을 사용.
- 몸통·신장·모체 구조: 등록된 모델 중심에 추가 방향 적용. 신장은 실제 모델 bounds로 한쪽 신장 시상 중심 결정.
- 심장: 기존 View와 횡단·관상·시상 공간 관계 참고. 단순 회전면을 4CV/LVOT/RVOT/3VT 등의 동일 표준 View로 간주하지 않는 설명.
- 방향 변경 시 카메라/target 유지, 상대 tilt/rock/offset은 새 기준면에 맞게 0으로 복귀.
- 방향 선택은 현재 페이지 세션 내 분기·View별 기억. 1분기는 기존 UI 유지.
- 방향별 관찰 구조(영문 포함), 획득 안내, 주의사항, 2/3분기 차이를 표시. 기존 계측·QC·퀴즈를 임의 추가 면에 적용하지 않도록 별도 설명.
- 신장 및 얼굴의 이미 존재하는 동일 분기·방향 사진만 재연결. 신규 사진 다운로드 없음. 안와 관상·방시상 등 사진이 없는 경우 미확보 표시; 기준 사진/모식도를 다른 방향으로 오인하게 표시하지 않음.

검토한 근거:
- ISUOG 중기 검사 2022 https://doi.org/10.1002/uog.24888
- ISUOG CNS Part 2 2021: 2/3분기 관상·시상 신경초음파 및 척추 다평면 평가 https://www.isuog.org/static/b91bae06-731b-4a2d-8bbcbb2f0d886af4/ISUOG-Practice-Guidelines-CNS-part-2-targeted-neurosonography.pdf
- ASE 심초음파 2023 https://www.asecho.org/wp-content/uploads/2023/07/PIIS0894731723002067-1.pdf
- ISUOG 3분기 2024: 재평가/적응증의 범위 https://www.isuog.org/resource/isuog-practice-guidelines-performance-of-third-trimester-obstetric.html

한계: 교육 모델의 등록값이며 임상 획득 각도·시야를 검증한 환자 시뮬레이터가 아님. 기본 축 방향 선택과 정밀 검사의 특정 명명 단면은 같지 않음.

검증: tests.mjs (기존 107항목 및 방향 선택·복원), direction-tests.mjs (172조합·직교·안와 좌우·등록 후 적용·사진 불일치 방지), plane-tests.mjs (실제 scene graph 방향 변경·카메라 유지), navigation-tests.mjs, registration-tests.mjs, ultrasound-tests.mjs 통과. 브라우저에서 안와 Coronal/Sagittal 평면 법선·위치, 3분기 신장 관상면 교차 윤곽, 방향별 설명 확인.
