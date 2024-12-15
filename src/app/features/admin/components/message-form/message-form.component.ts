import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-message-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './message-form.component.html',
  styleUrl: './message-form.component.sass'
})
export class MessageFormComponent {
  @Input() emailPlaceholder: string = 'Email address';
  @Input() messagePlaceholder: string = 'Message';
  @Input() showWarning: boolean = true;
  @Output() formSubmit = new EventEmitter<{ email: string; reason: string; actionType?: string }>();
  @Input() email: string | null = null

  

  constructor(private fb: FormBuilder) {}

  messageForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    reason: ['', Validators.required],
  });

  ngOnChanges() {
    if (this.email) {
      this.messageForm.patchValue({ email: this.email })
    }
  }

  onSubmit() {
    if (this.messageForm.valid) {
      this.formSubmit.emit(this.messageForm.value);
    }
  }
}
