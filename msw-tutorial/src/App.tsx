import "./App.css";
import useSWR from "swr";

type ResponseDate = {
  text: string;
};

function App() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, isLoading, error } = useSWR<ResponseDate>("/resource", fetcher);

  if (error) {
    return <p>error</p>;
  }

  if (isLoading) {
    return <p>Loading now...</p>;
  }

  return <>取得データ:{data?.text}</>;
}

export default App;
