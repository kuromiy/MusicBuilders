import { inject, injectable } from "inversify";
import { Team } from "musicbuilders-domain/src/team/Team";
import { TeamId } from "musicbuilders-domain/src/team/TeamId";
import { TeamRepository } from "musicbuilders-domain/src/team/TeamRepository";
import { UserRepository } from "musicbuilders-domain/src/user/UserRepository";
import { TeamConverter } from "../../../converter/TeamConverter";
import { TeamDto } from "../../../dto/team/TeamDto";
import { UseCaseError } from "../../../error/UseCaseError";
import { Failure } from "../../../utils/Failure";
import { Result } from "../../../utils/Result";
import { Success } from "../../../utils/Success";
import { TeamGetInput } from "./TeamGetInput";
import { TeamGetOutput } from "./TeamGetOutput";
import { TeamGetUseCase } from "./TeamGetUseCase";

@injectable()
export class TeamGetAction implements TeamGetUseCase {
  private _teamRepository: TeamRepository;
  
  constructor(@inject("TeamRepository") teamRepository: TeamRepository) {
    this._teamRepository = teamRepository;
  }

  public async handle(input: TeamGetInput): Promise<Result<TeamGetOutput, UseCaseError>> {
    const teamId: TeamId = new TeamId(input.teamId);

    const existTeam: Team | null = await this._teamRepository.findByTeamId(teamId);
    if (!existTeam) return new Failure(UseCaseError.DEFAULT);

    const teamDto: TeamDto = TeamConverter.convert(existTeam);
    const output: TeamGetOutput = new TeamGetOutput(teamDto);
    return new Success(output);
  }
}