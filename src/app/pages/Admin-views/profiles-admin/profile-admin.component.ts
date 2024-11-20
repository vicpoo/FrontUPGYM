import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../component/sidebar/sidebar.component';
import { profileAdminService } from '../../../services/profileAdmin.service';
import { BottomNavComponent } from '../../../component/bottom-nav/bottom-nav.component';
import { CardStackComponent } from '../../../component/CardStack/card-stack.component';


@Component({
  selector: 'app-profileadmin',
  standalone: true,
  imports: [SidebarComponent, BottomNavComponent,CardStackComponent],
  templateUrl: './profile-admin.component.html',
})
export class Profileadmin {}