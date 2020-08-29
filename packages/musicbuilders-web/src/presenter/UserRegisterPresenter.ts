import { UserRegisterCreateResponse } from "musicbuilders-port/src/response/UserRegisterCreateResponse";
import { UserRegisterViewModel } from "../viewmodel/UserRegisterViewModel";

export class UserRegisterPresenter {
  public static present(response: UserRegisterCreateResponse): UserRegisterViewModel {
    const viewName: string = response.hasError() ? "user/register" : "login";
    const viewmodel = response.hasError() ? response.errorDtoList : null;
    return new UserRegisterViewModel(viewName, viewmodel);
  }
}