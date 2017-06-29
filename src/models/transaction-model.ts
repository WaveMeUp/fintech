/**
 * Модель транзакции
 */

export class TransactionModel {

  constructor(public type: string, public description?: string, public amount?: number) {
    this.amount = 100;
  }




}
