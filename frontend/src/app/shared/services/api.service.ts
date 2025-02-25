import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject, tap } from 'rxjs'; 
import { ApiResponse } from '../model/api-response.model';

@Injectable({
  providedIn: 'root'
})
export abstract class ApiService {
  abstract get endpoint(): string;

  constructor(protected http: HttpClient) { }

  private _refreshDataList$ = new Subject<void>();

  private _refreshData$ = new Subject<void>();

  get refreshDataList$() {
    return this._refreshDataList$;
  }

  get refreshData$() {
    return this._refreshData$;
  }

  getPaginatedEntrepriseRangeDate(
    code_entreprise: number, page: number, 
    pageSize: number, search: string,
    startDateStr: string, endDateStr: string): Observable<ApiResponse> {
    let params = new HttpParams()
    .set("page", page.toString())
    .set("page_size", pageSize.toString())
    .set("search", search)
    .set("start_date", startDateStr)
    .set("end_date", endDateStr)
    return this.http.get<ApiResponse>(`${this.endpoint}/${code_entreprise}/all/paginate`, { params });
  }

  getPaginatedEntrepriseByPosRangeDate(
    code_entreprise: number, pos_uuid: string, page: number, 
    pageSize: number, search: string,
    startDateStr: string, endDateStr: string): Observable<ApiResponse> {
    let params = new HttpParams()
    .set("page", page.toString())
    .set("page_size", pageSize.toString())
    .set("search", search)
    .set("start_date", startDateStr)
    .set("end_date", endDateStr)
    return this.http.get<ApiResponse>(`${this.endpoint}/${code_entreprise}/${pos_uuid}/all/paginate`, { params });
  }


  getPaginatedEntreprise(code_entreprise: number, page: number, pageSize: number, search: string): Observable<ApiResponse> {
    let params = new HttpParams()
    .set("page", page.toString())
    .set("page_size", pageSize.toString())
    .set("search", search)
    return this.http.get<ApiResponse>(`${this.endpoint}/${code_entreprise}/all/paginate`, { params });
  }

  getPaginatedEntrepriseByPos(code_entreprise: number, pos_uuid: string, page: number, pageSize: number, search: string): Observable<ApiResponse> {
    let params = new HttpParams()
    .set("page", page.toString())
    .set("page_size", pageSize.toString())
    .set("search", search)
    return this.http.get<ApiResponse>(`${this.endpoint}/${code_entreprise}/${pos_uuid}/all/paginate`, { params });
  }

  getPaginatedCommandeByTableBox(code_entreprise: number, pos_uuid: string, table_box_uuid: string, 
      page: number, pageSize: number, search: string): Observable<ApiResponse> {
    let params = new HttpParams()
    .set("page", page.toString())
    .set("page_size", pageSize.toString())
    .set("search", search)
    return this.http.get<ApiResponse>(`${this.endpoint}/${code_entreprise}/${pos_uuid}/${table_box_uuid}/all/paginate`, { params });
  }
 
  getPaginated(page: number, pageSize: number, search: string): Observable<ApiResponse> {
    let params = new HttpParams()
    .set("page", page.toString())
    .set("page_size", pageSize.toString())
    .set("search", search)
    return this.http.get<ApiResponse>(`${this.endpoint}/all/paginate`, { params });
  }

  getPaginatedById(uuid: string, page: number, pageSize: number, search: string): Observable<any> {
    let params = new HttpParams()
      .set("page", page.toString())
      .set("page_size", pageSize.toString())
      .set("search", search)
    return this.http.get<any>(`${this.endpoint}/all/paginate/${uuid}`, { params });
  }

  getAllByEntrepriseByPosSearch(code_entreprise: number, pos_uuid: string, search: string): Observable<any> {
    let params = new HttpParams() 
      .set("search", search)
    return this.http.get<any>(`${this.endpoint}/${code_entreprise}/${pos_uuid}/all/search`, { params });
  }
  
  getAllBySearch(search: string): Observable<any> {
    let params = new HttpParams() 
      .set("search", search)
    return this.http.get<any>(`${this.endpoint}/all/search/${search}`, { params });
  }

  getAllBySearchEntreprisePos(code_entreprise: number, pos_uuid: string, search: string): Observable<any> {
    return this.http.get(`${this.endpoint}/${code_entreprise}/${pos_uuid}/all/search/${search}`);
  }

  getTotalQty(uuid: string): Observable<any> {
    return this.http.get(`${this.endpoint}/all/total/${uuid}`);
  }

  getAllEntreprise(code_entreprise: number): Observable<any> {
    return this.http.get(`${this.endpoint}/${code_entreprise}/all`);
  }

  getAllEntreprisePos(code_entreprise: number, pos_uuid: string): Observable<any> {
    return this.http.get(`${this.endpoint}/${code_entreprise}/${pos_uuid}/all`);
  }

  getAllEntrepriseById(code_entreprise: number, pos_uuid: string, uuid: string): Observable<any> {
    return this.http.get(`${this.endpoint}/${code_entreprise}/${pos_uuid}/all/${uuid}`);
  }

  getOneEntreprisePos(code_entreprise: number, pos_uuid: string, uuid: string): Observable<any> {
    return this.http.get(`${this.endpoint}/${code_entreprise}/${pos_uuid}/one/${uuid}`);
  }


  getData(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.endpoint}/all`);
  }
 
  getAll(): Observable<any> {
    return this.http.get(`${this.endpoint}/all`);
  }

  getAllById(uuid: string): Observable<any> {
    return this.http.get(`${this.endpoint}/all/${uuid}`);
  }


  getAllByIdCount(uuid: string): Observable<any> {
    return this.http.get(`${this.endpoint}/all/count/${uuid}`);
  }

  get(uuid: string): Observable<any> {
    return this.http.get(`${this.endpoint}/get/${uuid}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${this.endpoint}/create`, data).pipe(tap(() => {
      this._refreshDataList$.next();
      this._refreshData$.next();
    }));
  }
  
  createData(data: any): Observable<number> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post(`${this.endpoint}/create`, data, {
      headers: headers,
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            return event.total ? Math.round((100 * event.loaded) / event.total) : 0;
          case HttpEventType.Response:
            return 100; // Téléchargement terminé
          default:
            return 0;
        }
      })
    );
  }

  update(uuid: string, data: any): Observable<any> {
    return this.http.put(`${this.endpoint}/update/${uuid}`, data).pipe(tap(() => {
      this._refreshDataList$.next();
      this._refreshData$.next();
    }));
  }


  delete(uuid: string): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/delete/${uuid}`).pipe(tap(() => {
      this._refreshDataList$.next();
      this._refreshData$.next();
    }));
  }

  // Get file
  getFile(url: string): Observable<any> {
    return this.http.get(`${this.endpoint}/${url}`);
  }

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.endpoint}/uploads`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  uploadCsvData(data: any[], code_entreprise: number, signature: string): Observable<number> {
    const payload = {
      data,
      code_entreprise,
      signature
    };
    return this.http.post(`${this.endpoint}/uploads`, payload, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            return Math.round((event.loaded / event.total!) * 100);
          case HttpEventType.Response:
            return 100;
          default:
            return 0;
        }
      }),
      tap(() => {
        this._refreshDataList$.next();
        this._refreshData$.next();
      })
    );
  }
}