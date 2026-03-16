import { useState } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username && password) {
      onLogin(); // go to dashboard
    } else {
      alert("Enter username and password");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0b1220",
        color: "white",
        flexDirection: "column",
      }}
    >
      <h2>Skill Demand Dashboard Login</h2>

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ margin: 5, padding: 8 }}
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ margin: 5, padding: 8 }}
      />

      <button onClick={handleLogin} style={{ marginTop: 10 }}>
        Login
      </button>
    </div>
  );
}