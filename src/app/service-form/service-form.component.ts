import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.css']
})
export class ServiceFormComponent {
  form = new FormGroup({});
  options: FormlyFormOptions = {};
  model: any;
  fields!: FormlyFieldConfig[];

  type!: string;
  examples = [
    'transport',
    'package'
  ]

  selectOptions: any;

  constructor(
    private userService: UserService,
    private http: HttpClient,
  ) {
    // Runs once when component component is loading
    this.loadExample(this.examples[0]);
    this.populateSelect();
  }

  loadExample(type: string) {
    // generates new form based on json
    // console.log(type);
    this.http.get<FormlyFieldConfig[]>(
      `assets/json-powered/service-type-${type}.json`
    ).subscribe(fields => {
      this.type = type;
      this.form = new FormGroup({});
      this.options = {};
      this.fields = fields;
      this.model = {};
    })
  }

  onSelectChange(serviceOption: any) {
    console.log(serviceOption);
    this.loadExample(serviceOption);
  }

  populateSelect() {
    this.getServiceTypesObservable().subscribe((selectOptions: any) => {
      this.selectOptions = selectOptions;
      // console.log(Object.values(selectOptions)[0]);
    });
    
  }

  getServiceTypesObservable() {
    return this.http.get<any>(
      'assets/json-powered/service-types.json');
  }

  submit() {
    if (this.form.valid) {
      alert(JSON.stringify(this.model));
    }
  }

  mapFields(fields: FormlyFieldConfig[]) {
    return fields.map((f) => {
      if (f.key === 'color') {
        f.type = 'radio';
        f.props!.options = this.userService.getColors();
      }

      return f;
    });
  }
}