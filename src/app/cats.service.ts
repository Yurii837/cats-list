import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { filter } from 'rxjs/operators';
import { Breeds, Cats } from './NgXS/actions';
import { CatItem } from './Types/cats-list.interface';

@Injectable({
  providedIn: 'root'
})
export class CatsServise {

  
  private httpParams = new HttpParams();
  private xApiKey = 'live_eNRnUuBdiK8cn757CfuP2UQoWT5mkIolUy6D4eYmT1qVNxAqGBLQy8vRnlHerIVy';
  private serverApi = 'https://api.thecatapi.com/v1';


  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private store: Store
  ) {

    this.route.queryParams
      .pipe(
        filter(par => Object.keys(par).length > 0)
      )
      .subscribe(params => {
        console.log(params)
      
      // Retrieve query parameters from the URL
      const breed = params['breed_ids'];
      const limit = params['limit'];
      
      if (breed && limit) {
        this.httpParams = new HttpParams().append('limit', limit).append('breed_ids', breed);
      }
      const headers = new HttpHeaders().append('x-api-key', this.xApiKey);
      const options = {headers, 'params': this.httpParams}
      this.getCats(options)
    })
   }

  private getCats(options: any) {
    this.http.get<CatItem[]>(`${this.serverApi}/images/search`, options)
    .toPromise()
    .then(cats => {
      console.log(cats)
      this.store.dispatch(new Cats(cats))
    })
  }

  public getBreeds() {
    this.http.get<any>(`${this.serverApi}/breeds`)
    .toPromise()
    .then(breeds => {
      console.log(breeds)
      this.store.dispatch(new Breeds(breeds))
    })
  }
}
