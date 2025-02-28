import { useQuery } from "@tanstack/react-query";

type Todos = {
  id: number;
  name: string;
  isCompleted: boolean;
};

const fetchTodos = async () => {
  const res = await fetch("http://localhost:3001/todos");
  return res.json();
};

const Todo = () => {
  //UseQueryを使ってサーバー側のデータを取得
  //TanStack Query v4では、useQueryの引数の形式が変更されてため注意
  const { data: todos } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  return (
    <div>
      <h1>Todo一覧</h1>
      <ul>
        {todos?.map((todo: Todos) => (
          <li key={todo.id}>{todo.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
