/**
 * ユーザーメール
 */
export class UserMail {
  private _value: string;

	constructor(value: string) {
		this._value = value;
	}

	public get value(): string {
		return this._value;
	}
}