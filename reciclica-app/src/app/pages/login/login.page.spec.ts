import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import { loadingReducer } from 'src/store/loading/loading.reducer';
import { loginReducer } from 'src/store/login/login.reducer';
import { AppState } from 'src/store/AppState';
import { login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from 'src/store/login/login.actions';
import { User } from 'src/app/model/user/User';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: Router;
  let page: any;
  let store: Store<AppState>;
  let toastController: ToastController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [
        IonicModule.forRoot(),
        AppRoutingModule,
        ReactiveFormsModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature("loading", loadingReducer),
        StoreModule.forFeature("login", loginReducer),
        AngularFireModule.initializeApp(environment.firebaseConfig)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    router = TestBed.get(Router);
    store = TestBed.get(Store);
    toastController = TestBed.get(ToastController);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;
  }));

  it('Should create form on init', () => {
    component.ngOnInit();

    expect(component.form).not.toBeUndefined();
  })

  it('should go to register page on register', () => {
    spyOn(router, 'navigate');

    component.register();

    expect(router.navigate).toHaveBeenCalledOnceWith(['register']);
  })

  it('should recover email/password on forgon email/password', () => {
    fixture.detectChanges();
    component.form.get('email')?.setValue("valid@email.com");
    page.querySelector("#recoverPasswordButton").click();

    store.select('login').subscribe(loginState => {
      expect(loginState.isRecoveringPassword).toBeTruthy();
    })
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeTruthy();
    })
  })

  // it('should show loading when recovering password', () => {
  //   fixture.detectChanges();
  //   store.dispatch(recoverPassword());
  // })

  it('given user is recovering password, when succes, then hide loading and show success message', () => {
    spyOn(toastController, 'create');

    //start page
    fixture.detectChanges();
    //set login state as recovering password
    store.dispatch(recoverPassword());
    //set login state as recovered password
    store.dispatch(recoverPasswordSuccess());
    //verify loadingState.show === false
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    })

    //verify message was shown
    expect(toastController.create).toHaveBeenCalledTimes(1);
  })

  it('given user is recovering password, when fail, then hide loading and show error message', () => {
    spyOn(toastController, 'create').and.returnValue(<any>Promise.resolve({ present: () => { } }));

    //start page
    fixture.detectChanges();
    //recover password
    store.dispatch(recoverPassword());
    //recover password fail
    store.dispatch(recoverPasswordFail({ error: "message" }));
    //expect loading not showing
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    })
    //expect error shown
    expect(toastController.create).toHaveBeenCalledTimes(1);
  })

  it('should show loading and start login when logging in', () => {

    fixture.detectChanges();
    //set valid email
    component.form.get('email')?.setValue('valid@email.com');
    //set any password
    component.form.get('password')?.setValue('anyPassword');
    //click on login button
    page.querySelector('#loginButton').click();

    //expect loading is showing
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeTruthy();

    })
    //expect logging in
    store.select('login').subscribe(loginState => {
      expect(loginState.isLoggingIn).toBeTruthy();
    })
  })

  it('given user is logging in, when success, then hide loading and send user to home page', () => {
    spyOn(router, 'navigate');
    // spyOn(authService, 'login').and.returnValue(of(new User()));

    //start page
    fixture.detectChanges();
    store.dispatch(login({ email: "valid@email.com", password: "anyPassword" }));
    store.dispatch(loginSuccess({ user: new User() }));

    //expect loading hidden
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    })
    //expect logged in
    store.select('login').subscribe(loginState => {
      expect(loginState.isLoggedIn).toBeTruthy();
    })
    //expect home page showing
    expect(router.navigate).toHaveBeenCalledWith(['home']);
  })

  it('given user is logging in, when success, then hide loading and show error message', () => {
    spyOn(toastController, 'create').and.returnValue(<any>Promise.resolve({ present: () => { } }));

    //start page
    fixture.detectChanges();
    store.dispatch(login({ email: "valid@email.com", password: "anyPassword" }));
    store.dispatch(loginFail({ error: { message: 'error message' } }));
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    })
    //expect error message shown
    expect(toastController.create).toHaveBeenCalledTimes(1);
  })

});