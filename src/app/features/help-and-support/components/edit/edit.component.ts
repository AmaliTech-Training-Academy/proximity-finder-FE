import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { HelpAndSupportService } from '../../services/help-and-support.service';
import { CommonModule } from '@angular/common';
import { Notyf } from 'notyf';
import { NOTYF } from '../../../../shared/notify/notyf.token';
import { Faq } from '../../models/faqs';
import { Subscription } from 'rxjs';
import { faqGroup } from '../../models/faqGroup';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [DialogModule,DropdownModule,CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.sass'
})
export class EditComponent implements OnInit,OnDestroy {
  visible: boolean = false;
  faqGroups: faqGroup[] = []; 
  selectedFaqGroup: any; 
  @Input() faq: Faq | null = null;
  @Output() editFaq = new EventEmitter<Faq>();

  loadFaqGroupSub!:Subscription
  saveSub!:Subscription


  
  editForm:FormGroup = this.formBuilder.group({
    question: ['', Validators.required],
    answer: ['', Validators.required],
    groupId: ['', Validators.required],

   })

  constructor(private helpAndSupportService: HelpAndSupportService,  private formBuilder:   FormBuilder,
    @Inject(NOTYF) private notyf: Notyf,) {}

 
    ngOnInit() {
      this.loadFaqGroups();
    }
  
    editDialog() {
      this.visible = true;
    }

    
  
    onSave() {
      if (this.editForm.valid) {
        const updatedFaq = { ...this.faq, ...this.editForm.value };
        this.saveSub=this.helpAndSupportService.editFaq(updatedFaq).subscribe({
          next: () => {
            this.visible = false;
            this.notyf.success('FAQ updated successfully!');
            this.editFaq.emit(updatedFaq); 
          },
          error: (error) => {
            console.error('Error updating FAQ', error);
            this.notyf.error('Failed to update FAQ.');
          },
        });
      }
    }
    
  
    onCancel() {
      this.visible = false;
    }
  
    setFaq(faq: Faq) {
      this.faq = faq;
      this.editForm.patchValue({
        question: faq.question,
        answer: faq.answer,
        groupId: faq.groupId
      });
      this.editDialog();
    }
  
    loadFaqGroups() {
      this.loadFaqGroupSub=this.helpAndSupportService.getFaqGroups().subscribe({
        next: (data: any) => {
          this.faqGroups = data.map((group: any) => ({
            label: group.name,
            value: group.id,
          }));
        },
        error: (error) => {
          console.error('Error fetching FAQ groups:', error);
        },
      });
    }

    ngOnDestroy(){
      if(this.loadFaqGroupSub){
        this.loadFaqGroupSub.unsubscribe()
      }

      if(this.saveSub){
        this.saveSub.unsubscribe()
      }
    }

}
