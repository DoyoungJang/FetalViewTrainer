# 1분기 실제 초음파 영상 재검색 — 2026-09-21

검색어: transthalamic axial view, thalamic plane, BPD plane, first-trimester neurosonography, posterior fossa, bilateral diaphragmatic sagittal view, 13-week three-vessel view, first-trimester aortic arch/bicaval/cervical length, transverse kidneys.

## 추가한 영상

| View | 근거 | 표시 패널 | 제한 |
|---|---|---|---|
| TTP / BPD / HC | Lyu et al. 2025, DOI 10.1007/s00404-025-08231-z, Figure 1 | 첫 번째 원본의 c, [458,0,227,229] | 11–13+6주 캡션; 개별 주수 미기재 |
| Diaphragm | 같은 논문 Figure 1 | 두 번째 원본의 p, [0,228,230,229] | 양측 횡격막 시상면 |
| 3VV–PA | Lee & Won 2013, DOI 10.5468/ogs.2013.56.4.217, Figure 13 | B, [236,3,224,216] | 정상 13주 MPA/Ao/SVC; 직경 캘리퍼 없는 해부학 참고 |

Lyu 원문: https://link.springer.com/article/10.1007/s00404-025-08231-z#Fig1

Lyu: CC BY-NC-ND 4.0. 원본 복합그림 파일 그대로 보존, 기존 앱의 패널 확대 표시와 전체 원본 링크 사용. Lee & Won: 기존 CC BY-NC 3.0 원본을 재사용. 파일 무결성 및 좌표 범위 검사 통과.

## 이미지 대신 원문 연결 추가

- Ao Arch: Yang et al. 2025, DOI 10.1002/uog.29186, Supporting Figure S5a–b. 1분기 대동맥궁 장축; 재게시 라이선스 확인 안 됨.
- Bicaval: 같은 논문 Supporting Figure S6a. 정상 양대정맥; S6b는 비정상 예시이므로 정상 대체 영상으로 사용하지 않음.
- Cervix: Feng et al. 2021, DOI 10.1111/aogs.14138, Figure 1. 11–13+6주 연구의 질식 CL; free access만 확인, 재게시 라이선스 확인 안 됨. 1분기 보편적 선별 권고로 해석하지 않음.

## 남은 7개 View

TCP, 코/상순, Ao Arch, Duct Arch, Bicaval, 신장 횡단면, Cervix.

- TCP: DOI 10.1080/01443615.2024.2361848의 1분기 neurosonography 원문 링크 유지. 원본 영상 확보 안 됨.
- 코/상순: PMC11444747 Figure 7 원문 링크 유지. 후비삼각(RNT)만으로 코/상순 View를 채우지 않음.
- 신장 횡단면: 새 consensus Figure 1s는 관상면이며 횡단면 대체로 사용하지 않음.
- Duct Arch: aortic/ductal arch 색 신호가 중첩된 자료를 독립적인 정상 동맥관궁 영상으로 분류하지 않음.
- PMC12699807: CL 관련 논문이나 그림은 회귀분석 그래프뿐이라 제외.

1분기 이미지 25/35 → 28/35; 전체 77/107 → 80/107. 단면 획득/측정 프로토콜, 3D 모델 및 시점 로직 변경 없음.

검증: node ultrasound-tests.mjs, node tests.mjs 통과. 브라우저에서 TTP 및 횡격막의 해당 패널만 표시됨을 확인, 3VV–PA의 13주와 캘리퍼 없음 표기 확인.
