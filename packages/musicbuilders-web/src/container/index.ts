import { Container } from "inversify";
import { UserRegisterController } from "musicbuilders-port/src/controller/UserRegisterController";
import { UserRegisterCreateService } from "musicbuilders-port/src/service/UserRegisterCreateService";
import { UserCreateUseCase } from "musicbuilders-usecase/src/action/user/create/UserCreateUseCase";
import { UserCreateAction } from "musicbuilders-usecase/src/action/user/create/UserCreateAction";
import { UserRepository } from "musicbuilders-domain/src/user/UserRepository";
import { UserDatasource } from "../datasource/UserDatasource";
import { LoginController } from "musicbuilders-port/src/controller/LoginController";
import { LoginLoginService } from "musicbuilders-port/src/service/LoginLoginService";
import { UserGetUseCase } from "musicbuilders-usecase/src/action/user/get/UserGetUseCase";
import { UserGetAction } from "musicbuilders-usecase/src/action/user/get/UserGetAction";

const container: Container = new Container();

// Controller設定
container.bind<UserRegisterController>(UserRegisterController).toSelf();
container.bind<LoginController>(LoginController).toSelf();

// Service設定
container.bind<UserRegisterCreateService>(UserRegisterCreateService).toSelf();
container.bind<LoginLoginService>(LoginLoginService).toSelf();

// UseCase設定
container.bind<UserCreateUseCase>("UserCreateUseCase").to(UserCreateAction);
container.bind<UserGetUseCase>("UserGetUseCase").to(UserGetAction);

// Repository設定
container.bind<UserRepository>("UserRepository").to(UserDatasource);

export { container };