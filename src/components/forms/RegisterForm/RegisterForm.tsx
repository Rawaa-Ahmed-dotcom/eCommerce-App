import React from 'react'
import styles from "./style.module.css";
import { useForm } from 'react-hook-form';
import { type FormValues } from '../../../utils/RegisterFormUtils';
import { Link } from 'react-router';
const RegisterForm = () => {
    const {register} = useForm<FormValues>();
  return (
    <div className={styles.form_wrapper}>
      <div className={styles.form_header}>
        <h2 >Create Account</h2>
        <p>Join our fashion community</p>
      </div>
      <form>
       <div className={styles.form_row}>
         <div className={styles.form_controller}>
            <label>Full Name</label>
            <input type='text' {...register("username")} placeholder='Jane Doe'/>
        </div>
        <div className={styles.form_controller}>
            <label>Email</label>
            <input type='email' {...register("email")} placeholder='jane@example.com'/>
        </div>
       </div>
        <div className={styles.form_row}>
         <div className={styles.form_controller}>
            <label>Password</label>
            <input type='password' {...register("password")} placeholder='••••••••'/>
        </div>
        <div className={styles.form_controller}>
            <label>Confirm Password</label>
            <input type='password' {...register("confirmPassword")} placeholder='••••••••'/>
        </div>
       </div>
        <div className={styles.form_interests }>
        <h3>I'm interested in:</h3>
        <div className={styles.options}>
            <button>Women</button>
            <button>Men</button>
            <button>Kids</button>
            <button>Babies</button>
        </div>
        <div className={styles.agree_terms}>
          <input type='checkbox' id='agree'/>
          <label htmlFor='agree' className={styles.label}>
            <span className={styles.agree}></span>
            <p>I agree to the <span>Terms of Service</span> and <span>Privacy Policy</span>.</p>
            </label>
        </div>
        <div className={styles.register_btn}>
          <button>Register</button>
        </div>
       </div>
      </form>
      <div className={styles.login_link}>
        <h3>Already have an account? </h3>
        <Link to='/login'>Login</Link>
      </div>
    </div>
  )
}

export default RegisterForm
