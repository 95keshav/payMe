import { useState } from "react";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const navigate = useNavigate();
  const [cred, setCred] = useState({
    username: "",
    password: "",
  });
  const handleSignIn = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
        username: cred.username,
        password: cred.password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div className="bg-slate-300 h-screen flex justify-center items-center">
        <div className="rounded-lg bg-white text-center w-80 p-2 h-max px-4">
          <Heading label={"Sign In"} />
          <SubHeading label={"Enter your Email and Password to Sign In"} />
          <InputBox
            label={"Email"}
            placeholder={"abc@axy.com"}
            type={"email"}
            onChangeHandler={(e) => {
              setCred({ ...cred, username: e.target.value });
            }}
          />
          <InputBox
            label={"Password"}
            placeholder={"123456"}
            type={"password"}
            onChangeHandler={(e) => setCred({ ...cred, password: e.target.value })}
          />
          <Button label={"Sign in"} onClick={handleSignIn} />
        </div>
      </div>
    </>
  );
};
