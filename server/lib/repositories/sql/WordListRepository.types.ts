/** Types generated for queries found in "lib/repositories/sql/WordListRepository.ts" */
export type stringArray = (string)[];

/** 'SelectWordListByIdCommand' parameters type */
export interface ISelectWordListByIdCommandParams {
  id: string | null | void;
}

/** 'SelectWordListByIdCommand' return type */
export interface ISelectWordListByIdCommandResult {
  id: string | null;
  title: string | null;
  difficulty: string | null;
  words: stringArray | null;
}

/** 'SelectWordListByIdCommand' query type */
export interface ISelectWordListByIdCommandQuery {
  params: ISelectWordListByIdCommandParams;
  result: ISelectWordListByIdCommandResult;
}

