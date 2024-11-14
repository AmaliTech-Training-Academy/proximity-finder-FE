import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-provider-check',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './provider-check.component.html',
  styleUrl: './provider-check.component.sass'
})
export class ProviderCheckComponent {
  form: FormGroup= this.fb.group({
    proof: [false, Validators.requiredTrue],
    license: [false, Validators.requiredTrue],
    insurance: [false, Validators.requiredTrue],
  })


  constructor(private fb: FormBuilder,private router:Router){}

  onSubmit() {
    if (this.form.valid) {
      this.router.navigateByUrl('/pro-signup')
    }
  }
}
