import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { EditorModule } from 'primeng/editor';
import { Router } from '@angular/router';
import { QuoteService } from '../../../service-discovery/services/quote/quote.service';
import { Notyf } from 'notyf';
import { NOTYF } from '../../../../shared/notify/notyf.token';

@Component({
  selector: 'app-quote-details',
  standalone: true,
  imports: [TabMenuModule, CommonModule, TabViewModule,DialogModule,ReactiveFormsModule, EditorModule],
  templateUrl: './quote-details.component.html',
  styleUrl: './quote-details.component.sass'
})
export class QuoteDetailsComponent {

  visible: boolean = false;

  modals = {
    approve: false,
    decline: false
  };

  approveForm:FormGroup = this.fb.group({
   price: ['', Validators.required],
   info: ['', Validators.required],
  });

  declineForm:FormGroup = this.fb.group({
    reason: ['', Validators.required]
  })

  constructor(private router:Router,private fb:FormBuilder,private quoteService:QuoteService,@Inject(NOTYF) private notyf: Notyf){}


  
  showDialog(type: 'approve' | 'decline') {
    this.modals[type] = true;
  }
  closeDialog(type: 'approve' | 'decline') {
    this.modals[type] = false;
  }

goBack() {
  this.router.navigateByUrl('/provider/dashboard/requests');
}

}
