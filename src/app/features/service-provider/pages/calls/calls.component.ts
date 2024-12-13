import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Statuses } from '../../../../utils/status';
import { CallService } from '../../../service-discovery/services/call/call.service';
import { RequestContent } from '../../../service-discovery/models/call';
import { FormsModule } from '@angular/forms';




@Component({
  selector: 'app-calls',
  standalone: true,
  imports: [TableModule, CommonModule,FormsModule],
  templateUrl: './calls.component.html',
  styleUrl: './calls.component.sass'
})
export class CallsComponent {
  calls: RequestContent[] = [];
  filteredCalls: RequestContent[] = [];
  selectedDate: string | null = null;
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
        this.filteredCalls = this.calls; 
      },
      error: (err) => {
        console.error('Error fetching call requests:', err);
      },
    });
  }

  filterByDate() {
    if (this.selectedDate) {
      this.filteredCalls = this.calls.filter(
        (call) =>
          new Date(call.requestDate).toISOString().split('T')[0] ===
          this.selectedDate
      );
    } else {
      this.filteredCalls = this.calls; 
    }
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
