import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/store/AppState';
import { LoadingState } from 'src/store/loading/LoadingState';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {

  loadingState$: Observable<LoadingState>; // Declare the type of loadingState$

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    // Initialize loadingState$ using the select method
    this.loadingState$ = this.store.select('loading');
  }

}
