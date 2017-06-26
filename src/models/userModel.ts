/**
 * Created by Viacheslav Osadchiy on 26.06.2017.
 */

export class User {

  constructor(
    public userId: string,
    public phone: string,
    public token: string,
    public name?: string)
  {

  }
}

