//classes
import { Component } from '@angular/core';
import { LoginPageForm } from './login.page.form';
import { Form, FormBuilder, FormGroup } from '@angular/forms';

describe('LoginPageForm', () => {

    let loginPageForm: LoginPageForm;
    let form: FormGroup;

    beforeEach(() => {
        loginPageForm = new LoginPageForm(new FormBuilder());
        form = loginPageForm.createForm();
    });

    it('should create login form empity', () => {

        expect(form).not.toBeNull();
        expect(form.get('email')).not.toBeNull();
        expect(form.get('email')?.value).toEqual('');
        expect(form.get('email')?.valid).toBeFalsy();
        expect(form.get('password')).not.toBeNull();
        expect(form.get('password')?.value).toEqual('');
        expect(form.get('password')?.valid).toBeFalsy();
    })

    it('should create login form empity'), () => {
        form.get('email')?.setValue('invalid email');
        expect(form.get('email')?.valid).toBeFalsy();
    }

    it('should have email valid if email is valid'), () => {
        form.get('email')?.setValue('valid@email.com'); // Set email to valid value
        expect(form.get('email')?.valid).toBeTruthy();

    }
    it('should have valid form'),() => {
        form.get('email')?.setValue('valid@email.com'); // Set email to valid value
        form.get('password')?.setValue("anyPassword"); // Set password to valid value
        expect(form.valid).toBeTruthy();

    }

});