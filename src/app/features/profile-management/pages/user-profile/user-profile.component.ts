import { Component, inject, OnInit } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteModalComponent } from '../../components/delete-modal/delete-modal.component';
import { AccountDetailsComponent } from '../account-details/account-details.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from "../../../user/components/navbar/navbar.component";
import { UserProfileHeaderComponent } from "../../../../shared/components/user-profile-header/user-profile-header.component";
import { FieldsComponent } from "../../../pro-registration/components/fields/fields.component";
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../services/profile.service';
import { MatIconModule } from '@angular/material/icon';
import { NOTYF } from '../../../../shared/notify/notyf.token';
import { ImageManagementService } from '../../services/image-management.service';
import { IProfile } from '../../models/profile';
import { Observable, Subscription } from 'rxjs';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { initializeUser } from '../../../../utils/decodeToken';
import { ROLE_SEEKER } from '../../../../utils/roles';
import { IPaymentAccount, IPaymentAccountNoId } from '../../../../core/models/payment-account';
import { ReversePipe } from "../../../../utils/reverse.pipe";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [MatDialogModule, ReactiveFormsModule, NavbarComponent, UserProfileHeaderComponent, FieldsComponent, CommonModule, MatIconModule, ReversePipe],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.sass',
  providers: [provideNativeDateAdapter()]
})

export class UserProfileComponent implements OnInit {
  readonly dialog = inject(MatDialog)
  isFormActive = false
  isAccountClicked = false
  isDeleteModal = false
  client!: IProfile
  imageUrl: string | ArrayBuffer | null = null
  selectedFile: File | Blob | undefined
  defaultImage = 'assets/images/default-avatar.png'
  token!: string
  role: string[] = []
  paymentAccounts!: IPaymentAccount[]
  selectedAccount:IPaymentAccount | null = null
  timestamp: number = new Date().getTime()

  private notyf = inject(NOTYF)
  profileSubscription!: Subscription
  imageSubscription!: Subscription

  constructor(private fb: FormBuilder, private profileService: ProfileService, private imageService: ImageManagementService,
              private localStorageService:LocalStorageService
  ) { 
    const userData = initializeUser(this.localStorageService)
    this.token = userData.token
    this.role = userData.role
  }

  ngOnInit() {
    if (this.role[0] === ROLE_SEEKER) {
      this.profileSubscription = this.profileService.getClient().subscribe((client) => {
        this.client = client
        this.updateUserForm()
      })
    }

    this.loadPaymentAccounts()

    this.profileService.getPaymentAccounts()
  }

  userForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]]
  })

  accountInfoForm = this.fb.group({
    bankName: [''],
    accountName: [''],
    accountAlias: [''],
    accountNumber: ['', Validators.maxLength(13)],
    phoneNumber: [''],
    serviceProvider: ['']
  });

  updateUserForm() {
    this.userForm.patchValue({
      name: this.client.userName,
      email: this.client.email,
      phone: this.client.mobileNumber
    })
  }

  selectAccount(account: IPaymentAccount): void {
    this.selectedAccount = account;
    this.isAccountClicked = true;
    this.accountInfoForm.patchValue({
      bankName: account.bankName,
      accountName: account.accountName,
      accountAlias: account.accountAlias,
      accountNumber: account.accountNumber,
      serviceProvider: account.serviceProvider,
      phoneNumber: account.phoneNumber
      
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const {name, phone} = this.userForm.value
      const updatedClient:IProfile = {
             ...this.client,
             userName: name ?? '',
             mobileNumber: phone ?? ''
      }
      
      if (updatedClient.userName !== this.client.userName || updatedClient.mobileNumber !== this.client.mobileNumber) {
        this.profileService.updateClient(updatedClient).subscribe({
          next: (client) => {
            this.client = { ...this.client, ...client }
            this.isFormActive = false
            this.notyf.success('Profile updated successfully')
          },
          error: (error) => {
            this.notyf.error('An error occurred while updating profile')
          }
        })
      }
      else {
        if(this.selectedFile) {
          this.updateProfileImage()
          
        }
      }
    }
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput?.files?.length) {
      const file = fileInput.files[0];

      if (!file.type.startsWith('image/')) {
        this.notyf.error('Please select a valid image file.');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
        this.selectedFile = file;
      };
      reader.readAsDataURL(file);

    }
  }

  updateProfileImage() {
    if (this.selectedFile) {
    this.imageSubscription = this.imageService.uploadProfileImage(this.selectedFile).subscribe({
      next: (response) => {
        this.client.profileImage = response
        this.timestamp = new Date().getTime();
        this.notyf.success('Profile image uploaded successfully')
      },
      error: (error) => {
        console.error(error)
        this.notyf.error('An error occurred while uploading profile image')
      }
    })
    }
    else {
      this.notyf.error('Please select an image to upload')
    }
  }

  openDialog(){
    const dialogComponent = this.isDeleteModal ? DeleteModalComponent : AccountDetailsComponent
    const dialogRef = this.dialog.open(dialogComponent,
      {
        data: this.isDeleteModal
          ? {
              title: 'Delete item',
              message: 'Are you sure you want to delete this account? Deleting account will remove it permanently from your linked accounts',
              type: 'delete',
              confirmText: 'Delete',
              cancelText: 'Cancel'
            }
          : {}
      }
    )
    dialogRef.afterClosed().subscribe((results) => {
      if(results && this.isDeleteModal) {
        this.deleteAccount()
      }
    })
  }


  openAccountDialog() {
    this.isDeleteModal = false
    this.openDialog()
  }

  openDeleteDialog() {
    this.isDeleteModal = true
    this.openDialog()
  } 

  toggleEdit() {
    this.isFormActive = !this.isFormActive
  }


  updateAccount() {
    if (this.accountInfoForm.valid) {
      const { bankName, accountName, accountAlias, accountNumber, phoneNumber, serviceProvider } = this.accountInfoForm.value
      const updatedAccount: IPaymentAccountNoId = {
        bankName: bankName || '',
        accountName: accountName || '',
        accountAlias: accountAlias!,
        accountNumber: accountNumber || '',
        phoneNumber: phoneNumber  || '',
        serviceProvider: serviceProvider || '',
        paymentPreference: this.selectedAccount?.paymentPreference!,
      }
      if (this.selectedAccount) {
        this.profileService.editPaymentAccount(updatedAccount, this.selectedAccount.id).subscribe({
          next: () => {
            this.notyf.success('Account updated successfully')
          },
          error: (error) => {
            console.error(error)
            this.notyf.error('An error occurred while updating account')
          }
        })
      }
    }
  }

  deleteAccount() {
    if (this.selectedAccount) {
      this.profileService.deletePaymentAccount(this.selectedAccount.id).subscribe({
        next: (account) => {
          this.notyf.success('Account deleted successfully')
          this.isAccountClicked = false
        },
        error: (error) => {
          this.notyf.error('An error occurred while deleting account')
        }
      })
    }
  }

  loadPaymentAccounts(): void {
    this.profileService.paymentAccounts$.subscribe(accounts => {
      this.paymentAccounts = accounts
    })
  }

  ngOnDestroy() {
    if (this.profileSubscription) {
      this.profileSubscription.unsubscribe();
    }
  
    if (this.imageSubscription) {
      this.imageSubscription.unsubscribe();
    }
  }
}
