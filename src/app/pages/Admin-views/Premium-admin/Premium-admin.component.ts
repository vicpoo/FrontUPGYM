import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../component/sidebar/sidebar.component';
import { BottomNavComponent } from '../../../component/bottom-nav/bottom-nav.component';
import { CardStackComponent } from '../../../component/CardStack/card-stack.component';


@Component({
  selector: 'app-premiumAdmin',
  standalone: true,
  imports: [SidebarComponent, BottomNavComponent,CardStackComponent],
  templateUrl: './Premium-admin.component.html',
})
export class premiumAdmin {}