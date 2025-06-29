export interface Todo {
  id: string;
  todo: string;
  date: string;
  status: 'PENDING' | 'COMPLETED';
}

export type TodoStatus = 'PENDING' | 'COMPLETED';