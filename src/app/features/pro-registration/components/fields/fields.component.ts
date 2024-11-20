import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-fields',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fields.component.html',
  styleUrl: './fields.component.sass',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => FieldsComponent),
    },
  ]
})
export class FieldsComponent  implements ControlValueAccessor {
  @Input() type:string=''
  @Input() label:string=''
  @Input() placeholder:string=''
  @Input() readOnly: boolean = false;
  @Input() error:boolean | undefined =false

  isDisabled: boolean = false;

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



}
