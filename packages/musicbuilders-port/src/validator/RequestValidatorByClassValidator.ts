import { validate, ValidationError } from "class-validator";
import { injectable } from "inversify";
import { RequestErrorDto } from "../response/error/RequestErrorDto";
import { RequestValidator } from "./RequestValidator";

@injectable()
export class RequestValidatorByClassValidator implements RequestValidator {
  public async validate(request: any): Promise<Array<RequestErrorDto>> {
    const errors: Array<ValidationError> = await validate(request);
    const errorDtoList: Array<RequestErrorDto> = new Array<RequestErrorDto>();
    if (errors.length > 0) {
      for (const e of errors) {
        if (e.constraints) {
          for (const ccc of Object.keys(e.constraints)) {
            const dto: RequestErrorDto = new RequestErrorDto(e.property, e.constraints[ccc]);
            errorDtoList.push(dto);
          }
        }
      }
    }
    return errorDtoList;
  }
}