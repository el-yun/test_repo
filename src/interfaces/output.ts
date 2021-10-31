export interface ErrorStatus {
  status: number
  msg: string
}

export enum HTTP_STATUS {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NON_AUTHOR = 203,
  NO_CONTENT = 204,
  RESET_CONTENT = 205,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  ACCEPTABLE = 406,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}
