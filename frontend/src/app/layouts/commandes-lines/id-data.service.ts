import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdDataService {
  private uuidSource = new BehaviorSubject<string>("00000000-0000-0000-0000-000000000000"); // Valeur initiale 0 au lieu de null
  currentUUID = this.uuidSource.asObservable();

  private pLength = new BehaviorSubject<number>(0); // Valeur initiale 0 au lieu de null
  prodLength = this.pLength.asObservable();

  private plLength = new BehaviorSubject<number>(0); // Valeur initiale 0 au lieu de null
  platLength = this.plLength.asObservable();

  changeId(uuid: string) {
    this.uuidSource.next(uuid);
  }

  // PRoduct
  changeProd(length: number) {
    this.pLength.next(length);
  }

  // Plat
  changePlat(length: number) {
    this.plLength.next(length);
  }
}
