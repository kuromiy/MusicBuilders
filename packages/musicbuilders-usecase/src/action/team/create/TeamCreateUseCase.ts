import { UseCaseError } from "../../../error/UseCaseError";
import { Result } from "../../../utils/Result";
import { TeamCreateInput } from "./TeamCreateInput";
import { TeamCreateOutput } from "./TeamCreateOutput";

export interface TeamCreateUseCase {
  handle(input: TeamCreateInput): Promise<Result<TeamCreateOutput, UseCaseError>>;
}