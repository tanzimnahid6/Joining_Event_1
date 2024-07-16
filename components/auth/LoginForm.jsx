"use client";

import { AuthContext } from "@/app/contexts";
import { performLogin } from "@/serverAction";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

const LoginForm = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [password, setPassword] = useState("");
  const { auth, setAuth } = useContext(AuthContext);
  const router = useRouter();
  const loginFormSubmit = async (e) => {
    e.preventDefault();

    try {
      setPending(true);
      const credential = { email, password };
      const found = await performLogin(credential);
      if (found) {
        setAuth(found);
        setError("")
        setEmail("")
        setPassword("")
        router.push("/");
        return 
      } else {
        setError("Please provide a valid email ,  password");
      }
      console.log(found);
    } catch (error) {
      console.log("Login error ", error);
      setError(error.message);
    } finally {
      setPending(false);
    }
  };
  return (
    <>
      <div className="my-2 text-red-500">{error}</div>
      <form className="login-form" onSubmit={loginFormSubmit}>
        {/* email */}
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {/* password */}
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            required
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn-primary w-full mt-4 bg-indigo-600 hover:bg-indigo-800"
        >
          {pending ? "Loging..." : "Login"}
        </button>
      </form>
    </>
  );
};

export default LoginForm;
