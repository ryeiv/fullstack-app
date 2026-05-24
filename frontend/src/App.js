import { useState } from "react";

const API = "/api";

export default function App() {
  const [view, setView]   = useState("login");
  const [email, setEmail] = useState("");
  const [pass, setPass]   = useState("");
  const [name, setName]   = useState("");
  const [msg, setMsg]     = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));

  const register = async () => {
    const r = await fetch(`${API}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password: pass })
    });
    const d = await r.json();
    setMsg(d.message || d.error);
  };

  const login = async () => {
    const r = await fetch(`${API}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: pass })
    });
    const d = await r.json();
    if (d.token) {
      localStorage.setItem("token", d.token);
      setToken(d.token);
      setMsg("Connecté ✅");
    } else {
      setMsg(d.error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setMsg("");
  };

  if (token) return (
    <div style={{ padding: 40 }}>
      <h2>✅ Vous êtes connecté !</h2>
      <button onClick={logout}>Déconnexion</button>
    </div>
  );

  return (
    <div style={{ padding: 40, maxWidth: 400 }}>
      <h1>Mon App Full-Stack</h1>
      <div>
        <button onClick={() => setView("login")}>Login</button>
        <button onClick={() => setView("register")}>Register</button>
      </div>

      {view === "register" && (
        <div>
          <h2>Inscription</h2>
          <input placeholder="Nom" value={name} onChange={e => setName(e.target.value)} /><br/>
          <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br/>
          <input placeholder="Mot de passe" type="password" value={pass} onChange={e => setPass(e.target.value)} /><br/>
          <button onClick={register}>S'inscrire</button>
        </div>
      )}

      {view === "login" && (
        <div>
          <h2>Connexion</h2>
          <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br/>
          <input placeholder="Mot de passe" type="password" value={pass} onChange={e => setPass(e.target.value)} /><br/>
          <button onClick={login}>Se connecter</button>
        </div>
      )}

      {msg && <p style={{ color: "green" }}>{msg}</p>}
    </div>
  );
}