import { StatusCodes } from "http-status-codes";

export class ApiError extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number
  ) {
    super(message);
  }
}

class BadRequest extends ApiError {
  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}

class NotFound extends ApiError {
  constructor(message: string) {
    super(message, StatusCodes.NOT_FOUND);
  }
}

class Unauthorized extends ApiError {
  constructor(message: string) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}

class Forbidden extends ApiError {
  constructor(message: string) {
    super(message, StatusCodes.FORBIDDEN);
  }
}

class Conflict extends ApiError {
  constructor(message: string) {
    super(message, StatusCodes.CONFLICT);
  }
}

class InternalServer extends ApiError {
  constructor(message: string) {
    super(message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

const errorMiddleware = {
  ApiError,
  BadRequest,
  NotFound,
  Unauthorized,
  Forbidden,
  Conflict,
  InternalServer,
};

export default errorMiddleware;
