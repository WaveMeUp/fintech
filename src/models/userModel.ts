/**
 * Created by Viacheslav Osadchiy on 26.06.2017.
 */

export class User {

  constructor(
    public userId: string,
    public phoneNumber: string,
    public token: string,
    public name?: string)
  {

  }
}

