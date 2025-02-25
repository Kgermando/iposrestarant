import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../shared/services/api.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IngStockService extends ApiService {
  endpoint: string = `${environment.apiUrl}/ingredients-stocks`;

  getPaginatedByIdRangeDate(
    uuid: string,
    page: number, 
    pageSize: number, search: string,
    startDateStr: string,
    endDateStr: string
  ): Observable<any> {
    let params = new HttpParams()
      .set("page", page.toString())
      .set("page_size", pageSize.toString())
      .set("search", search)
      .set("start_date", startDateStr)
      .set("end_date", endDateStr)
    return this.http.get<any>(`${this.endpoint}/all/paginate/${uuid}`, { params });
  }

  getStatsIngredientStock(
    code_entreprise: number,
    ingredient_uuid: string,
  ): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/${code_entreprise}/total/get-all/${ingredient_uuid}`);
  }

  GetStatsParIngredientStock(
    code_entreprise: number,
    ingredient_uuid: string,
    startDateStr: string,
    endDateStr: string
  ): Observable<any> {
    let params = new HttpParams()
      .set("start_date", startDateStr)
      .set("end_date", endDateStr)
    return this.http.get<any>(`${this.endpoint}/${code_entreprise}/total/get/${ingredient_uuid}`, { params });
  }
}
