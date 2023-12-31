import { Action, StoreModule } from "@ngrx/store";
import { TestBed } from "@angular/core/testing"
import { Observable, of, throwError } from "rxjs"
import { loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess, login } from "./login.actions";
import { LoginEffects } from "./login.effects";
import { EffectsModule } from "@ngrx/effects";
import { provideMockActions } from "@ngrx/effects/testing";
import { AuthService } from "src/app/services/auth/auth.service";

import { User } from "src/app/model/user/User";

describe('Login effect', () => {
    let effects: LoginEffects;
    let actions$: Observable<Action>;
    let user = new User();
    let error = { error: 'error' };

    let authServiceMock = {
        recoverEmailPassword: (email: string) => {
            if (email == "error@email.com") {
                return throwError(error);
            }
            return of({});
        },
        login: (email: string, password: string) => {
            if (email == "error@email.com") {
                return throwError(error);
            }
            return of(user);
        }
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot([]),
                EffectsModule.forRoot([]),
                EffectsModule.forFeature([
                    LoginEffects
                ])
            ],
            providers: [
                provideMockActions(() => actions$)
            ]
        }).overrideProvider(AuthService, { useValue: authServiceMock });

        effects = TestBed.get(LoginEffects);


        it('should recover password with existing email return success', (done) => {
            actions$ = of(recoverPassword());

            effects.recoverPassword$.subscribe(newAction => {
                expect(newAction).toEqual(recoverPasswordSuccess());
                done();
            });
        })

        it('should recover password with not existing email return an error', (done) => {
            actions$ = of(recoverPassword());

            effects.recoverPassword$.subscribe(newAction => {
                expect(newAction).toEqual(recoverPasswordFail({ error }));
                done();
            })
        })

        it('should login with valid credentials return success', done => {
            actions$ = of(login({ email: "valid@email.com", password: "anyPassword" }));

            effects.login$.subscribe(newAction => {
                expect(newAction).toEqual(loginSuccess({ user }));
                done();
            })
        })

        it('should login with invalid credentials return error', done => {
            actions$ = of(login({ email: "error@email.com", password: "anyPassword" }));

            effects.login$.subscribe(newAction => {
                expect(newAction).toEqual(loginFail({ error }));
                done();
            })

        })
    })
})