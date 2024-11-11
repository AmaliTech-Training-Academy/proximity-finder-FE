import { Component } from '@angular/core';
import { RoleSelectComponent } from "../../components/role-select/role-select.component";
import { CommentsComponent } from "../../components/comments/comments.component";

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [RoleSelectComponent, CommentsComponent],
  templateUrl: './role.component.html',
  styleUrl: './role.component.sass'
})
export class RoleComponent {

}
