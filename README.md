# KYPO Training API

This library contains Angular API services of backend [KYPO Training service](https://gitlab.ics.muni.cz/kypo-crp/backend-java/kypo2-training).
It contains default implementation and mapping from DTOs to internal frontend model imported from [kypo-training-model](https://gitlab.ics.muni.cz/kypo-crp/frontend-angular/models/kypo-training-model).
You can override existing services by implementing the related abstract class and provide it in module.


## Prerequisites

* NPM with access to [KYPO registry](https://projects.ics.muni.cz/projects/kbase/knowledgebase/articles/153)

## Usage

To use kypo-training-api in your application, follow these steps:

1. Run `npm install @muni-kypo-crp/training-api`
2. Install peer dependencies
3. Create an instance of `KypoTrainingApiConfig`
4. Import `KypoTrainingApiModule` with config passed to `forRoot()` method

This will provide all API services with default implementation. If you want to override the default implementation, extend an API service

```
@Injectable()
export class MyTrainingDefinitionApi extends TrainingDefinitionApi {
    ...
}
```

and provide your implementation in the module 

```
@NgModule({
    imports: [
       ...
    ],
    providers: [
        { provide: TrainingDefinitionApi, useClass: MyTrainingDefinitionApi }
    ]
})
export class MyModule {
}

```


