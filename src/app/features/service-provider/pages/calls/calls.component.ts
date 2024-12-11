import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { TableModule } from 'primeng/table';
import { calls } from '../../data';
import { Statuses } from '../../../../utils/status';
import { CallService } from '../../../service-discovery/services/call/call.service';
import { CallData } from '../../../service-discovery/models/call';
import { callData } from '../../models/callData';


@Component({
  selector: 'app-calls',
  standalone: true,
  imports: [TableModule, CommonModule,],
  templateUrl: './calls.component.html',
  styleUrl: './calls.component.sass'
})
export class CallsComponent {
  
  calls:callData[]=[]

   statuses = Statuses

  activeCall: any = null; 

  constructor(private callService:CallService){}

 
  ngOnInit() {
    this.fetchCallRequests();
  }

  fetchCallRequests() {
    this.callService.getCallRequest().subscribe({
      next: (response) => {
        this.calls = response;
      },
      error: (err) => {
        console.error('Error fetching call requests:', err);
      },
    });
  }

  toggleMenu(call: any) {
    this.activeCall = this.activeCall === call ? null : call;
  }

  updateStatus(call: any, status: string) {
    this.callService.changeStatus(call.id, status).subscribe({
      next: () => {
        call.status = status; 
        this.activeCall = null; 
      },
      error: (err) => {
        console.error('Error updating status:', err);
      },
    });
  }

  @HostListener('document:click', ['$event'])
  closeMenu(event: Event) {
    this.activeCall = null;
  }
}
