import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PostService } from '../../services/post.service';
import { PostComponent } from '../post/post.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AddPostComponent } from "../add-post/add-post.component";
import { CommonService } from '../../services/common.service';
import { Post } from '../../app/models/post.model';
import { AddPostService } from '../../services/add-post.service';


@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, PostComponent, AddPostComponent],
  providers: [AuthService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {
  posts:any[]=[];
  postToDelete:Post = new Post('',''); 

  @ViewChild('addPost') addBtn!: ElementRef;
  @ViewChild('editPost') editBtn!: ElementRef;
  @ViewChild('deletePost') deleteBtn!: ElementRef;  


  constructor(
    private postService:PostService,
    private authService:AuthService,
    private router:Router,
    private commonService:CommonService,
    private addPostService:AddPostService    
  ){
    this.commonService.postToEdit_Observable.subscribe(res=>{
      this.editBtn.nativeElement.click();
    });
    this.commonService.postToDelete_Observable.subscribe(res=>{
    this.postToDelete=this.commonService.postToDelete;
    this.deleteBtn.nativeElement.click();  
    });    
  }

  ngOnInit(){
    this.getPosts();
    this.commonService.postAdded_Observable.subscribe((res) =>{
      this.getPosts();
    });
  }

  getPosts(){
    this.postService.getPostsByAuthor().subscribe({
      next:(result:any) => {
        this.posts = result['data'];
        console.log(this.posts);
      }
    });
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['']);
  }

  resetPost(){
    this.commonService.setPostToAdd();
  }

  delete(){
    console.log(this.postToDelete);
    this.addPostService.deletePost(this.postToDelete).subscribe(
      (res)=>{
        this.getPosts();
      });
  }

}
