import { Component, OnInit , ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Feedback, ContactType } from "../shared/feedback";
import { flyInOut, expand } from "../animations/app.animations";
import { FeedbackService } from "../services/feedback-service.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {'[@flyInOut]': 'true', 'style': 'display:block'},
  animations:[ flyInOut(), expand()]
})
export class ContactComponent implements OnInit {
 
  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;
  feedbackResponse: Feedback;
@ViewChild('fform') feedbackFormDirective;
 
formErrors = {
  'firstname': '',
  'lastname': '',
  'telnum': '',
  'email': ''
};

validationMessages = {
  'firstname': {'required': 'First name is required', 'minlength': 'First name must be at least 2 character long', 'maxlength': 'First name cannot be more that 25 characters long' },
  'lastname':  {'required': 'Last name is required', 'minlength': 'Last name must be at least 2 character long', 'maxlength': 'Lasr name cannot be more that 25 characters long' },
  'telnum': {'required': 'A phone number is required', 'pattern': 'A phone number can only contain numbers'},
  'email': {'required': 'An email is required', 'pattern': 'A valid email is required'}
};

  constructor(private fb: FormBuilder, private feedBackService: FeedbackService ) {
    this.createForm();
   }
  
  ngOnInit(): void {
  }
createForm(){
  this.feedbackForm = this.fb.group({
    firstname: ['',  [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
    lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
    telnum: [0,[Validators.required, Validators.pattern]],
    email: ['',[Validators.required, Validators.email]],
    agree:false,
    contacttype: 'None', 
    message: '', 
  })
  this.feedbackForm.valueChanges.subscribe(data => this.onValueChanged(data));
  this.onValueChanged();
}
              //Param optional
onValueChanged(data?: any) {
  
  if(!this.feedbackForm){ return;}  //Checks if the form has been created
  const form = this.feedbackForm;
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
   this.feedback = this.feedbackForm.value;
   this.feedBackService.postFeedBack(this.feedback).subscribe(data => this.feedbackResponse = data);
   setTimeout(() => {
     this.feedbackResponse = null
   },5000)
   this.feedbackForm.reset({
    firstname: '',
    lastname: '',
    telnum: 0,
    email: '',
    agree: false,
    contacttype: 'None',
    message: ''
   });
   this.feedbackFormDirective.resetForm();
};
}

