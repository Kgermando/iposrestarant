import { Component, Input } from '@angular/core';
import { IUser } from '../../../../auth/models/user';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-caisse-begin',
  templateUrl: './caisse-begin.component.html',
  styleUrl: './caisse-begin.component.scss'
})
export class CaisseBeginComponent {
  @Input() currentUser!: IUser;
  @Input() totalCaisse: number = 0;   
  @Input() totalEntres: number = 0;
  @Input() totalSorties: number = 0;
  @Input() soldes: number = 0;
  @Input() totalFondDeCaisses: number = 0;

  constructor(private currencyPipe: CurrencyPipe,) { }

    // Format de devise
    formatCurrency(montant: number, currency: string): string {
      return this.currencyPipe.transform(montant, currency, 'symbol', '1.2-2', 'fr-FR') || '';
    }
   
}
