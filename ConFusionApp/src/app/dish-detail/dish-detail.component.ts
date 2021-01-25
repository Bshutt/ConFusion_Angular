import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Dish } from "../shared/dish";
import { Params, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { DishService } from "../services/dish.service";
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Comment } from "../shared/comment";
import { visibility, flyInOut, expand } from "../animations/app.animations";



 


@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: [],
  host: {'[@flyInOut]': 'true', 'style': 'display:block'},
  animations: [
    visibility(),
    flyInOut(),
    expand()
  ]
})
export class DishDetailComponent implements OnInit {
  @ViewChild('fform') feedbackFormDirective;
  // Dish detatil
  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  visibility = 'shown'
 

  // comments form
  commentForm: FormGroup;
  comment: Comment;
  dishCopy: Dish;
  errMsg: string;

  formErrors = {
    'author': '',
    'comment': ''
  }; 

  validationMessages = {
    'author': {'required': 'Your name is required', 'minlength': 'Name must be at least 2 character long', 'maxlength': 'Name cannot be more that 25 characters long' },
    'comment': {'required': 'You must enter a comment'}
    
  };

  constructor(private dishService: DishService, private location: Location, private route: ActivatedRoute, private fb: FormBuilder, @Inject('baseURL') public baseURL) { 
    this.createForm();
  }

  ngOnInit(): void {
    this.dishService.getDishIds().subscribe(data => this.dishIds = data);
    this.route.params.pipe(switchMap((params: Params) => {this.visibility = 'hidden'; return this.dishService.getDish(params['id'])}))
    .subscribe(dish => { this.dish = dish; this.dishCopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'});


  }
  createForm(){
    this.commentForm = this.fb.group({
      author: ['',  [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      rating: [0, Validators.required],
      comment: ['', Validators.required] 
    })
    this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();

  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length]
    this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length]
  }
 
  goBack(): void{
    this.location.back()
  } 

  onValueChanged(data?: any) {
  
    if(!this.commentForm){ return;}  //Checks if the form has been created
    const form = this.commentForm;
    for (const field in this.formErrors){  //Allows checking for each field in the formErrors Object
      if (this.formErrors.hasOwnProperty(field)){ // clears for error fields(if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid){
          const messages = this.validationMessages[field];
          for( const key in control.errors){
            if(control.errors.hasOwnProperty(key)){
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }


  onSubmit(){
    this.comment = this.commentForm.value;
    console.log(this.comment);
    this.comment.date = Date.now().toString();
    this.dishCopy.comments.push(this.comment);
    this.dishService.putDish(this.dishCopy)
    .subscribe(dish => {
      this.dish = dish; this.dishCopy = dish},
      err => {this.dish = null; this.dishCopy = null; this.errMsg = <any>this.errMsg;});
    this.commentForm.reset({
     author: '',
     rating: 0,
     comment: ''
    });
    this.feedbackFormDirective.resetForm();
 };
  

}
