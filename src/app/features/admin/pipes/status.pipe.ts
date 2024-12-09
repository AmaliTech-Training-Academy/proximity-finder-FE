import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status',
  standalone: true
})
export class StatusPipe implements PipeTransform {

  transform(value: string): string {
    const statusMapping: { [key: string]: string } = {
      active: 'Active',
      rejected: 'Rejected',
      deactivated: 'Inactive',
      pending: 'Pending',
    };
    return statusMapping[value] || value;
  }

}
