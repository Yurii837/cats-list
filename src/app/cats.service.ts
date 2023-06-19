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
  private headers = new HttpHeaders();
  private xApiKey = 'live_eNRnUuBdiK8cn757CfuP2UQoWT5mkIolUy6D4eYmT1qVNxAqGBLQy8vRnlHerIVy';
  private serverApi = 'https://api.thecatapi.com/v1';
  
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private store: Store
  ) {

    // listen quryParams and trigger changes
    this.route.queryParams
      .pipe(
        filter(par => Object.keys(par).length > 0)
      )
      .subscribe(params => {  
      // Retrieve query parameters from the URL
      const breed = params['breed_ids'];
      const limit = params['limit'];
      
      if (breed) {
        this.httpParams = this.httpParams.set('breed_ids', String(breed));
      }

      if (limit) {
        this.httpParams = this.httpParams.set('limit', String(limit));
      }

      this.headers = this.headers.append('x-api-key', this.xApiKey);
      const options = {'headers': this.headers, 'params': this.httpParams};
      this.getCats(options);
    })

   }

  private getCats(options: any) {
    this.http.get<CatItem[]>(`${this.serverApi}/images/search`, options)
    .toPromise()
    .then(cats => {
      this.store.dispatch(new Cats(cats));
    })
  }

  public getBreeds() {
    this.http.get<any>(`${this.serverApi}/breeds`)
    .toPromise()
    .then(breeds => {
      this.store.dispatch(new Breeds(breeds));
    })
  }

  public getCat(id: string) {
    return this.http.get<any>(`${this.serverApi}/images/${id}`, {'headers': this.headers});
  }
}
