import { createContext, useCallback, useContext, useMemo, useState } from "react";

const USERS_KEY = "tenma_users";
const SESSION_KEY = "tenma_session";

function readSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    return data?.email ? data : null;
  } catch {
    return null;
  }
}

function readUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function writeSession(session) {
  if (session) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
}

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readSession);

  const login = useCallback((email, password) => {
    const normalized = email.trim().toLowerCase();
    const users = readUsers();
    const found = users.find(
      (u) => u.email === normalized && u.password === password,
    );
    if (!found) {
      return { ok: false, error: "Неверный email или пароль." };
    }
    const session = { email: found.email };
    writeSession(session);
    setUser(session);
    return { ok: true };
  }, []);

  const register = useCallback((email, password) => {
    const normalized = email.trim().toLowerCase();
    if (!normalized.includes("@")) {
      return { ok: false, error: "Введите корректный email." };
    }
    if (password.length < 6) {
      return { ok: false, error: "Пароль не короче 6 символов." };
    }
    const users = readUsers();
    if (users.some((u) => u.email === normalized)) {
      return { ok: false, error: "Этот email уже зарегистрирован." };
    }
    users.push({ email: normalized, password });
    writeUsers(users);
    const session = { email: normalized };
    writeSession(session);
    setUser(session);
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    writeSession(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, login, register, logout }),
    [user, login, register, logout],
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}