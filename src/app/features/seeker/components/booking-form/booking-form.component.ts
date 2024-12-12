import {
  Component,
  EventEmitter,
  OnDestroy,
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
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import * as marked from 'marked';
import { AiLoaderComponent } from '../../../../shared/components/ai-loader/ai-loader.component';

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
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.sass',
})
export class BookingFormComponent implements OnDestroy {
  prompt!: string;
  isAIDialogVisible: boolean = false;
  @Output() closeDialogEvent = new EventEmitter<boolean>();

  projectDescriptionText = '';
  private aiResponseSubscription!: Subscription;

  isLoading: boolean = false;

  @ViewChild(Editor) editor!: Editor;

  constructor(private geminiService: GeminiService) {}

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

  ngOnDestroy(): void {
    if (this.aiResponseSubscription) {
      this.aiResponseSubscription.unsubscribe();
    }
  }
}
