import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { EditorModule } from 'primeng/editor';
import { Router } from '@angular/router';

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

  constructor(private router:Router){}



  
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
