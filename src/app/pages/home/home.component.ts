import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../component/sidebar/sidebar.component';
import { BottomNavComponent } from '../../component/bottom-nav/bottom-nav.component';

@Component({
    selector: 'app-home',
  standalone: true,
  imports: [RouterModule, SidebarComponent, BottomNavComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  isForYouActive = true;
  isFollowingActive = false;

  // Sample posts data
  posts = [
    {
      userImage: 'assets/user1.jpg',
      userName: 'Victor Alejandro',
      image: 'assets/post1.jpg',
      caption: 'Mi cambio físico 2024 / soy esem'
    },
    {
      userImage: 'assets/user2.jpg',
      userName: 'Denzel Enrique',
      image: 'assets/post2.jpg',
      caption: '¿Cómo tener abdominales en 3 días?, pasen tips'
    }
  ];

  // Toggle display for "PARA TI" and "SEGUIDOS"
  showForYou() {
    this.isForYouActive = true;
    this.isFollowingActive = false;
    // Lógica para mostrar publicaciones "Para Ti"
  }

  showFollowing() {
    this.isForYouActive = false;
    this.isFollowingActive = true;
    // Lógica para mostrar publicaciones de "Seguidos"
  }
}
