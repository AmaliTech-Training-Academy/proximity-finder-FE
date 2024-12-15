import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuoteService } from '../../../service-discovery/services/quote/quote.service';
import { getQuote } from '../../../service-provider/models/quoteData';
import { Notyf } from 'notyf';
import { NOTYF } from '../../../../shared/notify/notyf.token';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { EditorModule } from 'primeng/editor';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';

@Component({
  selector: 'app-quote-details',
  standalone: true,
  imports: [TabMenuModule, CommonModule, TabViewModule,DialogModule,ReactiveFormsModule, EditorModule],
  templateUrl: './quote-details.component.html',
  styleUrl: './quote-details.component.sass'
})
export class QuoteDetailsComponent implements OnInit {
  quoteDetails: getQuote | null = null;
  approveForm: FormGroup;
  declineForm: FormGroup;


  modals = {
    approve: false,
    decline: false,
  };
  

  
  reasonText = ''
  constructor(
    private route: ActivatedRoute,
    private quoteService: QuoteService,
    private router: Router,
    private fb: FormBuilder,
    @Inject(NOTYF) private notyf: Notyf
  ) {
    
    this.approveForm = this.fb.group({
      price: ['', Validators.required],
      approvalDetails: ['', Validators.required],
    });

    this.declineForm = this.fb.group({
      declineReason: ['', Validators.required],
    });
  }

  ngOnInit(): void {
   
    this.route.params.subscribe((params) => {
      const requestId = params['requestId'];
      if (requestId) {
        this.fetchQuoteDetails(requestId); 
      }
    });
  }


  fetchQuoteDetails(requestId: number): void {
    this.quoteService.getSingleQuote(requestId).subscribe({
      next: (quoteDetails) => {
        this.quoteDetails = quoteDetails;  
        console.log('Quote details:', quoteDetails); 
      },
      error: (err) => {
        console.error('Error fetching quote details:', err);
        this.notyf.error('Failed to fetch quote details.');
      },
    });
  }

  onApproval() {
    console.log(this.approveForm.value)
    if (this.approveForm.valid && this.quoteDetails) {
      const approvalDetails = this.approveForm.value; 
      const requestId = this.quoteDetails.quoteId; 
  
      this.quoteService.acceptRequest(approvalDetails, requestId).subscribe({
        next: (res) => {
          console.log('Response', res)
          this.modals.approve = false;
          this.notyf.success('Quote approved successfully.');
          this.router.navigateByUrl('/provider/dashboard/requests');
        },
        error: (err) => {
          console.error('Error approving quote:', err);
          this.notyf.error('Failed to approve quote.');
        },
      });
    } else {
      this.notyf.error('Please fill out the approval form correctly.');
    }
  }

  onDecline(){
    console.log(this.declineForm.value)
    if (this.declineForm.valid && this.quoteDetails) {
      const declineReason = this.declineForm.value;
      const requestId = this.quoteDetails.quoteId;
      
      this.quoteService.declineRequest(declineReason, requestId).subscribe({
        next: (res) => {
          console.log('Response', res)
          this.modals.decline = false;
          this.notyf.success('Quote declined successfully.');
          this.router.navigateByUrl('/provider/dashboard/requests');
        },
        error: (err) => {
          console.error('Error declining quote:', err);
          this.notyf.error('Failed to decline quote.');
        },
      });
      
    } else {
      this.notyf.error('Please fill out the decline reason correctly.');
  
  }}
  

  
  showDialog(type: 'approve' | 'decline'): void {
    this.modals[type] = true;
  }

  
  closeDialog(type: 'approve' | 'decline'): void {
    this.modals[type] = false;
  }

  
  goBack(): void {
    this.router.navigateByUrl('/provider/dashboard/requests');
  }
}
