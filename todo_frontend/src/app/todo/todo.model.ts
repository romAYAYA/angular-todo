export interface ITodo {
  id: string,
  text: string,
  isDone: boolean,
  createdOn: string
}

export interface ITodoRequest {
  text: string,
  isDone: boolean
}
