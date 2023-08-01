import { OperationVariables, QueryResult } from '@apollo/client'

export * from '@apollo/client'

export type QueryResultPartial<
  TData = any,
  TVariables extends OperationVariables = OperationVariables,
> = Partial<QueryResult<TData, TVariables>>
