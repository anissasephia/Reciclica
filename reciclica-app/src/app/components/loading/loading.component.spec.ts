import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { StoreModule } from '@ngrx/store';
import { LoadingComponent } from './loading.component';
import { Store } from '@ngrx/store';
import { loadingReducer } from 'src/store/loading.reducer';
import { show, hide } from 'src/store/loading.actions';
import { AppState } from 'src/store/AppState';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;
  let store: Store<AppState>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingComponent ],
      imports: [
        IonicModule.forRoot(),
      StoreModule.forRoot([]),
      StoreModule.forFeature('loading', loadingReducer)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingComponent);
    store = TestBed.get(Store);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should hide loading component when it is not loading', () => {
    const compiled = fixture.nativeElement;
    store.dispatch(hide());
    fixture.detectChanges();
    expect(compiled.querySelected(".backdrop")).toBeNull();
    
    // expect(compiled.querySelector(".spinner")).toBeNull();
  });

  it('should show loading component when it is loading', () => {
    const compiled = fixture.nativeElement;
    store.dispatch(show());
    fixture.detectChanges();
    expect(compiled.querySelected(".backdrop")).toBeNull();
    
    // expect(compiled.querySelector(".spinner")).toBeNull();
  });
});
