import { Component } from '@angular/core';
import { FieldsComponent } from "../fields/fields.component";
import { Router, RouterLink } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';

interface paymentMethod {
  name: string;
}

@Component({
  selector: 'app-payment-method',
  standalone: true,
  imports: [FieldsComponent,RouterLink,DropdownModule],
  templateUrl: './payment-method.component.html',
  styleUrl: './payment-method.component.sass'
})
export class PaymentMethodComponent {
  paymentMethod!: paymentMethod[];


  constructor(private router:Router){}

  ngOnInit() {
    this.paymentMethod =[
      {name: 'Mobile Money'},
      {name: 'Bank Account'}
    ]
  }
  navigateTo(){
    this.router.navigateByUrl('/registration/about-business');
  }

}
