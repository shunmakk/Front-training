import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

type Todos = {
  id: number;
  name: string;
  isCompleted: boolean;
};

const fetchTodos = async () => {
  const res = await fetch("http://localhost:3001/todos");
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }
  return res.json();
};

const Todo = () => {
  const [name, setName] = useState<string>("");

  const addTodo = async () => {
    const res = await fetch("http://localhost:3001/todos/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    return res.json();
  };

  const queryClient = useQueryClient();

  //useMutationでデータを追加
  const addMutation = useMutation({
    mutationFn: addTodo,
    onMutate: () => {
      console.log("onMutate");
    },
    onSuccess: () => {
      //追加ボタンをクリックした後にリロードなどを行わずに追加したデータをブラウザ上に反映させる
      // v4.6以降の推奨される書き方
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: () => {
      console.log("onError");
    },
    onSettled: () => {
      console.log("onSettled");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(name);
    addMutation.mutate();
  };

  //削除
  const deleteTodo = async (id: number) => {
    const res = await fetch(`http://localhost:3001/todos/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    return res.json();
  };

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleRemoveTodo = (id: number) => {
    console.log(id);
    deleteMutation.mutate(id);
  };

  //isCompletedの更新
  const updateTodo = async (todo: Todos) => {
    const res = await fetch(`http://localhost:3001/todos/${todo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    return res.json();
  };

  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleCheckChange = (todo: Todos) => {
    console.log(todo);
    updateMutation.mutate(todo);
  };

  //UseQueryを使ってサーバー側のデータを取得
  //TanStack Query v4では、useQueryの引数の形式が変更されてため注意
  const {
    isLoading,
    isError,
    error,
    data: todos,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  if (isLoading) {
    return <span>loading</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
      <h2>Todo追加</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="todoName">Add Todo</label>
        <input
          id="todoName"
          placeholder="add Todo"
          value={name}
          onChange={handleChange}
        />
      </form>
      <h2>Todo一覧</h2>
      <ul>
        {todos?.map((todo: Todos) => (
          <li
            key={todo.id}
            style={
              todo.isCompleted === true
                ? { textDecorationLine: "line-through" }
                : {}
            }
          >
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() =>
                handleCheckChange({ ...todo, isCompleted: !todo.isCompleted })
              }
            />
            {todo.name}
            <button onClick={() => handleRemoveTodo(todo.id)}>❎</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
