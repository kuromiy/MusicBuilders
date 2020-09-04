import { Container } from "inversify";
import { Success } from "./Success";

export class Failure<T, E> {
  type = "failure" as const;
  private _value: E;

  constructor(value: E) {
    this._value = value;
  }

  public get value(): E {
    return this._value;
  }

  public isSuccess(): this is Success<T, E> {
    return false;
  }

  public isFailure(): this is Failure<T, E> {
    return true;
  }
}
