# CyberRangeᶜᶻ Platform Training API

This library contains Angular API services of backend [Training service](https://github.com/cyberrangecz/backend-training).
It contains default implementation and mapping from DTOs to internal frontend model imported from [Training model](LINK-HERE).
You can override existing services by implementing the related abstract class and provide it in module.

## Usage

To use training-api in your application, follow these steps:

1. Run `npm install @cyberrangecz-platform/training-api`
2. Install peer dependencies
3. Create an instance of `TrainingApiConfig`
4. Import `TrainingApiModule` with config passed to `forRoot()` method

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


