import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { Post } from '../../app/models/post.model';

@Component({
  selector: 'app-post',
  imports: [CommonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit {
  @Input()  post:any={};
  @Input()  read = true;
  @Input() admin = false;

  constructor(private commonService:CommonService ){
    
  }

  ngOnInit(){    
  }

  setPostToEdit(post:any){
    console.log('Edit button clicked', post);
    this.commonService.setPostToEdit(post);
  }

  setPostToDelete(post:any){
    console.log('Delete button clicked', post);
    this.commonService.setPostToDelete(post);
  }

}
