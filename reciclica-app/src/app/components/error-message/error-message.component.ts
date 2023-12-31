import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent implements OnInit {
  
  @Input() field!: AbstractControl | null;
  @Input() message: string;
  @Input() error!: string;

  constructor() {
    this.message = '';
    this.error ='';
   }


  ngOnInit() { }

 shouldShowComponent() {
    //form.get('email')?.touched && form.get('email')?.errors?.['required']
    if (this.field && this.field.touched && this.field.errors?.[this.error]) {
      return true;
    }
    return false;
  }
}
