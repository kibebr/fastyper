/** Types generated for queries found in "lib/repositories/sql/user/UserRepositoryCommands.ts" */

/** 'SelectUserByUsernameCommand' parameters type */
export interface ISelectUserByUsernameCommandParams {
  u: string | null | void;
}

/** 'SelectUserByUsernameCommand' return type */
export interface ISelectUserByUsernameCommandResult {
  id: string | null;
  username: string | null;
  email: string | null;
  password: string | null;
}

/** 'SelectUserByUsernameCommand' query type */
export interface ISelectUserByUsernameCommandQuery {
  params: ISelectUserByUsernameCommandParams;
  result: ISelectUserByUsernameCommandResult;
}

/** 'SelectUserByEmailCommand' parameters type */
export interface ISelectUserByEmailCommandParams {
  e: string | null | void;
}

/** 'SelectUserByEmailCommand' return type */
export interface ISelectUserByEmailCommandResult {
  id: string | null;
  username: string | null;
  email: string | null;
  password: string | null;
}

/** 'SelectUserByEmailCommand' query type */
export interface ISelectUserByEmailCommandQuery {
  params: ISelectUserByEmailCommandParams;
  result: ISelectUserByEmailCommandResult;
}

/** 'SelectAllUsersCommand' parameters type */
export type ISelectAllUsersCommandParams = void;

/** 'SelectAllUsersCommand' return type */
export interface ISelectAllUsersCommandResult {
  id: string | null;
  username: string | null;
  email: string | null;
  password: string | null;
}

/** 'SelectAllUsersCommand' query type */
export interface ISelectAllUsersCommandQuery {
  params: ISelectAllUsersCommandParams;
  result: ISelectAllUsersCommandResult;
}

/** 'InsertUserCommand' parameters type */
export interface IInsertUserCommandParams {
  user: {
    id: string | null | void,
    username: string | null | void,
    email: string | null | void,
    password: string | null | void
  };
}

/** 'InsertUserCommand' return type */
export type IInsertUserCommandResult = void;

/** 'InsertUserCommand' query type */
export interface IInsertUserCommandQuery {
  params: IInsertUserCommandParams;
  result: IInsertUserCommandResult;
}

