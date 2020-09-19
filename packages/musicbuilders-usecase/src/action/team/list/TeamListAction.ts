import { inject, injectable } from "inversify";
import { Team } from "musicbuilders-domain/src/team/Team";
import { TeamRepository } from "musicbuilders-domain/src/team/TeamRepository";
import { User } from "musicbuilders-domain/src/user/User";
import { UserId } from "musicbuilders-domain/src/user/UserId";
import { UserRepository } from "musicbuilders-domain/src/user/UserRepository";
import { TeamConverter } from "../../../converter/TeamConverter";
import { TeamDto } from "../../../dto/team/TeamDto";
import { UseCaseError } from "../../../error/UseCaseError";
import { Failure } from "../../../utils/Failure";
import { Result } from "../../../utils/Result";
import { Success } from "../../../utils/Success";
import { TeamListInput } from "./TeamListInput";
import { TeamListOutput } from "./TeamListOutput";
import { TeamListUseCase } from "./TeamListUseCase";

@injectable()
export class TeamListAction implements TeamListUseCase {
  private _teamRepository: TeamRepository;
  private _userRepository: UserRepository;

  constructor(@inject("TeamRepository") teamRepository: TeamRepository, @inject("UserRepository") userRepository: UserRepository) {
    this._teamRepository = teamRepository;
    this._userRepository = userRepository;
  }

  public async handle(input: TeamListInput): Promise<Result<TeamListOutput, UseCaseError>> {
    const userId: UserId = new UserId(input.userId);

    // 1. 登録されているユーザーID判定
    const existUser: User | null = await this._userRepository.findByUserId(userId);
    if (!existUser) return new Failure(UseCaseError.DEFAULT);

    // 2. チームリストを取得
    const teamList: Array<Team> = await this._teamRepository.listByUserId(userId);

    const teamDtoList: Array<TeamDto> = teamList.map(TeamConverter.convert);
    const output: TeamListOutput = new TeamListOutput(teamDtoList);
    return new Success(output);
  }
}