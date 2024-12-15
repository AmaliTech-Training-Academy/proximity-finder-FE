import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { EditorModule, Editor } from 'primeng/editor';
import { DialogModule } from 'primeng/dialog';
import { GeminiService } from '../../../../shared/services/gemini.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import * as marked from 'marked';
import { AiLoaderComponent } from '../../../../shared/components/ai-loader/ai-loader.component';
import { BookingService } from '../../../service-provider/services/booking.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [
    ButtonModule,
    CalendarModule,
    InputTextareaModule,
    EditorModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    AiLoaderComponent,
  ],
  providers: [DatePipe],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.sass',
})
export class BookingFormComponent implements OnInit, OnDestroy {
  prompt!: string;
  isAIDialogVisible: boolean = false;
  @Input() providerEmail!: string;
  @Output() closeDialogEvent = new EventEmitter<boolean>();

  projectDescriptionText = '';
  private aiResponseSubscription!: Subscription;

  isLoading: boolean = false;

  bookingForm!: FormGroup;

  @ViewChild(Editor) editor!: Editor;

  constructor(
    private geminiService: GeminiService,
    private fb: FormBuilder,
    private bookingService: BookingService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.bookingForm = this.fb.group(
      {
        startDate: ['', Validators.required],
        startTime: ['', Validators.required],
        endDate: ['', Validators.required],
        endTime: ['', Validators.required],
        description: ['', Validators.required],
      },
      {
        validators: this.dateTimeValidator(),
      }
    );
  }

  dateTimeValidator() {
    return (formGroup: FormGroup) => {
      const startDate = new Date(formGroup.get('startDate')?.value);
      const endDate = new Date(formGroup.get('endDate')?.value);
      const startTime = formGroup.get('startTime')?.value;
      const endTime = formGroup.get('endTime')?.value;

      if (startDate && endDate && startDate > endDate) {
        return { invalidDateRange: true };
      }

      if (
        startDate.getTime() === endDate.getTime() &&
        startTime &&
        endTime &&
        startTime >= endTime
      ) {
        return { invalidTimeRange: true };
      }

      return null;
    };
  }

  closeDialog() {
    this.closeDialogEvent.emit(false);
  }

  showAIDialog() {
    this.isAIDialogVisible = true;
  }

  closeAIDialog() {
    this.isAIDialogVisible = false;
  }

  onGenerate() {
    this.isLoading = true;

    this.isAIDialogVisible = false;

    this.geminiService.generateDescription(this.prompt);
    this.aiResponseSubscription =
      this.geminiService.generatedResponse$.subscribe({
        next: (aiReponse) => {
          if (aiReponse) {
            this.isLoading = false;
          }
          const htmlContent = marked.parse(
            aiReponse ?? 'Generating description...'
          );

          if (this.editor && this.editor.quill) {
            const quill = this.editor.quill;
            quill.root.innerHTML = htmlContent;
          }
        },
        error: (err) => {
          console.error('Error generating description', err);
          this.isLoading = false;
        },
        complete: () => (this.isLoading = false),
      });
  }

  formatDate(date: string): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy') || '';
  }

  formatTime(time: string): string {
    const date = new Date(time);
    return this.datePipe.transform(date, 'HH:mm') || '';
  }

  onSubmit() {
    if (this.bookingForm.valid) {
      const formValue = this.bookingForm.value;
      const formData = {
        ...formValue,
        startDate: this.formatDate(formValue.startDate),
        startTime: this.formatTime(formValue.startTime),
        endTime: this.formatTime(formValue.endTime),
        endDate: this.formatDate(formValue.endDate),

        assignedProvider: this.providerEmail,
      };

      this.bookingService.bookProvider(formData).subscribe({
        next: (response) => console.log(response),
        error: (error) => console.error(error),
      });
    } else {
      console.log('Form is invalid');
    }
  }

  submitClicked() {
    console.log('Submit button clicked!');
  }

  ngOnDestroy(): void {
    if (this.aiResponseSubscription) {
      this.aiResponseSubscription.unsubscribe();
    }
  }
}
