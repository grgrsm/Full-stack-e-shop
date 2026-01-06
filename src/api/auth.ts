// src/api/auth.ts
export const API_URL = "http://localhost:3000";
import { jwtDecode } from "jwt-decode";
export const saveToken = (token: string) => {
  localStorage.setItem("token", token);
};
export const getToken = () => localStorage.getItem("token");
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userName");
};

export const register = async (name: string, email: string, password: string) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.message || 'Registration failed');
  return data; // ожидаем { access_token, user }
};

export const login = async (name: string, password: string) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, password })
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.message || 'Login failed');
  return data; // { access_token }
};

interface TokenPayload {
  id: number;
  email: string;
  role: string;
}

export function getUserRole(): string | null {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const decoded = jwtDecode<TokenPayload>(token);
    return decoded.role;
  } catch {
    return null;
  }
}