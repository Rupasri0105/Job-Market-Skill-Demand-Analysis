import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Overview from "./pages/Overview";
import Methodology from "./pages/Methodology";
import SkillsAnalysis from "./pages/SkillsAnalysis";
import Visualizations from "./pages/Visualizations";
import Database from "./pages/Database";
import Login from "./pages/Login";
import "./App.css";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState("overview");

  const pages = {
    overview: <Overview />,
    methodology: <Methodology />,
    skills: <SkillsAnalysis />,
    visualizations: <Visualizations />,
    database: <Database />,
  };

  // Show login first
  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="app">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        onLogout={() => setIsLoggedIn(false)}
      />

      <main className="main-content">
        {pages[activePage]}
      </main>
    </div>
  );
}