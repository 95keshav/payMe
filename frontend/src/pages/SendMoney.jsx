import React, { useState } from "react";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SendMoney = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [ammount, setAmmount] = useState(0);
  const id = searchParams.get("id");
  const firstname = searchParams.get("name");
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className=" flex flex-col text-center border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
        <Heading label={"Send Money"} />
        <div className="flex items-center gap-3">
          <div className="bg-green-500 rounded-full w-12 h-12 flex items-center justify-center">
            <p className="text-2xl text-white">{firstname[0].toUpperCase()}</p>
          </div>
          <div>
            <p className="text-2xl font-semibold">{firstname.toUpperCase()}</p>
          </div>
        </div>
        <InputBox
          label={"Amount"}
          placeholder={"Enter amount"}
          onChangeHandler={(e) => setAmmount(e.target.value)}
        />
        <button
          className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
          onClick={async () => {
            try {
              await axios.post(
                "http://localhost:3000/api/v1/account/transfer",
                {
                  to: id,
                  ammount: ammount,
                },
                {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                }
              );
              navigate("/dashboard");
            } catch (error) {
              console.log(error.message);
            }
          }}
        >
          Initiate Transfer
        </button>
      </div>
    </div>
  );
};
