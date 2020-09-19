import { UseCaseError } from "../../../error/UseCaseError";
import { Result } from "../../../utils/Result";
import { TeamListInput } from "./TeamListInput";
import { TeamListOutput } from "./TeamListOutput";

export interface TeamListUseCase {
  handle(input: TeamListInput): Promise<Result<TeamListOutput, UseCaseError>>;
}