import "./App.css";
import useSWR from "swr";
import { User } from "./mocks/handler";

function App() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, isLoading, error } = useSWR<User[]>("/api/users", fetcher);

  if (error) {
    return <p>error</p>;
  }

  if (isLoading) {
    return <p>Loading now...</p>;
  }

  return (
    <>
      取得データ:
      {data?.map((user) => (
        <div key={user.id}>
          ID: {user.id}, Name: {user.name}
        </div>
      ))}
    </>
  );
}

export default App;
