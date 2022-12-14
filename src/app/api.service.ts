import { Injectable } from "@angular/core";
import { HttpClient, HttpSentEvent } from '@angular/common/http';
import { Observable, forkJoin } from "rxjs";
import { FormlyFieldConfig } from "@ngx-formly/core";

@Injectable()
export class ApiService {
    constructor(private http: HttpClient) { }

    getUserData(): Observable<any> {
        return forkJoin([this.getUser(), this.getFields()]);
    }

    getUser() {
        return this.http.get<{ firstName: string; lastName: string }>(
            'assets/json-powered/user.json'
        );
    }

    getFields() {
        return this.http.get<FormlyFieldConfig[]>(
            'assets/json-powered/user-form.json'
        );
    }

    getColors() {
        return this.http.get<{ label: string; value: string }[]>(
            'assets/json-powered/colors.json'
        );
    }
}