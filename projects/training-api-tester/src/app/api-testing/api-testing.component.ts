import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { TrainingDefinitionApi } from 'projects/training-api/src/public-api';

@Component({
    selector: 'app-api-testing',
    standalone: true,
    imports: [MatButton],
    templateUrl: './api-testing.component.html',
    styleUrl: './api-testing.component.scss',
})
export class ApiTestingComponent {
    constructor(private api: TrainingDefinitionApi) {}

    sendRequest() {
        this.api.createJeopardyLevel(0).subscribe(console.log);
    }
}
