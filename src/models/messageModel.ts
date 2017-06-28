/**
 * Created by Viacheslav Osadchiy on 28.06.2017.
 */


export class Message {

  constructor(
    public to: number,
    public money: number,
    public dialogId: number,
    public comment: string,
    public type: string)
  {

  }
}


