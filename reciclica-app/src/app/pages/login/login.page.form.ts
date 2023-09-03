import { FormGroup, FormBuilder } from '@angular/forms'; // Import the necessary classes
import { Validators } from '@angular/forms';

export class LoginPageForm {
  private formBuilder: FormBuilder;

  constructor(formBuilder: FormBuilder) {
    this.formBuilder = formBuilder;
  }
  
  createForm(): FormGroup {
    return this.formBuilder.group({
      // Define your form controls here
      email: ['',[Validators.required, Validators.email]],
        password: ['',[Validators.required]],
    });
  }
}
