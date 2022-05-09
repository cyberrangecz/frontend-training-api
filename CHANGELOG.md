### 13.0.4 Added support for movement between already finished levels.
* 9c6977e -- [CI/CD] Update packages.json version based on GitLab tag.
* d76bd76 -- Merge branch '60-add-necessary-fields-and-update-mappers-to-support-movement-between-accessed-levels-phases' into 'master'
* e940be7 -- Resolve "Add necessary fields and update mappers to support movement between accessed levels/phases during training run"
### 13.0.3 Added mitre techniques field.
* f4360b9 -- [CI/CD] Update packages.json version based on GitLab tag.
* 59f6709 -- Merge branch '58-add-support-for-map-of-games' into 'master'
* 64d2f60 -- Resolve "Add support for map of games"
### 13.0.2 Added new field minimal possible solve time added to the assessment and training level.
* 47f328d -- [CI/CD] Update packages.json version based on GitLab tag.
* e4ef90b -- Merge branch '13.x.x-pre-tag-changes' into 'master'
* 9fb3211 -- 13.x.x pre tag changes
### 13.0.1 Add has reference solution field.
* ea49761 -- [CI/CD] Update packages.json version based on GitLab tag.
* 62c5bda -- Merge branch '56-add-has-reference-solution-field' into 'master'
* 30e4c03 -- Resolve "Add has reference solution field"
### 13.0.0 Update to Angular 13, CI/CD optimisation, local env. and sandbox def. id attribute added to TI and TR DTOs, access level/phase integrated.
* 548913a -- [CI/CD] Update packages.json version based on GitLab tag.
*   d64977d -- Merge branch '12.1.1-pre-tag-changes' into 'master'
|\  
| * c55a5ba -- 12.1.1 pre tag changes
|/  
* 9a7c808 -- Merge branch '53-update-to-angular-13' into 'master'
* 313f5af -- Resolve "Update to Angular 13"
### 12.1.0 Add tests for particular api services. Add DTO, mappers and api methods for command analysis visualization.
* 842c40c -- [CI/CD] Update packages.json version based on GitLab tag.
*   14317ec -- Merge branch '47-integrate-command-visualization' into 'master'
|\  
| * 8962094 -- Resolve "Integrate command visualization"
|/  
*   0a87b7c -- Merge branch '46-create-tests-for-api-services-and-mappers' into 'master'
|\  
| * 3ce3c9b -- Resolve "Create tests for api services and mappers"
|/  
* 5f94352 -- Merge branch '50-add-license' into 'master'
* 729a37b -- Add license file
### 12.0.7 Add variant_answers into training level dto. Add training run info dto, mappers and api methods.
* bc85d33 -- [CI/CD] Update packages.json version based on GitLab tag.
*   91e4b37 -- Merge branch '49-add-training-run-info-dto-and-api-call' into 'master'
|\  
| * cff6afc -- Resolve "Add training run info dto and api call"
|/  
* 6f2ab06 -- Merge branch '48-move-attribute-variant_sandboxes-from-definition-to-training-level-as-variant_answers' into 'master'
* b88287f -- Removed variant_sandboxes from definition dto. Added variant_answers into...
### 12.0.6 Add attribute default_content to Training Definition Create DTO.
* decbbcd -- [CI/CD] Update packages.json version based on GitLab tag.
* 351d267 -- Merge branch '44-add-attribute-default_content-to-trainingdefinitioncreatedto' into 'master'
* 70ded82 -- Update .gitlab-ci.yml file
* 8303b40 -- Bump version file
* f971dcf -- Merge remote-tracking branch 'origin/master' into 44-add-attribute-default_content-to-trainingdefinitioncreatedto
* 89e4e5a -- Bump version of model
* 2063e9d -- Added attribute default_content to training definition create DTO. Modification of the mapper accordingly.
### 12.0.5 Add last edit by field.
* 3be52bc -- [CI/CD] Update packages.json version based on GitLab tag.
*   450a99b -- Merge branch '45-add-last-edit-by-field' into 'master'
|\  
| * b2ee829 -- Resolve "Add last edit by field"
|/  
* 31a83c2 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* 9b81e0a -- [CI/CD] Update packages.json version based on GitLab tag.
*   25f22b8 -- Merge branch '43-create-tag-with-latest-changes' into 'master'
|\  
| * 45622c2 -- Tag notes
|/  
*   1bbc847 -- Merge branch '42-allow-save-of-multiple-levels-at-once' into 'master'
|\  
| * 0b8b9c1 -- Resolve "Allow save of multiple levels at once"
|/  
*   08401eb -- Merge branch '41-add-node-modules-to-gitignore' into 'master'
|\  
| * d9a35e1 -- Add node_modules to gitignore
* |   fc3da2b -- Merge branch '40-add-id-to-training-definition-title-in-trainingdefinitioninfo' into 'master'
|\ \  
| |/  
|/|   
| * cf5fbc3 -- Add id
|/  
* cc35d85 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* c56be4d -- [CI/CD] Update packages.json version based on GitLab tag.
*   3bbef5a -- Merge branch '35-modify-dtos-and-mappers-needed-for-apg-integration' into 'master'
|\  
| * 569adca -- Changed version of the project to 12.0.3
| * faac130 -- Changed version of the training model to 12.0.5.
| *   3c12a78 -- Merged with master
| |\  
| |/  
|/|   
* | fa44a6b -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* | 5c35b37 -- [CI/CD] Update packages.json version based on GitLab tag.
* |   5e2e01f -- Merge branch '39-rename-game-level-to-training-level-and-bump-version-of-kypo-training-model' into 'master'
|\ \  
| * | d90c452 -- Resolve "Rename game level to training level and bump version of kypo-training-model"
|/ /  
* |   55b377b -- Merge branch '38-rename-the-attribute-flag-to-the-answer' into 'master'
|\ \  
| * | 614cd21 -- Resolve "Rename the attribute flag to the answer"
|/ /  
* |   4777782 -- Merge branch '36-bump-version-of-sentinel' into 'master'
|\ \  
| * | 7237bb1 -- Resolve "Bump version of Sentinel"
|/ /  
| * b9a51ff -- Renaming flagIdentifier to flagVariableName and variantAnswers to variantSandboxes.
| * da8067e -- Added attribute variantAnswers and modify mappers accordingly.
| * 3d6030f -- Added attribute variantAnswers and modify mappers accordingly.
|/  
* 48a8506 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* eed7790 -- [CI/CD] Update packages.json version based on GitLab tag.
*   9d26cd3 -- Merge branch '34-simplify-gitlab-ci-cd-using-csirt-mu-docker-image' into 'master'
|\  
| * c5fdbfc -- Update gitlab CI
|/  
* 7153b7d -- Update project package.json version based on GitLab tag. Done by CI
*   6fdbe4f -- Merge branch '33-update-to-angular-12' into 'master'
|\  
| * 73201e0 -- Update to Angular 12
|/  
* a94cc6a -- Update project package.json version based on GitLab tag. Done by CI
*   c53ba3d -- Merge branch '31-adjust-dtos-and-mappers-according-to-the-new-design-of-questions-in-the-assessment-levels' into 'master'
|\  
| * b7991dc -- Resolve "Adjust DTOs and mappers according to the new design of questions in the assessment levels"
|/  
* 25e1cc9 -- Update project package.json version based on GitLab tag. Done by CI
*   2af45f3 -- Merge branch '32-fix-task-copy-url' into 'master'
|\  
| * 05d40d5 -- Copy task url fixed
|/  
* 16ff17f -- Update project package.json version based on GitLab tag. Done by CI
*   85daa0d -- Merge branch '30-fix-new-line-template-string-blank-spaces' into 'master'
|\  
| * 7b7ff92 -- Fix new line problem
|/  
*   b8ba84b -- Merge branch '29-integrate-adaptive-learning-techniques' into 'master'
|\  
| * e490310 -- Resolve "Integrate Adaptive learning techniques"
|/  
* 63442f9 -- Update project package.json version based on GitLab tag. Done by CI
*   cd242e5 -- Merge branch '27-update-to-angular-11' into 'master'
|\  
| * f79e59b -- Resolve "Update to Angular 11"
|/  
*   04e38d8 -- Merge branch '26-recreate-package-lock-for-new-package-registry' into 'master'
|\  
| * e96d821 -- recreate package lock
|/  
* 659a048 -- Update project package.json version based on GitLab tag. Done by CI
*   70b4731 -- Merge branch '25-rename-package-scope-to-muni-kypo-crp' into 'master'
|\  
| * 88b2103 -- Resolve "Rename package scope to muni-kypo-crp"
|/  
*   2170243 -- Merge branch '24-migrate-from-tslint-to-eslint' into 'master'
|\  
| * 395b55e -- Migrate to eslint, fix lint warnings/errors
|/  
* 0001a11 -- Update project package.json version based on GitLab tag. Done by CI
*   864ec01 -- Merge branch '23-update-dependencies-to-new-format' into 'master'
|\  
| * af218bf -- Update dependencies
|/  
* c27550e -- Update project package.json version based on GitLab tag. Done by CI
*   59633bf -- Merge branch '22-rename-to-kypo-training-api' into 'master'
|\  
| * 9dfc3de -- Rename package
|/  
* f74c4d3 -- Update project package.json version based on GitLab tag. Done by CI
*   699daab -- Merge branch '20-update-endpoint-for-training-events' into 'master'
|\  
| * 394bae6 -- Changed training event uri to match new backend endpoint
|/  
*   0de3e14 -- Merge branch '19-use-cypress-image-in-ci' into 'master'
|\  
| * 4c7c5e9 -- Resolve "Use cypress image in CI"
|/  
* a0f5c7d -- Update project package.json version based on GitLab tag. Done by CI
* 7676143 -- Update project package.json version based on GitLab tag. Done by CI
*   fcacdff -- Merge branch '18-remove-deep-import-from-rxjs' into 'master'
|\  
| * f22ac6c -- Remove deep imports from rxjs
|/  
* d5310e4 -- Update project package.json version based on GitLab tag. Done by CI
*   eff306f -- Merge branch '17-replace-dependency-on-kypo-common-with-sentinel-common' into 'master'
|\  
| * 2c0061a -- Replace kypo-common with @sentinel/common
|/  
* 2416f07 -- Update project package.json version based on GitLab tag. Done by CI
*   aca94b8 -- Merge branch '16-update-to-angular-10' into 'master'
|\  
| * ba42b44 -- Resolve "Update to Angular 10"
|/  
* 288c5da -- Update project package.json version based on GitLab tag. Done by CI
### 12.0.4 Include id to training definition info title. Allow save of multiple levels/phases at once.
* 9b81e0a -- [CI/CD] Update packages.json version based on GitLab tag.
*   25f22b8 -- Merge branch '43-create-tag-with-latest-changes' into 'master'
|\  
| * 45622c2 -- Tag notes
|/  
*   1bbc847 -- Merge branch '42-allow-save-of-multiple-levels-at-once' into 'master'
|\  
| * 0b8b9c1 -- Resolve "Allow save of multiple levels at once"
|/  
*   08401eb -- Merge branch '41-add-node-modules-to-gitignore' into 'master'
|\  
| * d9a35e1 -- Add node_modules to gitignore
* |   fc3da2b -- Merge branch '40-add-id-to-training-definition-title-in-trainingdefinitioninfo' into 'master'
|\ \  
| |/  
|/|   
| * cf5fbc3 -- Add id
|/  
* cc35d85 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* c56be4d -- [CI/CD] Update packages.json version based on GitLab tag.
*   3bbef5a -- Merge branch '35-modify-dtos-and-mappers-needed-for-apg-integration' into 'master'
|\  
| * 569adca -- Changed version of the project to 12.0.3
| * faac130 -- Changed version of the training model to 12.0.5.
| *   3c12a78 -- Merged with master
| |\  
| |/  
|/|   
* | fa44a6b -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* | 5c35b37 -- [CI/CD] Update packages.json version based on GitLab tag.
* |   5e2e01f -- Merge branch '39-rename-game-level-to-training-level-and-bump-version-of-kypo-training-model' into 'master'
|\ \  
| * | d90c452 -- Resolve "Rename game level to training level and bump version of kypo-training-model"
|/ /  
* |   55b377b -- Merge branch '38-rename-the-attribute-flag-to-the-answer' into 'master'
|\ \  
| * | 614cd21 -- Resolve "Rename the attribute flag to the answer"
|/ /  
* |   4777782 -- Merge branch '36-bump-version-of-sentinel' into 'master'
|\ \  
| * | 7237bb1 -- Resolve "Bump version of Sentinel"
|/ /  
| * b9a51ff -- Renaming flagIdentifier to flagVariableName and variantAnswers to variantSandboxes.
| * da8067e -- Added attribute variantAnswers and modify mappers accordingly.
| * 3d6030f -- Added attribute variantAnswers and modify mappers accordingly.
|/  
* 48a8506 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* eed7790 -- [CI/CD] Update packages.json version based on GitLab tag.
*   9d26cd3 -- Merge branch '34-simplify-gitlab-ci-cd-using-csirt-mu-docker-image' into 'master'
|\  
| * c5fdbfc -- Update gitlab CI
|/  
* 7153b7d -- Update project package.json version based on GitLab tag. Done by CI
*   6fdbe4f -- Merge branch '33-update-to-angular-12' into 'master'
|\  
| * 73201e0 -- Update to Angular 12
|/  
* a94cc6a -- Update project package.json version based on GitLab tag. Done by CI
*   c53ba3d -- Merge branch '31-adjust-dtos-and-mappers-according-to-the-new-design-of-questions-in-the-assessment-levels' into 'master'
|\  
| * b7991dc -- Resolve "Adjust DTOs and mappers according to the new design of questions in the assessment levels"
|/  
* 25e1cc9 -- Update project package.json version based on GitLab tag. Done by CI
*   2af45f3 -- Merge branch '32-fix-task-copy-url' into 'master'
|\  
| * 05d40d5 -- Copy task url fixed
|/  
* 16ff17f -- Update project package.json version based on GitLab tag. Done by CI
*   85daa0d -- Merge branch '30-fix-new-line-template-string-blank-spaces' into 'master'
|\  
| * 7b7ff92 -- Fix new line problem
|/  
*   b8ba84b -- Merge branch '29-integrate-adaptive-learning-techniques' into 'master'
|\  
| * e490310 -- Resolve "Integrate Adaptive learning techniques"
|/  
* 63442f9 -- Update project package.json version based on GitLab tag. Done by CI
*   cd242e5 -- Merge branch '27-update-to-angular-11' into 'master'
|\  
| * f79e59b -- Resolve "Update to Angular 11"
|/  
*   04e38d8 -- Merge branch '26-recreate-package-lock-for-new-package-registry' into 'master'
|\  
| * e96d821 -- recreate package lock
|/  
* 659a048 -- Update project package.json version based on GitLab tag. Done by CI
*   70b4731 -- Merge branch '25-rename-package-scope-to-muni-kypo-crp' into 'master'
|\  
| * 88b2103 -- Resolve "Rename package scope to muni-kypo-crp"
|/  
*   2170243 -- Merge branch '24-migrate-from-tslint-to-eslint' into 'master'
|\  
| * 395b55e -- Migrate to eslint, fix lint warnings/errors
|/  
* 0001a11 -- Update project package.json version based on GitLab tag. Done by CI
*   864ec01 -- Merge branch '23-update-dependencies-to-new-format' into 'master'
|\  
| * af218bf -- Update dependencies
|/  
* c27550e -- Update project package.json version based on GitLab tag. Done by CI
*   59633bf -- Merge branch '22-rename-to-kypo-training-api' into 'master'
|\  
| * 9dfc3de -- Rename package
|/  
* f74c4d3 -- Update project package.json version based on GitLab tag. Done by CI
*   699daab -- Merge branch '20-update-endpoint-for-training-events' into 'master'
|\  
| * 394bae6 -- Changed training event uri to match new backend endpoint
|/  
*   0de3e14 -- Merge branch '19-use-cypress-image-in-ci' into 'master'
|\  
| * 4c7c5e9 -- Resolve "Use cypress image in CI"
|/  
* a0f5c7d -- Update project package.json version based on GitLab tag. Done by CI
* 7676143 -- Update project package.json version based on GitLab tag. Done by CI
*   fcacdff -- Merge branch '18-remove-deep-import-from-rxjs' into 'master'
|\  
| * f22ac6c -- Remove deep imports from rxjs
|/  
* d5310e4 -- Update project package.json version based on GitLab tag. Done by CI
*   eff306f -- Merge branch '17-replace-dependency-on-kypo-common-with-sentinel-common' into 'master'
|\  
| * 2c0061a -- Replace kypo-common with @sentinel/common
|/  
* 2416f07 -- Update project package.json version based on GitLab tag. Done by CI
*   aca94b8 -- Merge branch '16-update-to-angular-10' into 'master'
|\  
| * ba42b44 -- Resolve "Update to Angular 10"
|/  
* 288c5da -- Update project package.json version based on GitLab tag. Done by CI
### 12.0.3 Addition of the attributes for APG.
* c56be4d -- [CI/CD] Update packages.json version based on GitLab tag.
*   3bbef5a -- Merge branch '35-modify-dtos-and-mappers-needed-for-apg-integration' into 'master'
|\  
| * 569adca -- Changed version of the project to 12.0.3
| * faac130 -- Changed version of the training model to 12.0.5.
| *   3c12a78 -- Merged with master
| |\  
| |/  
|/|   
* | fa44a6b -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* | 5c35b37 -- [CI/CD] Update packages.json version based on GitLab tag.
* |   5e2e01f -- Merge branch '39-rename-game-level-to-training-level-and-bump-version-of-kypo-training-model' into 'master'
|\ \  
| * | d90c452 -- Resolve "Rename game level to training level and bump version of kypo-training-model"
|/ /  
* |   55b377b -- Merge branch '38-rename-the-attribute-flag-to-the-answer' into 'master'
|\ \  
| * | 614cd21 -- Resolve "Rename the attribute flag to the answer"
|/ /  
* |   4777782 -- Merge branch '36-bump-version-of-sentinel' into 'master'
|\ \  
| * | 7237bb1 -- Resolve "Bump version of Sentinel"
|/ /  
| * b9a51ff -- Renaming flagIdentifier to flagVariableName and variantAnswers to variantSandboxes.
| * da8067e -- Added attribute variantAnswers and modify mappers accordingly.
| * 3d6030f -- Added attribute variantAnswers and modify mappers accordingly.
|/  
* 48a8506 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* eed7790 -- [CI/CD] Update packages.json version based on GitLab tag.
*   9d26cd3 -- Merge branch '34-simplify-gitlab-ci-cd-using-csirt-mu-docker-image' into 'master'
|\  
| * c5fdbfc -- Update gitlab CI
|/  
* 7153b7d -- Update project package.json version based on GitLab tag. Done by CI
*   6fdbe4f -- Merge branch '33-update-to-angular-12' into 'master'
|\  
| * 73201e0 -- Update to Angular 12
|/  
* a94cc6a -- Update project package.json version based on GitLab tag. Done by CI
*   c53ba3d -- Merge branch '31-adjust-dtos-and-mappers-according-to-the-new-design-of-questions-in-the-assessment-levels' into 'master'
|\  
| * b7991dc -- Resolve "Adjust DTOs and mappers according to the new design of questions in the assessment levels"
|/  
* 25e1cc9 -- Update project package.json version based on GitLab tag. Done by CI
*   2af45f3 -- Merge branch '32-fix-task-copy-url' into 'master'
|\  
| * 05d40d5 -- Copy task url fixed
|/  
* 16ff17f -- Update project package.json version based on GitLab tag. Done by CI
*   85daa0d -- Merge branch '30-fix-new-line-template-string-blank-spaces' into 'master'
|\  
| * 7b7ff92 -- Fix new line problem
|/  
*   b8ba84b -- Merge branch '29-integrate-adaptive-learning-techniques' into 'master'
|\  
| * e490310 -- Resolve "Integrate Adaptive learning techniques"
|/  
* 63442f9 -- Update project package.json version based on GitLab tag. Done by CI
*   cd242e5 -- Merge branch '27-update-to-angular-11' into 'master'
|\  
| * f79e59b -- Resolve "Update to Angular 11"
|/  
*   04e38d8 -- Merge branch '26-recreate-package-lock-for-new-package-registry' into 'master'
|\  
| * e96d821 -- recreate package lock
|/  
* 659a048 -- Update project package.json version based on GitLab tag. Done by CI
*   70b4731 -- Merge branch '25-rename-package-scope-to-muni-kypo-crp' into 'master'
|\  
| * 88b2103 -- Resolve "Rename package scope to muni-kypo-crp"
|/  
*   2170243 -- Merge branch '24-migrate-from-tslint-to-eslint' into 'master'
|\  
| * 395b55e -- Migrate to eslint, fix lint warnings/errors
|/  
* 0001a11 -- Update project package.json version based on GitLab tag. Done by CI
*   864ec01 -- Merge branch '23-update-dependencies-to-new-format' into 'master'
|\  
| * af218bf -- Update dependencies
|/  
* c27550e -- Update project package.json version based on GitLab tag. Done by CI
*   59633bf -- Merge branch '22-rename-to-kypo-training-api' into 'master'
|\  
| * 9dfc3de -- Rename package
|/  
* f74c4d3 -- Update project package.json version based on GitLab tag. Done by CI
*   699daab -- Merge branch '20-update-endpoint-for-training-events' into 'master'
|\  
| * 394bae6 -- Changed training event uri to match new backend endpoint
|/  
*   0de3e14 -- Merge branch '19-use-cypress-image-in-ci' into 'master'
|\  
| * 4c7c5e9 -- Resolve "Use cypress image in CI"
|/  
* a0f5c7d -- Update project package.json version based on GitLab tag. Done by CI
* 7676143 -- Update project package.json version based on GitLab tag. Done by CI
*   fcacdff -- Merge branch '18-remove-deep-import-from-rxjs' into 'master'
|\  
| * f22ac6c -- Remove deep imports from rxjs
|/  
* d5310e4 -- Update project package.json version based on GitLab tag. Done by CI
*   eff306f -- Merge branch '17-replace-dependency-on-kypo-common-with-sentinel-common' into 'master'
|\  
| * 2c0061a -- Replace kypo-common with @sentinel/common
|/  
* 2416f07 -- Update project package.json version based on GitLab tag. Done by CI
*   aca94b8 -- Merge branch '16-update-to-angular-10' into 'master'
|\  
| * ba42b44 -- Resolve "Update to Angular 10"
|/  
* 288c5da -- Update project package.json version based on GitLab tag. Done by CI
### 12.0.2 Rename flag to answer, rename game level to training level, new version of Sentinel.
* 5c35b37 -- [CI/CD] Update packages.json version based on GitLab tag.
*   5e2e01f -- Merge branch '39-rename-game-level-to-training-level-and-bump-version-of-kypo-training-model' into 'master'
|\  
| * d90c452 -- Resolve "Rename game level to training level and bump version of kypo-training-model"
|/  
*   55b377b -- Merge branch '38-rename-the-attribute-flag-to-the-answer' into 'master'
|\  
| * 614cd21 -- Resolve "Rename the attribute flag to the answer"
|/  
*   4777782 -- Merge branch '36-bump-version-of-sentinel' into 'master'
|\  
| * 7237bb1 -- Resolve "Bump version of Sentinel"
|/  
* 48a8506 -- [CI/CD] CHANGELOG.md file updated with commits between the current and previous tag.
* eed7790 -- [CI/CD] Update packages.json version based on GitLab tag.
*   9d26cd3 -- Merge branch '34-simplify-gitlab-ci-cd-using-csirt-mu-docker-image' into 'master'
|\  
| * c5fdbfc -- Update gitlab CI
|/  
* 7153b7d -- Update project package.json version based on GitLab tag. Done by CI
*   6fdbe4f -- Merge branch '33-update-to-angular-12' into 'master'
|\  
| * 73201e0 -- Update to Angular 12
|/  
* a94cc6a -- Update project package.json version based on GitLab tag. Done by CI
*   c53ba3d -- Merge branch '31-adjust-dtos-and-mappers-according-to-the-new-design-of-questions-in-the-assessment-levels' into 'master'
|\  
| * b7991dc -- Resolve "Adjust DTOs and mappers according to the new design of questions in the assessment levels"
|/  
* 25e1cc9 -- Update project package.json version based on GitLab tag. Done by CI
*   2af45f3 -- Merge branch '32-fix-task-copy-url' into 'master'
|\  
| * 05d40d5 -- Copy task url fixed
|/  
* 16ff17f -- Update project package.json version based on GitLab tag. Done by CI
*   85daa0d -- Merge branch '30-fix-new-line-template-string-blank-spaces' into 'master'
|\  
| * 7b7ff92 -- Fix new line problem
|/  
*   b8ba84b -- Merge branch '29-integrate-adaptive-learning-techniques' into 'master'
|\  
| * e490310 -- Resolve "Integrate Adaptive learning techniques"
|/  
* 63442f9 -- Update project package.json version based on GitLab tag. Done by CI
*   cd242e5 -- Merge branch '27-update-to-angular-11' into 'master'
|\  
| * f79e59b -- Resolve "Update to Angular 11"
|/  
*   04e38d8 -- Merge branch '26-recreate-package-lock-for-new-package-registry' into 'master'
|\  
| * e96d821 -- recreate package lock
|/  
* 659a048 -- Update project package.json version based on GitLab tag. Done by CI
*   70b4731 -- Merge branch '25-rename-package-scope-to-muni-kypo-crp' into 'master'
|\  
| * 88b2103 -- Resolve "Rename package scope to muni-kypo-crp"
|/  
*   2170243 -- Merge branch '24-migrate-from-tslint-to-eslint' into 'master'
|\  
| * 395b55e -- Migrate to eslint, fix lint warnings/errors
|/  
* 0001a11 -- Update project package.json version based on GitLab tag. Done by CI
*   864ec01 -- Merge branch '23-update-dependencies-to-new-format' into 'master'
|\  
| * af218bf -- Update dependencies
|/  
* c27550e -- Update project package.json version based on GitLab tag. Done by CI
*   59633bf -- Merge branch '22-rename-to-kypo-training-api' into 'master'
|\  
| * 9dfc3de -- Rename package
|/  
* f74c4d3 -- Update project package.json version based on GitLab tag. Done by CI
*   699daab -- Merge branch '20-update-endpoint-for-training-events' into 'master'
|\  
| * 394bae6 -- Changed training event uri to match new backend endpoint
|/  
*   0de3e14 -- Merge branch '19-use-cypress-image-in-ci' into 'master'
|\  
| * 4c7c5e9 -- Resolve "Use cypress image in CI"
|/  
* a0f5c7d -- Update project package.json version based on GitLab tag. Done by CI
* 7676143 -- Update project package.json version based on GitLab tag. Done by CI
*   fcacdff -- Merge branch '18-remove-deep-import-from-rxjs' into 'master'
|\  
| * f22ac6c -- Remove deep imports from rxjs
|/  
* d5310e4 -- Update project package.json version based on GitLab tag. Done by CI
*   eff306f -- Merge branch '17-replace-dependency-on-kypo-common-with-sentinel-common' into 'master'
|\  
| * 2c0061a -- Replace kypo-common with @sentinel/common
|/  
* 2416f07 -- Update project package.json version based on GitLab tag. Done by CI
*   aca94b8 -- Merge branch '16-update-to-angular-10' into 'master'
|\  
| * ba42b44 -- Resolve "Update to Angular 10"
|/  
* 288c5da -- Update project package.json version based on GitLab tag. Done by CI
### 12.0.1 Update gitlab CI
* eed7790 -- [CI/CD] Update packages.json version based on GitLab tag.
*   9d26cd3 -- Merge branch '34-simplify-gitlab-ci-cd-using-csirt-mu-docker-image' into 'master'
|\  
| * c5fdbfc -- Update gitlab CI
|/  
* 7153b7d -- Update project package.json version based on GitLab tag. Done by CI
*   6fdbe4f -- Merge branch '33-update-to-angular-12' into 'master'
|\  
| * 73201e0 -- Update to Angular 12
|/  
* a94cc6a -- Update project package.json version based on GitLab tag. Done by CI
*   c53ba3d -- Merge branch '31-adjust-dtos-and-mappers-according-to-the-new-design-of-questions-in-the-assessment-levels' into 'master'
|\  
| * b7991dc -- Resolve "Adjust DTOs and mappers according to the new design of questions in the assessment levels"
|/  
* 25e1cc9 -- Update project package.json version based on GitLab tag. Done by CI
*   2af45f3 -- Merge branch '32-fix-task-copy-url' into 'master'
|\  
| * 05d40d5 -- Copy task url fixed
|/  
* 16ff17f -- Update project package.json version based on GitLab tag. Done by CI
*   85daa0d -- Merge branch '30-fix-new-line-template-string-blank-spaces' into 'master'
|\  
| * 7b7ff92 -- Fix new line problem
|/  
*   b8ba84b -- Merge branch '29-integrate-adaptive-learning-techniques' into 'master'
|\  
| * e490310 -- Resolve "Integrate Adaptive learning techniques"
|/  
* 63442f9 -- Update project package.json version based on GitLab tag. Done by CI
*   cd242e5 -- Merge branch '27-update-to-angular-11' into 'master'
|\  
| * f79e59b -- Resolve "Update to Angular 11"
|/  
*   04e38d8 -- Merge branch '26-recreate-package-lock-for-new-package-registry' into 'master'
|\  
| * e96d821 -- recreate package lock
|/  
* 659a048 -- Update project package.json version based on GitLab tag. Done by CI
*   70b4731 -- Merge branch '25-rename-package-scope-to-muni-kypo-crp' into 'master'
|\  
| * 88b2103 -- Resolve "Rename package scope to muni-kypo-crp"
|/  
*   2170243 -- Merge branch '24-migrate-from-tslint-to-eslint' into 'master'
|\  
| * 395b55e -- Migrate to eslint, fix lint warnings/errors
|/  
* 0001a11 -- Update project package.json version based on GitLab tag. Done by CI
*   864ec01 -- Merge branch '23-update-dependencies-to-new-format' into 'master'
|\  
| * af218bf -- Update dependencies
|/  
* c27550e -- Update project package.json version based on GitLab tag. Done by CI
*   59633bf -- Merge branch '22-rename-to-kypo-training-api' into 'master'
|\  
| * 9dfc3de -- Rename package
|/  
* f74c4d3 -- Update project package.json version based on GitLab tag. Done by CI
*   699daab -- Merge branch '20-update-endpoint-for-training-events' into 'master'
|\  
| * 394bae6 -- Changed training event uri to match new backend endpoint
|/  
*   0de3e14 -- Merge branch '19-use-cypress-image-in-ci' into 'master'
|\  
| * 4c7c5e9 -- Resolve "Use cypress image in CI"
|/  
* a0f5c7d -- Update project package.json version based on GitLab tag. Done by CI
* 7676143 -- Update project package.json version based on GitLab tag. Done by CI
*   fcacdff -- Merge branch '18-remove-deep-import-from-rxjs' into 'master'
|\  
| * f22ac6c -- Remove deep imports from rxjs
|/  
* d5310e4 -- Update project package.json version based on GitLab tag. Done by CI
*   eff306f -- Merge branch '17-replace-dependency-on-kypo-common-with-sentinel-common' into 'master'
|\  
| * 2c0061a -- Replace kypo-common with @sentinel/common
|/  
* 2416f07 -- Update project package.json version based on GitLab tag. Done by CI
*   aca94b8 -- Merge branch '16-update-to-angular-10' into 'master'
|\  
| * ba42b44 -- Resolve "Update to Angular 10"
|/  
* 288c5da -- Update project package.json version based on GitLab tag. Done by CI
