import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../component/sidebar/sidebar.component';
import { CardStackComponent } from '../../../component/CardStack/card-stack.component';
import { SidebarAdminComponent } from '../../../component/sidebar-Admin/sidebar-admin.component';
import { BottomNavAdminComponent } from '../../../component/bottom-nav-admin/bottom-nav.component';

@Component({
  selector: 'app-profileadmin',
  standalone: true,
  imports: [SidebarComponent, BottomNavAdminComponent,CardStackComponent, SidebarAdminComponent],
  templateUrl: './profile-admin.component.html',
})
export class Profileadmin {}