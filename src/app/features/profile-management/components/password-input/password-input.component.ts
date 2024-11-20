import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-password-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.sass',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => PasswordInputComponent),
    },
  ],
})
export class PasswordInputComponent implements ControlValueAccessor {
  @Input() type: string = '';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() imgPath: string = '';
  @Input() error: boolean | undefined = false;
  @Input() field: 'oldPassword' | 'newPassword' | 'confirmPassword' = 'oldPassword';

  isDisabled = false;
  isFocused = false
  oldPasswordVisible = false;
  newPasswordVisible = false;
  confirmPasswordVisible = false;

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

  onFocus(focused: boolean): void {
    this.isFocused = focused;
  }
  
  togglePasswordVisibility(field: 'oldPassword' | 'newPassword' | 'confirmPassword'): void {
    if (field === 'oldPassword') {
      this.oldPasswordVisible = !this.oldPasswordVisible
    }
    else if (field === 'newPassword') {
      this.newPasswordVisible = !this.newPasswordVisible
    }
    else {
      this.confirmPasswordVisible = !this.confirmPasswordVisible
    }
  }

  getPasswordVisibility(field: 'oldPassword' | 'newPassword' | 'confirmPassword'): boolean {
    if (field === 'oldPassword') {
      return this.oldPasswordVisible;
    } else if (field === 'newPassword') {
      return this.newPasswordVisible;
    } else if (field === 'confirmPassword') {
      return this.confirmPasswordVisible;
    }
    return false;
  }
}
