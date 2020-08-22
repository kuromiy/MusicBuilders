import { Container } from "inversify";
import { UserRegisterController } from "musicbuilders-port/src/controller/UserRegisterController";
import { UserRegisterCreateService } from "musicbuilders-port/src/service/UserRegisterCreateService";
import { UserCreateUseCase } from "musicbuilders-usecase/src/action/user/create/UserCreateUseCase";
import { UserCreateAction } from "musicbuilders-usecase/src/action/user/create/UserCreateAction";
import { UserRepository } from "musicbuilders-domain/src/user/UserRepository";
import { UserDatasource } from "../datasource/UserDatasource";

const container: Container = new Container();

// Controller設定
container.bind<UserRegisterController>(UserRegisterController).toSelf();

// Service設定
container.bind<UserRegisterCreateService>(UserRegisterCreateService).toSelf();

// UseCase設定
container.bind<UserCreateUseCase>("UserCreateUseCase").to(UserCreateAction);

// Repository設定
container.bind<UserRepository>("UserRepository").to(UserDatasource);

export { container };