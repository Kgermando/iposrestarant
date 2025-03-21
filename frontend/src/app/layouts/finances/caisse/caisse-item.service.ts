import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ApiService } from '../../../shared/services/api.service';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../shared/model/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class CaisseItemService  extends ApiService {
  endpoint: string = `${environment.apiUrl}/caisse-items`;

   getPaginatedCaisseItemByCaisseID(
    code_entreprise: number, caisse_uuid: string, 
    page: number, pageSize: number, search: string,
    startDateStr: string, endDateStr: string
  ): Observable<ApiResponse> {
    let params = new HttpParams()
    .set("page", page.toString())
    .set("page_size", pageSize.toString())
    .set("search", search)
    .set("start_date", startDateStr)
    .set("end_date", endDateStr)
    return this.http.get<ApiResponse>(`${this.endpoint}/${code_entreprise}/${caisse_uuid}/all/paginate`, { params });
  }
 
  getTotalCaisseItemByCaisseID(
   caisse_uuid: string, startDateStr: string, endDateStr: string
  ): Observable<any> {
    let params = new HttpParams()
    .set("start_date", startDateStr)
    .set("end_date", endDateStr);
    return this.http.get<any>(`${this.endpoint}/total-today/${caisse_uuid}`, { params });
  }
} 