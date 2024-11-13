import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../component/sidebar/sidebar.component';
import { HeaderComponent } from '../../component/header/header.component';
import { BottomNavComponent } from '../../component/bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, SidebarComponent, HeaderComponent, BottomNavComponent],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  // Example user data
  user = {
    name: 'Víctor Alejandro',
    description: 'Descripción aquí',
    bio: 'Gym rat que solo quiere sacar 100 en press banca y tener cuadritos',
    followers: 10,
    posts: [
      { image: 'assets/post1.jpg', likes: 10 },
      { image: 'assets/post2.jpg', likes: 12 },
      { image: 'assets/post3.jpg', likes: 30 },
    ]
  };

  constructor() {}

  ngOnInit(): void {}
}
