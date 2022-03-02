import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Shopper } from '../../model/Shopper';

@Injectable({
  providedIn: 'root'
})
export class ShopperService {


  private apiServerUrl = environment.apiURL;

  constructor(private http: HttpClient) {
  }


  public addShopper(shopper: Shopper): Observable<Shopper> {
    return this.http.post<Shopper>(`${this.apiServerUrl}/user/register`, shopper);
  }
}
