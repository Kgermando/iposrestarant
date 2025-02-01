import { Injectable } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService {
  endpoint: string = `${environment.apiUrl}/users`;

  getAllUsersCloud(): Observable<any> {
    return this.http.get(`${environment.apiUrlCloud}/users/all`);
  }
}
