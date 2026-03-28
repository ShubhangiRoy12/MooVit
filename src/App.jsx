import { useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import FeedbackPage from "./pages/FeedbackPage";
import HomePage from "./pages/HomePage";

const STORAGE_KEY = "moovit-theme";

function getInitialTheme() {
  if (typeof window === "undefined") {
    return "light";
  }

  const savedTheme = window.localStorage.getItem(STORAGE_KEY);
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.body.className = "";
    document.body.classList.add(`theme-${theme}`);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const themeApi = useMemo(
    () => ({
      theme,
      toggleTheme: () => {
        setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
      },
    }),
    [theme],
  );

  return (
    <Routes>
      <Route path="/" element={<HomePage themeApi={themeApi} />} />
      <Route path="/feedback" element={<FeedbackPage themeApi={themeApi} />} />
      <Route path="/dashboard" element={<DashboardPage themeApi={themeApi} />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
