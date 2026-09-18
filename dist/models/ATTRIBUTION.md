# Fetus — gelmi.com.br

- Creator: **gelmi.com.br (rodrigogelmi)**, https://sketchfab.com/rodrigogelmi
- Work: **Fetus**, published August 10, 2022
- Original: https://sketchfab.com/3d-models/fetus-cdbadf8ba54e44ec9533a546dcd52830
- License: **Creative Commons Attribution 4.0 International (CC BY 4.0)**, https://creativecommons.org/licenses/by/4.0/
- Public distribution: Objaverse / Allen Institute for AI, https://huggingface.co/datasets/allenai/objaverse/blob/main/glbs/000-066/cdbadf8ba54e44ec9533a546dcd52830.glb
- Downloaded and license checked: 2026-09-18. The GLB's embedded `asset.extras` independently identifies the same author, source URL and CC-BY-4.0 license.
- Original GLB is included unmodified as `fetus-gelmi.glb` (~529 KiB, 13,968 triangles).
- Runtime modifications: uniform scaling, translation, replacement skin material, lighting, transparency and separate educational plane/organ overlays. No geometry deformation or author endorsement is implied.
- Popularity snapshot from Sketchfab's official public API on 2026-09-18: **17,864 views, 4,711 downloads, 133 likes**. These are time-specific counts, not a global rank or a medical validation score.

This is an artist-created external body surface. The source does not specify gestational age or provide segmented internal fetal organs. All trimester lessons use the same external pose without pretending to simulate trimester-specific growth. Internal heart/organ meshes remain separately authored schematic overlays with approximate placement, not anatomy segmented from this GLB. In particular, the flexed pose is not a correct CRL/NT acquisition pose.

## Human Heart — sahilseth

- Original: https://sketchfab.com/3d-models/human-heart-30f93d9dae4948fe85cd4d60ac40c23f
- Author: sahilseth, https://sketchfab.com/sahilseth
- License: CC BY 4.0, https://creativecommons.org/licenses/by/4.0/
- Public distribution: https://huggingface.co/datasets/allenai/objaverse/blob/main/glbs/000-106/30f93d9dae4948fe85cd4d60ac40c23f.glb
- Official API snapshot 2026-09-18: 17,983 views, 5,439 downloads, 202 likes.
- Changes: embedded textures and animation removed; geometry retained; material replaced, uniformly scaled and approximately positioned at runtime. Derivative: `heart-human.glb`. Conversion source: `research/prepare-heart.mjs`.
- This is a general artistic human-heart exterior, not a validated normal fetal heart. No fetal shunts or chamber interior are claimed. Standard fetal planes are disabled in this reference mode. The separately labeled original schematic mode retains fetal plane teaching.

## DHARANI fetal brain surface — SGBC, IIT Madras

- Dataset: DHARANI Developing Human-Brain Atlas, managed by Sudha Gopalakrishnan Brain Centre, IIT Madras.
- Dataset and license: https://registry.opendata.aws/dharani-brain-dataset/ — CC BY 4.0.
- Authors/publication: Verma et al. (2025), *DHARANI: A 3D Developing Human-Brain Atlas Resource to Advance Neuroscience Internationally*, Journal of Comparative Neurology 533:e70006. https://doi.org/10.1002/cne.70006
- Source: https://dharani-fetal-brain-atlas.s3.us-west-2.amazonaws.com/data3d/FB40_nisl_128mpp_rgb_masked.nii.gz
- Accessed: 2026-09-18. Specimen FB40; no individual gestational age is asserted here. The atlas contains second-trimester postmortem histological reconstructions, not ultrasound images or a longitudinal growth simulation.
- Derivative: `brain-dharani.glb`. Reproducible script: `research/build_brain.py`; parameters and source affine: `research/brain-build.json`.
- Method: identify stained tissue support using minimum RGB <250 to exclude white background; 2× downsample; retain largest connected component; Gaussian smoothing σ=0.8; marching cubes at 0.5, step=2; 3 Taubin smoothing iterations; transform NIfTI anatomical axes to the viewer; export GLB. Runtime uniform fit, material and approximate placement are applied.
- The extracted surface has not been manually segmented or clinically validated. It may retain sectioning/reconstruction artifacts and omit disconnected tissue. Ventricles, thalami and other internal regions are not separately segmented. Cutting the surface mesh does not recreate a histological or ultrasound slice. All trimester lessons share this same reference specimen.
- The derivative remains available under CC BY 4.0 with this attribution. No author or institution endorsement is implied.

## Candidate selection

The official Sketchfab downloadable-model search for “fetus”, sorted by like count, was checked. Higher-ranked results included a generic “Baby”, “Sci-Fi Fetus Capsule”, a game baby rig and “Alien Fetus”; they were less suitable for a human fetal anatomy learning surface. This fetus model was selected for its identifiable human fetal pose, permissive attribution license, use counts, small asset size and visible facial/limb detail. A UCSF fetal-skull scan is a cranial-only asset, not a whole-body replacement.
