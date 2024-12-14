import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Statuses } from '../../../../utils/status';
import { CallService } from '../../../service-discovery/services/call/call.service';
import { RequestContent } from '../../../service-discovery/models/call';
import { FormsModule } from '@angular/forms';
import { ReversePipe } from '../../../../utils/reverse.pipe';




@Component({
  selector: 'app-calls',
  standalone: true,
  imports: [TableModule, CommonModule,FormsModule,ReversePipe],
  templateUrl: './calls.component.html',
  styleUrl: './calls.component.sass'
})
export class CallsComponent {
  calls: RequestContent[] = [];
  statuses = Statuses;
  activeCall: any = null;

  constructor(private callService: CallService) {}

  ngOnInit() {
    this.fetchCallRequests();
  }

  fetchCallRequests() {
    this.callService.getCallRequest().subscribe({
      next: (response) => {
        this.calls = response.content;
        
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
    this.callService.changeStatus(call.requestId, status).subscribe({
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
