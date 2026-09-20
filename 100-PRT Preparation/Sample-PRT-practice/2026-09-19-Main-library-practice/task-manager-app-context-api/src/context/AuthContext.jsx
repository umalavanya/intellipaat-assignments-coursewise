import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('tm_user');
    const savedTasks = localStorage.getItem('tm_tasks');
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedTasks) setTasks(JSON.parse(savedTasks));
  }, []);

  // Persist tasks
  useEffect(() => {
    localStorage.setItem('tm_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const register = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('tm_users') || '[]');

    if (users.find((u) => u.email === email)) {
      return { success: false, message: 'Email already registered' };
    }

    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('tm_users', JSON.stringify(users));

    setUser({ name, email });
    localStorage.setItem('tm_user', JSON.stringify({ name, email }));
    return { success: true };
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('tm_users') || '[]');
    const found = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!found) {
      return { success: false, message: 'Invalid email or password' };
    }

    const loggedUser = { name: found.name, email: found.email };
    setUser(loggedUser);
    localStorage.setItem('tm_user', JSON.stringify(loggedUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tm_user');
  };

  const addTask = (text) => {
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), text, done: false },
    ]);
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        tasks,
        register,
        login,
        logout,
        addTask,
        toggleTask,
        deleteTask,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}