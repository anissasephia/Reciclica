import { StoreModule } from '@ngrx/store';
import { loadingReducer } from './loading/loading.reducer';
import { loginReducer } from './login/login.reducer';
import { LoginEffects } from './login/login.effects';
import { EffectsModule } from '@ngrx/effects';


export const AppStoreModule = [
    StoreModule.forRoot([]),
    StoreModule.forFeature("loading", loadingReducer),
    StoreModule.forFeature("login", loginReducer),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([
        LoginEffects
    ]),
]
    
