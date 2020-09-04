import { Failure } from "./Failure";
import { Success } from "./Success";

export type Result<T, E> = Success<T, E> | Failure<T, E>;