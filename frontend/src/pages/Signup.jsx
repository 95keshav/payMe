import { useState } from "react";
import { ButtonWarning } from "../components/BottonWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-slate-300 h-screen flex justify-center items-center">
        <div className="rounded-lg bg-white text-center w-80 p-2 h-max px-4">
          <Heading label={"Sign Up"} />
          <SubHeading label={"Enter your information to create your account"} />
          <InputBox
            onChangeHandler={(e) =>
              setUserData({ ...userData, firstname: e.target.value })
            }
            label={"First Name"}
            placeholder={"John"}
            type={"text"}
          />
          <InputBox
            onChangeHandler={(e) =>
              setUserData({ ...userData, lastname: e.target.value })
            }
            label={"Last Name"}
            placeholder={"Doe"}
            type={"text"}
          />
          <InputBox
            onChangeHandler={(e) => setUserData({ ...userData, email: e.target.value })}
            label={"Email"}
            placeholder={"abc@axy.com"}
            type={"email"}
          />
          <InputBox
            onChangeHandler={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            label={"Password"}
            placeholder={"123456"}
            type={"password"}
          />
          <Button
            label={"Sign up"}
            onClick={async () => {
              const response = await axios.post(
                "http://localhost:3000/api/v1/user/signup",
                {
                  firstname: userData.firstname,
                  lastname: userData.lastname,
                  username: userData.email,
                  password: userData.password,
                }
              );
              localStorage.setItem("token", response.data.token);
              navigate("/dashboard");
            }}
          />
          <ButtonWarning
            warningText={"Already have an account?"}
            warningLinkText={"SignIn"}
            warningLink={"/signin"}
          />
        </div>
      </div>
    </>
  );
};
