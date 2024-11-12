import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.sass'
})
export class StepperComponent {
  
  @Input() currentStep: number = 1;
  @Input() totalSteps: number = 6;
  steps: number[] = Array.from({ length: this.totalSteps }, (_, i) => i + 1);


}
