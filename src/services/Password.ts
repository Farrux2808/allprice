import { hash, compare, genSalt } from "bcrypt";

export class Password {
  protected _password;
  protected _hash;

  buildPassword(value: string): Password {
    this._password = value;
    return this;
  }

  buildHash(value: string): Password {
    this._hash = value;
    return this;
  }

  getPassword(): string {
    return this._password;
  }

  getHash(): string {
    return this._hash;
  }

  async hash(): Promise<string> {
    const salt = await genSalt(5);
    this._hash = await hash(this._password, salt);
    return this._hash;
  }

  async compare(): Promise<boolean> {
    return compare(this._password, this._hash);
  }
}
