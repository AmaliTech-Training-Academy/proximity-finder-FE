import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule,FormsModule} from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { DeleteComponent } from '../delete/delete.component';
import { EditComponent } from "../edit/edit.component";
import { Faq } from '../../models/faqs';
import { HelpAndSupportService } from '../../services/help-and-support.service';
import { groups } from '../../../../utils/faqGroups';
import { Notyf } from 'notyf';
import { NOTYF } from '../../../../shared/notify/notyf.token';
import { faqGroup } from '../../models/faqGroup';



@Component({
  selector: 'app-admin-support',
  standalone: true,
  imports: [DialogModule, ReactiveFormsModule, DropdownModule, CommonModule, MenuModule, DeleteComponent, EditComponent,FormsModule],
  templateUrl: './admin-support.component.html',
  styleUrl: './admin-support.component.sass'
})
export class AdminSupportComponent implements AfterViewInit {
  visible: boolean = false;
  faqs: Faq[] = [];
  selectedFaq: Faq | null = null;
  menuOpen = false;
  faqGroups: faqGroup[] = []; 
  selectedFaqGroup!: faqGroup; 

  @ViewChild(DeleteComponent) deleteComponent!: DeleteComponent;
  @ViewChild(EditComponent) editComponent!: EditComponent;
 
  selectFaq(faq: Faq) {
    this.selectedFaq = faq;

  }
  
   groups = groups

   createForm:FormGroup = this.formBuilder.group({
    question: ['', Validators.required],
    answer: ['', Validators.required],
    groupId: ['', Validators.required],

   })


  
  constructor(
    private helpAndSupportService: HelpAndSupportService,
    private formBuilder: FormBuilder,
    @Inject(NOTYF) private notyf: Notyf,
  ) {}

    showDialog() {
        this.visible = true;
    }

    ngOnInit():void {
      this.loadFaqs()
      this.loadFaqGroups()
    }

    loadFaqs() {
      this.helpAndSupportService.getAllFaqs().subscribe({
        next: (faqs) => {
          this.faqs = faqs.map(faq => ({
            ...faq,
            groupName: this.groups.find(group => group.id === faq.groupId)?.name || 'Unknown'
          }));
        },
        error: (error) => {
          console.error('Error loading FAQs', error);
        },
      });
    }

    loadFaqGroups() {
      this.helpAndSupportService.getFaqGroups().subscribe({
        next: (data: any) => {
          this.faqGroups = data.map((group: any) => ({
            label: group.name, 
            value: group.id,   
          }));
        },
        error: (error) => {
          this.notyf.error('Error fetching FAQ groups');
        },
      });
    }


    
    

  onSubmit() {
    if (this.createForm.valid) {
      const newFaq: Faq = this.createForm.value;
      this.helpAndSupportService.createFaq(newFaq).subscribe({
        next: (response) => {
          this.notyf.success('Faq created successfully');
          this.visible = false; 
          this.loadFaqs(); 
        },
        error: (error) => {
          this.notyf.error('Faq could not be created. Please try again');
        }
      });
    }
  }

    menuItems: MenuItem[] = []; 

  ngAfterViewInit(): void {
    this.menuItems = [
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: () => {
          if (this.selectedFaq) {
            this.editComponent.setFaq(this.selectedFaq); 
          }
        },
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => {
          this.deleteComponent.deleteDialog(); 
        },
      },
    ];
  }
  handleFaqEdit(updatedFaq: Faq) {
    const index = this.faqs.findIndex(faq => faq.id === updatedFaq.id);
    if (index !== -1) {
      this.faqs[index] = updatedFaq;
      this.faqs = this.faqs.map(faq => ({
        ...faq,
        groupName: this.groups.find(group => group.id === faq.groupId)?.name || 'Unknown'
      }));
    }
  }
  
  

  handleFaqDelete(faq: Faq) {
    this.helpAndSupportService.deleteFaq(faq).subscribe({
      next: () => {
        this.faqs = this.faqs.filter((item) => item.id !== faq.id);
        this.notyf.success('FAQ deleted successfully');
      },
      error: (error) => {
        this.notyf.error('Failed to delete FAQ');
      },
    });
  }
}
