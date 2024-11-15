import { Component } from '@angular/core';
import { FieldsComponent } from "../../../pro-registration/components/fields/fields.component";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FieldsComponent, ReactiveFormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.sass'
})
export class FooterComponent {
  newletter = this.fb.group({
    email: ['', Validators.email]
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {
  }
}
