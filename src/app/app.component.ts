import { Component, OnInit, OnDestroy } from '@angular/core';
import { CatsServise } from './cats.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
 
  constructor (
    public catsServise: CatsServise
    ) { }

  public formGroup = new FormGroup ({
    SearchQuery: new FormControl<string | null>(null,  [Validators.maxLength(10)]),
    Breed: new FormControl(null),
  })
  
  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    
  }
}
