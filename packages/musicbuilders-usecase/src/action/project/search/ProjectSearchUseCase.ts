import { UseCaseError } from "../../../error/UseCaseError";
import { Result } from "../../../utils/Result";
import { ProjectSearchInput } from "./ProjectSearchInput";
import { ProjectSearchOutput } from "./ProjectSearchOutput";

export interface ProjectSearchUseCase {
  handle(input: ProjectSearchInput): Promise<Result<ProjectSearchOutput, UseCaseError>>;
}