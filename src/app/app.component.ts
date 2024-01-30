import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'reactiveForms';
  myForm:FormGroup;
  constructor(private fb:FormBuilder){
    this.myForm= fb.group({
      userDetails:this.fb.group({
        fname:['',Validators.required],
        email:['',[Validators.required,Validators.email]],
        password:['',Validators.required],
      }),
      additionalDetails:this.fb.group({
        phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
        address:['',Validators.required],
        country:['',Validators.required],
        gender:['',Validators.required],
      }),
      feedbackDetails:this.fb.group({
        comments:['']
      })
    })
  }
  step=1;
  isSubmitted=false;
  get userDetails(){
    return this.myForm.get('userDetails') as FormGroup;
  }
  get additionalDetails(){
    return this.myForm.get('additionalDetails') as FormGroup;
  }
  showPrevious(){
    this.step-=1;
  }
  showNext(){
    const userGroupDetails=this.myForm.get('userDetails')as FormGroup;
    const additionalGroupDetails=this.myForm.get('additionalDetails')as FormGroup;
    if(userGroupDetails.invalid && this.step===1)return
    if(additionalGroupDetails.invalid && this.step ===2)return
    if(this.step<3)
    this.step+=1;
  }
  formSubmit(){
    if(this.myForm.valid){
      this.isSubmitted=true;
    }
    console.log(this.myForm.value);
    
  }
}
