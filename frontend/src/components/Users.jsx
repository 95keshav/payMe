import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  // Replace with backend call
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    async function fetchUsers() {
      const authToken = "Bearer " + localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:3000/api/v1/user/bulk?filter=" + filter,
        {
          headers: { Authorization: authToken },
        }
      );
      setUsers(response.data.users);
    }
    fetchUsers();
  }, [filter]);

  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
          onChange={(e) => setFilter(e.target.value)}
        ></input>
      </div>
      <div>
        {users.map((user) => (
          <User key={user.id} user={user} />
        ))}
      </div>
    </>
  );
};

function User({ user }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstname[0].toUpperCase()}
          </div>
        </div>
        <div className="flex flex-col justify-center h-ful">
          <div>
            {user.firstname.toUpperCase()} {user.lastname.toUpperCase()}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center h-ful">
        <Button
          label={"Send Money"}
          onClick={(e) => navigate("/send?id=" + user.id + "&name=" + user.firstname)}
        />
      </div>
    </div>
  );
}
