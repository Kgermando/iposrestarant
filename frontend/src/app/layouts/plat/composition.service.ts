import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../shared/services/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompositionService extends ApiService {
  endpoint: string = `${environment.apiUrl}/compositions`;

  
  GetCompositionByPlatUUID(plat_uuid: string): Observable<any> {
    return this.http.get(`${this.endpoint}/all/${plat_uuid}`);
  }
}
 
