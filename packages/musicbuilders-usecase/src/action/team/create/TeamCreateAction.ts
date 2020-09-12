import { UseCaseError } from "../../../error/UseCaseError";
import { Result } from "../../../utils/Result";
import { TeamCreateInput } from "./TeamCreateInput";
import { TeamCreateOutput } from "./TeamCreateOutput";
import { TeamCreateUseCase } from "./TeamCreateUseCase";
import { TeamName } from "musicbuilders-domain/src/team/TeamName";
import { TeamDescription } from "musicbuilders-domain/src/team/TeamDescription";
import { TeamRepository } from "musicbuilders-domain/src/team/TeamRepository";
import { UserId } from "musicbuilders-domain/src/user/UserId";
import { UserRepository } from "musicbuilders-domain/src/user/UserRepository";
import { inject, injectable } from "inversify";
import { User } from "musicbuilders-domain/src/user/User";
import { Failure } from "../../../utils/Failure";
import { TeamId } from "musicbuilders-domain/src/team/TeamId";
import { Team } from "musicbuilders-domain/src/team/Team";
import { Success } from "../../../utils/Success";
import { TeamDto } from "../../../dto/team/TeamDto";
import { TeamConverter } from "../../../converter/TeamConverter";

@injectable()
export class TeamCreateAction implements TeamCreateUseCase {
  private _teamRepository: TeamRepository;
  private _userRepository: UserRepository;

  constructor(@inject("TeamRepository") teamRepository: TeamRepository, @inject("UserRepository") userRepository: UserRepository) {
    this._teamRepository = teamRepository;
    this._userRepository = userRepository;
  }

  public async handle(input: TeamCreateInput): Promise<Result<TeamCreateOutput, UseCaseError>> {
    const teamName: TeamName = new TeamName(input.teamName);
    const teamDescription: TeamDescription = new TeamDescription(input.teamDescription);
    const userId: UserId = new UserId(input.userId);

    // 1. 登録されているユーザーID判定
    const existUser: User | null = await this._userRepository.findByUserId(userId);
    if (!existUser) return new Failure(UseCaseError.DEFAULT);

    // 2. チームID生成
    const teamId: TeamId = await this._teamRepository.generateTeamId();
  
    // 3. チーム作成・登録
    const registerableTeam: Team = Team.create(teamId, teamName, teamDescription, userId);
    const result: number = await this._teamRepository.register(registerableTeam);
    if (result === 0) throw new Error("DBエラー");

    const teamDto: TeamDto = TeamConverter.convert(registerableTeam);
    const output: TeamCreateOutput = new TeamCreateOutput(teamDto);
    return new Success(output);
  }
}