/** Types generated for queries found in "lib/repositories/sql/UserRepository.ts" */

/** 'SelectUserByUsernameCommand' parameters type */
export interface ISelectUserByUsernameCommandParams {
  u: string | null | void;
}

/** 'SelectUserByUsernameCommand' return type */
export interface ISelectUserByUsernameCommandResult {
  id: string | null;
  username: string | null;
}

/** 'SelectUserByUsernameCommand' query type */
export interface ISelectUserByUsernameCommandQuery {
  params: ISelectUserByUsernameCommandParams;
  result: ISelectUserByUsernameCommandResult;
}

