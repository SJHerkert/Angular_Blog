import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from '../app/models/post.model';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  public postAdded_Observable = new Subject();
  public postToEdit_Observable = new Subject();
  public postToEdit: Post = new Post('', '');
  public postToAdd_Observable = new Subject();
  public postToDelete_Observable = new Subject();

  postToDelete:Post=new Post('','');

  constructor() {}

  notifyPostAddition(msg: string) {
    this.postAdded_Observable.next(msg);
  }

  notifyPostEdit(msg: string) {
    this.postToEdit_Observable.next(msg);
  }

  notifyPostToAdd(msg:string){
    this.postToAdd_Observable.next(msg);
  }

  notifyPostDelete(msg:string){
    this.postToDelete_Observable.next(msg);
  }

  setPostToEdit(post: any) {
    console.log('Edit button clicked', post);
    this.postToEdit = new Post(post.title, post.text);
    this.postToEdit.setId(post._id);
    this.notifyPostEdit('');
  }

  setPostToAdd(){
    this.postToEdit= new Post('','');
    this.postToEdit.setId('');
    this.notifyPostToAdd('');
  }

  setPostToDelete(post:any){
    this.postToDelete=new Post('','');
    this.postToDelete.setId(post._id);
    this.notifyPostDelete('');
  }


}
