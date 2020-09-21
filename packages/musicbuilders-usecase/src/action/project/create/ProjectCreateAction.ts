import { TeamRepository } from "musicbuilders-domain/src/team/TeamRepository";
import { UserRepository } from "musicbuilders-domain/src/user/UserRepository";
import { ProjectCreateInput } from "./ProjectCreateInput";
import { ProjectCreateOutput } from "./ProjectCreateOutput";
import { ProjectCreateUseCase } from "./ProjectCreateUseCase";
import { ProjectRepository } from "musicbuilders-domain/src/project/ProjectRepository";
import { inject, injectable } from "inversify";
import { ProjectName } from "musicbuilders-domain/src/project/ProjectName";
import { ProjectDescription } from "musicbuilders-domain/src/project/ProjectDescription";
import { UserId } from "musicbuilders-domain/src/user/UserId";
import { TeamId } from "musicbuilders-domain/src/team/TeamId";
import { User } from "musicbuilders-domain/src/user/User";
import { Failure } from "../../../utils/Failure";
import { UseCaseError } from "../../../error/UseCaseError";
import { Result } from "../../../utils/Result";
import { Team } from "musicbuilders-domain/src/team/Team";
import { ProjectId } from "musicbuilders-domain/src/project/ProjectId";
import { Project } from "musicbuilders-domain/src/project/Project";
import { Success } from "../../../utils/Success";

@injectable()
export class ProjectCreateAction implements ProjectCreateUseCase {
  private _projectRepository: ProjectRepository;
  private _teamRepository: TeamRepository;
  private _userRepository: UserRepository;

  constructor(
    @inject("ProjectRepository") projectRepository: ProjectRepository,
    @inject("TeamRepository") teamRepository: TeamRepository,
    @inject("UserRepository") userRepository: UserRepository) {
      this._projectRepository = projectRepository;
      this._teamRepository = teamRepository;
      this._userRepository = userRepository;
  }

  public async handle(input: ProjectCreateInput): Promise<Result<ProjectCreateOutput, UseCaseError>> {
    const projectName: ProjectName = new ProjectName(input.projectName);
    const projectDescription: ProjectDescription = new ProjectDescription(input.projectDescription);
    const userId: UserId = new UserId(input.userId);
    const teamId: TeamId = new TeamId(input.teamId);

    // TODO userRepositoryに問い合わせるのではなくて、teamRepositoryから取得したTeamに問い合わせるべき？
    // 1. 存在するユーザーかどうかを確認
    const existUser: User | null = await this._userRepository.findByUserId(userId);
    if (!existUser) return new Failure(UseCaseError.DEFAULT);

    // 2. 存在するチームかどうかを確認
    const existTeam: Team | null = await this._teamRepository.findByTeamId(teamId);
    if (!existTeam) return new Failure(UseCaseError.DEFAULT);

    // 3. プロジェクトID生成
    const projectId: ProjectId = await this._projectRepository.generateProjectId();

    // 4. プロジェクト作成・登録
    const registerableProject: Project = Project.create(projectId, projectName, projectDescription, userId, teamId);
    const result: number = await this._projectRepository.register(registerableProject);
    if (result === 0) throw new Error("");

    const output: ProjectCreateOutput = new ProjectCreateOutput();
    return new Success(output);
  }
}