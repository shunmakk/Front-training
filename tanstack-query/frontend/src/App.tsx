import "./App.css";
import Todo from "./components/Todo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  return (
    <>
      <QueryClientProvider client={new QueryClient()}>
        <Todo />
      </QueryClientProvider>
    </>
  );
}

export default App;
