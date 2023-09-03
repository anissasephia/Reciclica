import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { createEffect } from "@ngrx/effects";
import { recoverPassword, recoverPasswordSuccess } from "./login.actions";
import { catchError, map, switchMap } from "rxjs/operators";
import { AuthService } from "src/app/services/auth/auth.service";
import { ofType } from '@ngrx/effects';
import { of } from "rxjs";
import { recoverPasswordFail } from "./login.actions";
import { login } from "./login.actions";
import { loginSuccess } from "./login.actions";
import { loginFail } from "./login.actions";


@Injectable()
export class LoginEffects {

    constructor(private actions$: Actions, private authService: AuthService) {

    }

    recoverPassword$ = createEffect(() =>
        this.actions$.pipe(
            ofType(recoverPassword.type), // Use the action type
            switchMap((payload: { email: string }) =>
                this.authService.recoverEmailPassword(payload.email).pipe(
                    map(() => recoverPasswordSuccess()),
                    catchError(error => of(recoverPasswordFail({ error })))
                )
            )
        )
    );

    login$ = createEffect(() => this.actions$.pipe(
        ofType(login),
        switchMap((payload: { email: string, password: string }) =>
            this.authService.login(payload.email, payload.password).pipe(
                map((user) => loginSuccess({ user })),
                catchError(error => of(loginFail({ error })))

            )
        )
    ));

}