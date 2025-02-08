import "./App.css";
import { useForm } from "react-hook-form";

type LoginData = {
  email: string;
  password: string;
};

function App() {
  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
    //複数のバリデーションエラーを取得するためにcriteriaModeをallに
    //reValidateModeをonsubmitに変更して、loginButtonをクリックした時のみバリデーションをかける
  } = useForm<LoginData>({
    criteriaMode: "all",
    reValidateMode: "onSubmit",
    defaultValues: { email: "", password: "" },
  });
  const onSubmit = (data: LoginData) => console.log(data);

  return (
    <section onSubmit={handleSubmit(onSubmit)}>
      <h1>Login Form</h1>
      <form>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: { value: true, message: "必須の入力項目です" },
            })}
          />
          {errors.email && <div>必須の入力項目です</div>}
        </div>
        <div>
          <label htmlFor="password">PassWord</label>
          <input
            id="password"
            type="password"
            {...register("password", {
              required: { value: true, message: "必須の入力項目です" },
              pattern: {
                value: /^[A-Za-z]+$/,
                message: "アルファベットで入力してください",
              },
              minLength: {
                value: 8,
                message: "最低でも8文字以上入力してください",
              },
            })}
          />
          {errors.password?.types?.required && <div>必須の入力項目です</div>}
          {errors.password?.types?.pattern && (
            <div>{errors.password.types?.pattern}</div>
          )}
          {errors.password?.types?.minLength && (
            <div>最低でも8文字以上入力してください</div>
          )}
        </div>
        <button type="submit" disabled={!isDirty}>
          Login
        </button>
      </form>
    </section>
  );
}

export default App;
