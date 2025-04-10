import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddPostService } from '../../services/add-post.service';
import { Post } from '../../app/models/post.model';
import { CommonService } from '../../services/common.service';


@Component({
  selector: 'app-add-post',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css'
})
export class AddPostComponent implements OnInit{
  postForm:FormGroup;
  submitted=false;
  post: Post = new Post('', '');
  
  @ViewChild('closeBtn') closeBtn!: ElementRef;

  constructor(
    private formBuilder:FormBuilder,
    private addPostService: AddPostService,
    private commonService:CommonService
  ) {
    this.postForm=this.formBuilder.group({
      title:['',Validators.required],
      text:['',Validators.required]
    });
    this.commonService.postToEdit_Observable.subscribe(res=>{
      this.setPostToEdit();
    });  
    this.commonService.postToAdd_Observable.subscribe(res=>{
      this.setPostToEdit();
    });
  }

    setPostToEdit() {
      this.post = this.commonService.postToEdit;
      this.postForm = this.formBuilder.group({
        title: [this.post.getTitle(), Validators.required],
        text: [this.post.getText(), Validators.required]
      });
    }
 
  ngOnInit(){}
  
  get f(){return this.postForm.controls;}

  onSubmit(){
    this.submitted = true;
    //stop here if form is invalid
    if(this.postForm.invalid){
      return;
    }  
  
    this.post.setTitle(this.f['title'].value);
    this.post.setText(this.f['text'].value);

    if (this.post.getId() === '') {
      this.addPostService.addPost( this.post ).subscribe({
        next: (result: any) => {
          if (result ['status'] === 'success') {
            this.closeBtn.nativeElement.click();
            this.commonService.notifyPostAddition('');
          } else {
            console.log ( 'Error adding post' );
          }
        },
          error: (e: any) => {},
          complete: () => {console.info('complete')}
        });
      } else {
        this.addPostService.updatePost( this.post ).subscribe({
          next: (result: any) => {
            if (result ['status'] === 'success') {
              this.closeBtn.nativeElement.click();
              this.commonService.notifyPostAddition('');
            } else {
              console.log( 'Error updating post' );
            }
          },
          error: (e: any) => {},
          complete: () => {console.info('complete') }
          });
        }
      }
      

  //   this.addPostService.addPost(this.post).subscribe({
  //     next:(result:any)=>{
  //       if(result['status'] === 'success'){
  //         this.closeBtn.nativeElement.click();
  //         this.commonService.notifyPostAddition('');
  //         console.log('Post added successfully!');        
  //       }else{
  //         console.log('Error adding post');
  //       }
  //     },
  //     error:(e:any) => {
  //       console.error('An error occurred:', e);
  //     },
  //     complete:()=>{
  //       console.info('Request completed')}
  //   });
  // }
}
