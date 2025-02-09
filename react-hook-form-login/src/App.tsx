import "./App.css";
import { useForm } from "react-hook-form";

type LoginData = {
  email: string;
  password: string;
  age: number;
  showAge: boolean;
};

function App() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { isDirty, errors },
    //複数のバリデーションエラーを取得するためにcriteriaModeをallに
    //reValidateModeをonsubmitに変更して、loginButtonをクリックした時のみバリデーションをかける
  } = useForm<LoginData>({
    criteriaMode: "all",
    reValidateMode: "onSubmit",
    defaultValues: { email: "", password: "" },
  });

  const watchShowAge = watch("showAge", false);

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
        <div>
          <label htmlFor="checkbox">規約に同意する</label>
          <input
            id="checkbox"
            type="checkbox"
            {...register("showAge", {
              required: true,
            })}
          />
          {errors.showAge?.types?.required && <div>checkしてください</div>}
        </div>
        {watchShowAge && (
          <div>
            <label htmlFor="checkbox">最後に10以上の文字を入力して</label>
            <input
              type="number"
              {...register("age", { min: 10, required: true })}
            />
            {errors.age?.types?.min && <div>10以上を入力してください</div>}
            {errors.age?.types?.required && <div>必須の入力項目です</div>}
          </div>
        )}
        <button type="submit" disabled={!isDirty}>
          Login
        </button>
      </form>
    </section>
  );
}

export default App;
