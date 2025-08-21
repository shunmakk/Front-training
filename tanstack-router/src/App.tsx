import { useSuspenseQuery } from "@tanstack/react-query";
import "./App.css";
import { Link, useNavigate } from "@tanstack/react-router";

function App() {
  const navigate = useNavigate();

  //10%の確率でエラーを起こす
  if (Math.random() > 0.9) {
    throw new Error("Error");
  }

  // 3秒遅延して返却されるエンドポイントを叩く
  const { data } = useSuspenseQuery({
    queryKey: ["app"],
    queryFn: async () => {
      const res = await fetch("https://httpbin.org/delay/3");
      return res.json();
    },
  });

  return (
    <>
      <h1>Hello World</h1>
      <div className="wrapper">
        <Link to="/page1">Home</Link>
        <button
          onClick={() =>
            navigate({
              to: "/page1",
            })
          }
        >
          Go to Home
        </button>
      </div>
      <p>Json Data: {JSON.stringify(data)}</p>
    </>
  );
}

export default App;
