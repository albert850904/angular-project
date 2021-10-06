export class User {
  // 才可以用new的方式見一個新的User obj
  constructor(
    public email: string,
    id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  // getter 可以用user.token來access到這個function
  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}
