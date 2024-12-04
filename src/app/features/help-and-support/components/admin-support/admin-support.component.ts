import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { DeleteComponent } from '../delete/delete.component';
import { EditComponent } from "../edit/edit.component";


@Component({
  selector: 'app-admin-support',
  standalone: true,
  imports: [DialogModule, ReactiveFormsModule, DropdownModule, CommonModule, MenuModule, DeleteComponent, EditComponent],
  templateUrl: './admin-support.component.html',
  styleUrl: './admin-support.component.sass'
})
export class AdminSupportComponent implements AfterViewInit {
  visible: boolean = false;
  menuOpen = false;

  @ViewChild(DeleteComponent) deleteComponent!: DeleteComponent;
  @ViewChild(EditComponent) editComponent!: EditComponent;

    showDialog() {
        this.visible = true;
    }

    menuItems: MenuItem[] = []; 

  ngAfterViewInit(): void {
    this.menuItems = [
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: () => {
          this.editComponent.editDialog(); 
        },
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => {
          this.deleteComponent.deleteDialog(); 
        },
      },
    ];
  }
}
