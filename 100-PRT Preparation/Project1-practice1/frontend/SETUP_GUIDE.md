# Frontend Project Setup Guide - Microtasks

Follow these detailed steps to recreate the complete frontend project from scratch.

---

## PART 1: PROJECT INITIALIZATION

### Task 1.1: Create Project Directory
- Create a folder named `frontend` in your project root
- Navigate into the `frontend` folder

### Task 1.2: Initialize npm Project
- Run: `npm init -y`
- This creates a basic `package.json` file

### Task 1.3: Install Dependencies
Run the following command to install all required packages:
```bash
npm install react@^19.2.8 react-dom@^19.2.8 react-router-dom@^7.18.3 axios@^1.20.0 @reduxjs/toolkit@^2.12.0 react-redux@^9.3.0 lucide-react@^1.37.0
```

### Task 1.4: Install Dev Dependencies
```bash
npm install --save-dev vite@^8.2.2 @vitejs/plugin-react@^6.1.0 @types/react@^19.2.18 @types/react-dom@^19.2.4 oxlint@^1.79.0
```

---

## PART 2: UPDATE package.json SCRIPTS

### Task 2.1: Replace Scripts Section
Update the `scripts` section in `package.json` to:
```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "lint": "oxlint",
  "preview": "vite preview"
}
```

---

## PART 3: CREATE PROJECT STRUCTURE

### Task 3.1: Create Folder Structure
Create the following directories:
```
frontend/
├── src/
│   ├── components/
│   ├── store/
│   └── assets/
├── public/
└── node_modules/
```

### Task 3.2: Create Configuration Files

#### Create `vite.config.js` in the root:
```javascript
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
```

#### Create `.oxlintrc.json` in the root:
```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "oxc"],
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

#### Create `.gitignore` in the root:
```
node_modules/
dist/
.env
.env.local
```

---

## PART 4: CREATE HTML ENTRY POINT

### Task 4.1: Create `index.html` in root folder
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>frontend</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

## PART 5: CREATE GLOBAL STYLES

### Task 5.1: Create `src/index.css`
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f5f5f5;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

a {
  color: #007bff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
```

### Task 5.2: Create `src/App.css`
```css
.auth-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 30px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.auth-container h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  font-size: 28px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.auth-container button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

.auth-container button:hover {
  background-color: #0056b3;
}

.auth-container p {
  text-align: center;
  margin-top: 20px;
  color: #666;
  font-size: 14px;
}

.auth-container a {
  color: #007bff;
  font-weight: 500;
}

.auth-container a:hover {
  text-decoration: underline;
}
```

---

## PART 6: CREATE REDUX STORE

### Task 6.1: Create `src/store/store.js`
```javascript
import { configureStore } from '@reduxjs/toolkit';

const appReducer = (state = {}, action) => {
  return state;
};

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
});
```

---

## PART 7: CREATE REACT ENTRY POINT

### Task 7.1: Create `src/main.jsx`
```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './index.css';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
```

**Key Points:**
- Wraps app with Redux Provider to make store available globally
- Imports CSS for global styling
- Uses React.StrictMode for development checks

---

## PART 8: CREATE APP COMPONENT

### Task 8.1: Create `src/App.jsx`
```javascript
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
```

**Key Points:**
- Router wraps all routes
- Default route redirects "/" to "/login"
- Login and Register routes are defined
- App.css is imported for styling

---

## PART 9: CREATE LOGIN COMPONENT

### Task 9.1: Create `src/components/Login.jsx`
```javascript
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', { email, password });
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>
        <button type="submit">Login</button>

        <p>Don't have an account? <Link to="/register">Sign Up</Link></p>

      </form>
    </div>
  );
}

export default Login;
```

**Key Points:**
- Uses useState hook for form state management
- Controlled inputs with onChange handlers
- Form submission handled by onSubmit
- Link component navigates to register page
- Email and password fields with validation

---

## PART 10: CREATE REGISTER COMPONENT

### Task 10.1: Create `src/components/Register.jsx`
```javascript
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('Register submitted:', { email, password, confirmPassword });
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm your password"
          />
        </div>
        <button type="submit">Register</button>

        <p>Already a user? <Link to="/login">Sign In</Link></p>
      </form>
    </div>
  );
};

export default Register;
```

**Key Points:**
- Three state variables for form fields
- Same styling as Login component using auth-container
- Includes confirm password field
- Link navigates back to login page
- Form validation is built-in with required attribute

---

## PART 11: VERIFY FILE STRUCTURE

Your final structure should look like:
```
frontend/
├── src/
│   ├── components/
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── store/
│   │   └── store.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   ├── main.jsx
│   └── assets/
├── public/
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── .oxlintrc.json
├── .gitignore
└── node_modules/
```

---

## PART 12: RUN THE PROJECT

### Task 12.1: Start Development Server
```bash
npm run dev
```

The app will start on `http://localhost:5173` (or the next available port)

### Task 12.2: Test the Application
1. Navigate to http://localhost:5173
2. You should see the Login page
3. Click "Sign Up" to navigate to Register page
4. Click "Sign In" to navigate back to Login page
5. Fill out the form and submit (currently just logs to console)

---

## PART 13: BUILD FOR PRODUCTION

### Task 13.1: Create Production Build
```bash
npm run build
```

This generates a `dist/` folder with optimized production files.

---

## IMPORTANT NOTES

### Dependencies Used:
- **React 19.2.8**: UI library
- **React Router DOM 7.18.3**: Client-side routing
- **Redux Toolkit 2.12.0**: State management
- **React Redux 9.3.0**: React bindings for Redux
- **Axios 1.20.0**: HTTP client
- **Vite 8.2.2**: Fast build tool and dev server
- **Lucide React 1.37.0**: Icon library

### Common Issues & Solutions:

**Issue 1: "Cannot find module 'react'"**
- Solution: Run `npm install` to install dependencies

**Issue 2: "Port 5173 is already in use"**
- Solution: Close other applications or Vite will use next available port

**Issue 3: Component not rendering**
- Solution: Ensure all imports are correct and files are in right directories

**Issue 4: Redux error "Store does not have a valid reducer"**
- Solution: Ensure store.js has at least one reducer defined (we created appReducer)

**Issue 5: "Link component" errors**
- Solution: Ensure Link is imported from 'react-router-dom' and used inside Router

### Next Steps (Future Development):
1. Add backend API integration with axios
2. Create Redux slices for state management
3. Add user authentication logic
4. Create additional pages (Dashboard, Profile, etc.)
5. Add form validation
6. Implement error handling
7. Add loading states
8. Connect to backend server

---

## SUMMARY

This guide covers:
✅ Complete project initialization
✅ All dependencies installation
✅ Configuration files setup
✅ Component structure with proper imports
✅ State management with Redux
✅ Routing with React Router
✅ Styling with CSS
✅ Running and testing the application

Follow all tasks in order to successfully recreate the frontend application.
