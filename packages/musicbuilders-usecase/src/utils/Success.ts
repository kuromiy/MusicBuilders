import { Failure } from "./Failure";

export class Success<T, E> {
  type = "success" as const;
  private _value: T;

  constructor(value: T) {
    this._value = value;
  }

  public get value(): T {
    return this._value;
  }

  public isSuccess(): this is Success<T, E> {
    return true;
  }

  public isFailure(): this is Failure<T, E> {
    return false;
  }
}
