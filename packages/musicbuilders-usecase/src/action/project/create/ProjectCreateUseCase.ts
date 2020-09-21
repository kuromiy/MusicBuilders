import { UseCaseError } from "../../../error/UseCaseError";
import { Result } from "../../../utils/Result";
import { ProjectCreateInput } from "./ProjectCreateInput";
import { ProjectCreateOutput } from "./ProjectCreateOutput";

export interface ProjectCreateUseCase {
  handle(input: ProjectCreateInput): Promise<Result<ProjectCreateOutput, UseCaseError>>;
}