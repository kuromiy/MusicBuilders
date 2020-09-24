import { UseCaseError } from "../../../error/UseCaseError";
import { Result } from "../../../utils/Result";
import { TeamGetInput } from "./TeamGetInput";
import { TeamGetOutput } from "./TeamGetOutput";

export interface TeamGetUseCase {
  handle(input: TeamGetInput): Promise<Result<TeamGetOutput, UseCaseError>>;
}