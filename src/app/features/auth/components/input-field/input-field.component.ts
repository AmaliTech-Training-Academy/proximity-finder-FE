import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.sass',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputFieldComponent),
    },
  ],
})
export class InputFieldComponent implements ControlValueAccessor{
  @Input() type:string=''
  @Input() label:string=''
  @Input() placeholder:string=''
  @Input() imgPath:string =''

  isDisabled: boolean = false;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;


  private _value: string = '';
  get value(): string {
    return this._value;
  }
  set value(val: string) {
    this._value = val;
    this.onChange(val);
  }
  onChange = (val: string) => {};
  onTouched = () => {};
  writeValue(value: string): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }


  togglePasswordVisibility(field: 'password' | 'confirmPassword') {
    console.log(this.showPassword)
    if (this.type === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }


}
