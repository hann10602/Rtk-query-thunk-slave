import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

type FormErrorObject = {
  [key: string | number]: string | FormErrorObject | FormErrorObject[];
};

interface EntityError {
    status: 422,
    data: {
        error: FormErrorObject
    }
}

export function isFetchBaseQueryError(
  error: unknown
): error is FetchBaseQueryError {
  return typeof error === "object" && error !== null && "status" in error;
}

export function isSerializeError(error: unknown): error is { message: string } {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as any).message === "string"
  );
}

export function isEntityError(error: unknown): error is EntityError {
  return (
    isFetchBaseQueryError(error) &&
    error.status === 422 &&
    typeof error.data === "object" &&
    error.data !== null &&
    !(error.data instanceof Array)
  );
}
