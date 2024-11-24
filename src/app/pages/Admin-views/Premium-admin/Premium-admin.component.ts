import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../component/sidebar/sidebar.component';
import { CardStackComponent } from '../../../component/CardStack/card-stack.component';
import { SidebarAdminComponent } from '../../../component/sidebar-Admin/sidebar-admin.component';
import { BottomNavAdminComponent } from '../../../component/bottom-nav-admin/bottom-nav.component';


@Component({
  selector: 'app-premiumAdmin',
  standalone: true,
  imports: [SidebarComponent, BottomNavAdminComponent,CardStackComponent,SidebarAdminComponent],
  templateUrl: './Premium-admin.component.html',
})
export class premiumAdmin {}