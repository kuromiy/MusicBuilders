import { RequestErrorDto } from "../error/RequestErrorDto";
import { UseCaseErrorDto } from "../error/UseCaseErrorDto";

/**
 * 抽象クラスで静的メソッドを定義する方法として以下のようなインターフェースと抽象クラスを宣言する。
 * のちにTypescriptで公式にサポートされたら書き換え
 */
interface BaseResponseStatic<T extends BaseResponse> {
  new(): T;
  initialize(o: T, requestErrorDtoList: Array<RequestErrorDto>, useCaseErrorDto: UseCaseErrorDto | null): void;
}

export abstract class BaseResponse {
  protected _requestErrorDtoList!: Array<RequestErrorDto>;
  protected _useCaseErrorDto!: UseCaseErrorDto | null;

  public static createRequestErrorResponse<T extends BaseResponse>(this: BaseResponseStatic<T>, requestErrorDtoList: Array<RequestErrorDto>): T {
    const response = new this();
    this.initialize(response, requestErrorDtoList, null);
    return response;
  }

  public static createUseCaseErrorResponse<T extends BaseResponse>(this: BaseResponseStatic<T>, useCaseErrorDto: UseCaseErrorDto): T{
    const response = new this();
    this.initialize(response, new Array<RequestErrorDto>(), useCaseErrorDto);
    return response;
  }

  public get requestErrorDtoList(): Array<RequestErrorDto> {
		return this._requestErrorDtoList;
	}

	public get useCaseErrorDto(): UseCaseErrorDto {
    if (!this._useCaseErrorDto) throw new Error("");
		return this._useCaseErrorDto;
  }

  public hasRequestError(): boolean {
    return this._requestErrorDtoList.length !== 0;
  }

  public hasUseCaseError(): boolean {
    return this._useCaseErrorDto !== null;
  }
}
