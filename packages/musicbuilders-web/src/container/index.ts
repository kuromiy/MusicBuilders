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
import { UserGetByUserMailAction } from "musicbuilders-usecase/src/action/user/getbyusermail/UserGetByUserMailAction";
import { UserGetByUserMailUseCase } from "musicbuilders-usecase/src/action/user/getbyusermail/UserGetByUserMailUseCase";
import { TeamRegisterController } from "musicbuilders-port/src/controller/TeamRegisterController";
import { TeamRegisterCreateService } from "musicbuilders-port/src/service/TeamRegisterCreateService";
import { TeamCreateUseCase } from "musicbuilders-usecase/src/action/team/create/TeamCreateUseCase";
import { TeamCreateAction } from "musicbuilders-usecase/src/action/team/create/TeamCreateAction";
import { TeamRepository } from "musicbuilders-domain/src/team/TeamRepository";
import { TeamDatasource } from "../datasource/TeamDatasource";
import { HomeController } from "musicbuilders-port/src/controller/HomeController";
import { HomeIndexService } from "musicbuilders-port/src/service/HomeIndexService";
import { TeamListUseCase } from "musicbuilders-usecase/src/action/team/list/TeamListUseCase";
import { TeamListAction } from "musicbuilders-usecase/src/action/team/list/TeamListAction";
import { ProjectRegisterController } from "musicbuilders-port/src/controller/ProjectRegisterController";
import { ProjectRegisterCreateService } from "musicbuilders-port/src/service/ProjectRegisterCreateService";
import { ProjectCreateUseCase } from "musicbuilders-usecase/src/action/project/create/ProjectCreateUseCase";
import { ProjectCreateAction } from "musicbuilders-usecase/src/action/project/create/ProjectCreateAction";
import { ProjectRepository } from "musicbuilders-domain/src/project/ProjectRepository";
import { ProjectDatasource } from "../datasource/ProjectDatasource";
import { RequestValidator } from "musicbuilders-port/src/validator/RequestValidator";
import { RequestValidatorByClassValidator } from "musicbuilders-port/src/validator/RequestValidatorByClassValidator";
import { TeamDetailController } from "musicbuilders-port/src/controller/TeamDetailController";
import { TeamDetailIndexService } from "musicbuilders-port/src/service/TeamDetailIndexService";
import { TeamGetUseCase } from "musicbuilders-usecase/src/action/team/get/TeamGetUseCase";
import { TeamGetAction } from "musicbuilders-usecase/src/action/team/get/TeamGetAction";
import { ProjectSearchUseCase } from "musicbuilders-usecase/src/action/project/search/ProjectSearchUseCase";
import { ProjectSearchAction } from "musicbuilders-usecase/src/action/project/search/ProjectSearchAction";
import { ProjectQueryService } from "musicbuilders-usecase/src/query/project/ProjectQueryService";
import { ProjectQuerysource } from "../querysource/ProjectQuerysource";

const container: Container = new Container();

// Controller設定
container.bind<UserRegisterController>(UserRegisterController).toSelf();
container.bind<LoginController>(LoginController).toSelf();
container.bind<TeamRegisterController>(TeamRegisterController).toSelf();
container.bind<HomeController>(HomeController).toSelf();
container.bind<ProjectRegisterController>(ProjectRegisterController).toSelf();
container.bind<TeamDetailController>(TeamDetailController).toSelf();

// Service設定
container.bind<UserRegisterCreateService>(UserRegisterCreateService).toSelf();
container.bind<LoginLoginService>(LoginLoginService).toSelf();
container.bind<TeamRegisterCreateService>(TeamRegisterCreateService).toSelf();
container.bind<HomeIndexService>(HomeIndexService).toSelf();
container.bind<ProjectRegisterCreateService>(ProjectRegisterCreateService).toSelf();
container.bind<TeamDetailIndexService>(TeamDetailIndexService).toSelf();

// UseCase設定
container.bind<UserCreateUseCase>("UserCreateUseCase").to(UserCreateAction);
container.bind<UserGetUseCase>("UserGetUseCase").to(UserGetAction);
container.bind<UserGetByUserMailUseCase>("UserGetByUserMailUseCase").to(UserGetByUserMailAction);
container.bind<TeamCreateUseCase>("TeamCreateUseCase").to(TeamCreateAction);
container.bind<TeamListUseCase>("TeamListUseCase").to(TeamListAction);
container.bind<ProjectCreateUseCase>("ProjectCreateUseCase").to(ProjectCreateAction);
container.bind<TeamGetUseCase>("TeamGetUseCase").to(TeamGetAction);
container.bind<ProjectSearchUseCase>("ProjectSearchUseCase").to(ProjectSearchAction);

// Repository設定
container.bind<UserRepository>("UserRepository").to(UserDatasource);
container.bind<TeamRepository>("TeamRepository").to(TeamDatasource);
container.bind<ProjectRepository>("ProjectRepository").to(ProjectDatasource);

// QueryService設定
container.bind<ProjectQueryService>("ProjectQueryService").to(ProjectQuerysource);

// Util設定
container.bind<RequestValidator>("RequestValidator").to(RequestValidatorByClassValidator);

export { container };