import axios from "axios";
import React, { useState } from "react";

export default function Login() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      setUser(data);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <form>
        {user.name} logged in
        <input
          type="text"
          placeholder="username"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          type="text"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button disabled={!user || !password} onClick={handleClick}>
          {loading ? "Please wait" : "Login"}
        </button>
      </form>

      <span
        data-testid="error"
        style={{ visibility: error ? "visible" : "hidden" }}
      >
        Something went wrong
      </span>
    </div>
  );
}
