import { RequestErrorDto } from "../response/error/RequestErrorDto";

export interface RequestValidator {
  validate(request: any): Promise<Array<RequestErrorDto>>;
}