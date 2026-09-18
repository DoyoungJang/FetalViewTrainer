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

This is an artist-created external body surface. The source does not specify gestational age or provide segmented internal fetal organs. All trimester lessons use the same external pose without pretending to simulate trimester-specific growth. Internal organs are separate open anatomical references or authored schematic overlays with approximate placement, not anatomy segmented from this GLB. In particular, the flexed pose is not a correct CRL/NT acquisition pose.

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
- The extracted surface has not been manually segmented or clinically validated. It may retain sectioning/reconstruction artifacts and omit disconnected tissue. Ventricles, thalami and other internal regions are not separately segmented. Histological sections are sampled separately from the original volume; the surface alone contains no voxel intensities. Neither display recreates ultrasound. All trimester lessons share this same reference specimen.
- The derivative remains available under CC BY 4.0 with this attribution. No author or institution endorsement is implied.

## Candidate selection

The official Sketchfab downloadable-model search for “fetus”, sorted by like count, was checked. Higher-ranked results included a generic “Baby”, “Sci-Fi Fetus Capsule”, a game baby rig and “Alien Fetus”; they were less suitable for a human fetal anatomy learning surface. This fetus model was selected for its identifiable human fetal pose, permissive attribution license, use counts, small asset size and visible facial/limb detail. A UCSF fetal-skull scan is a cranial-only asset, not a whole-body replacement.
# Internal heart and actual brain sections — 2026-09-18 update

- `heart-hra.glb`: Human Reference Atlas, **Kristen Browne**, 3D Reference Organ for Heart, Male v1.1 (Visible Human Male, National Library of Medicine). [Official record](https://purl.humanatlas.io/ref-organ/heart-male/v1.1), [source GLB](https://cdn.humanatlas.io/digital-objects/ref-organ/heart-male/v1.1/assets/VH_M_Heart.glb), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Original cardiac mesh geometry retained; separate extended vascular tree hidden; display scale, position, materials, interactive clipping and derived intersection caps added. This is an **adult** reference, not a validated fetal four-chamber, LVOT or RVOT model. Its anatomy is kept separate from the existing external heart and fetal schematic.
- `brain-dharani.glb`: repaired inward surface winding and normals from the earlier DHARANI derivative. Same FB40 specimen, not an adult replacement. Soft emissive fill added to improve visibility.
- `brain-volume.bin.gz` / `brain-volume.json`: same CC BY 4.0 DHARANI FB40 Nissl RGB volume, downsampled by 2 in each voxel axis, white background made transparent, lossless gzip packaging. Section colors are source histological colors, **not ultrasound**. Coordinates share the surface reconstruction's source affine; sections update for oblique planes. No internal tissue-class segmentation is claimed. Source and author attribution above apply to these derived files as well.

## Exterior / plane correction — 2026-09-18

Brain display now uses a light-independent warm surface shader with a 72% shading floor and no clipping. The previously packaged histology volume is no longer loaded or shown. HRA ascending aorta, pulmonary trunk and proximal pulmonary branches are retained for outflow references. Separate adult-mesh planes pass through mitral/tricuspid/LV landmarks (four-chamber approximation), LV/aortic-valve/ascending-aorta landmarks, or RV/pulmonary-valve/pulmonary-trunk landmarks. Landmarks use world-space mesh bounding-box centers, so these are geometric approximations, not clinically validated fetal standard views. 3VT uses the separate fetal schematic because adult HRA lacks the fetal ductus and trachea.

## Expanded curriculum and model selection

The 38-class curriculum and trimester-specific Best/Acceptable criteria are transcribed from the user-provided Korean document dated 2026-09-11. These quality tiers are the document author’s operational framework, not an official universal ISUOG grading scheme. Temporal cardiac labels are displayed as separate learning records sharing their anatomical geometry; no cardiac motion is simulated. Additional 2D teaching diagrams and a simplified maternal uterus/placenta/cervix relationship model were authored for this application. HRA aortic arch, SVC and IVC are now retained for adult reference views; fetal ductal-arch and 3VT planes remain unsupported in the adult asset. Both heart model choices remain accessible, with this limitation shown explicitly.
