import styles from "./style.module.css";
import { useForm } from "react-hook-form";
import { type LoginFormValues } from "../../../utils/LoginFormUtils";

const LoginForm = () => {
  const { register } = useForm<LoginFormValues>();
  return (
    <div className={styles.form_wrapper}>
      <div>
        <h1 className={styles.form_header}>Welcome Back</h1>
        <p className={styles.form_description}>Log in to browse the latest for Men, Women, Kids & Babies</p>
      </div>
      <form className={styles.form}>
        <div className={styles.form_controller}>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="name@example.com"
            {...register("email", {
              required: true,
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message:
                  "Please enter a valid email address (e.g. name@example.com)",
              },
            })}
          />
        </div>
        <div className={styles.form_controller}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            {...register("password", {
              required: true,
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_#])[A-Za-z\d@$!%*?&_#]{8,32}$/,
                message:
                  "Password must be 8–32 characters and include uppercase, lowercase, a number, and a special character.",
              },
            })}
          />
        </div>
        <div className={styles.form_controller}>
          <button type="submit">LOG IN</button>
        </div>
      </form>
      <div className={styles.another_methods}>
        <h3>or continue with</h3>
        <div className={styles.options}>
          <button>
           <img src = "/public/SVG.png"/>
            Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
