import "./App.css";
import { useForm } from "react-hook-form";

type LoginData = {
  email: string;
  password: string;
};

function App() {
  const { register, handleSubmit } = useForm<LoginData>();
  const onSubmit = (data: LoginData) => console.log(data);

  return (
    <section onSubmit={handleSubmit(onSubmit)}>
      <h1>Login Form</h1>
      <form>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" {...register("email")} />
        </div>
        <div>
          <label htmlFor="password">PassWord</label>
          <input id="password" {...register("password")} />
        </div>
        <button type="submit">Login</button>
      </form>
    </section>
  );
}

export default App;
