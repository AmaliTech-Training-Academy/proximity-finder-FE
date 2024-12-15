import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [InputTextModule, ReactiveFormsModule, CalendarModule],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.sass'
})
export class EventFormComponent {
  @Output() eventAdded = new EventEmitter()

  constructor(private fb: FormBuilder) {}

  eventForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(100)]],
    startDate: ['', Validators.required],
    startTime: ['', Validators.required],
    endDate: ['', Validators.required],
    endTime: ['', Validators.required],
    description: ['', Validators.maxLength(500)]
  })

  onSubmit() {
    if (this.eventForm.valid) {
      const formData = this.eventForm.value
      this.eventAdded.emit(formData)
      this.eventForm.reset()
    }
  }
}
