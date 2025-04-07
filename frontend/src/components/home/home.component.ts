import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PostComponent } from '../post/post.component';
import { PostService } from '../../services/post.service';


@Component({
  selector: 'app-home',
  imports: [CommonModule, PostComponent],
  providers: [PostService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

  posts: any[] = [];

  constructor(
    public authService: AuthService,
    public router: Router,
    public postService: PostService
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

  getPosts() {
    this.postService.getAllPost().subscribe({
      next: (result: any) => {
        this.posts = result['data'];
        console.log(this.posts);
      },
    });
  }

  ngOnInit() {
    this.getPosts(); 
  }
}
