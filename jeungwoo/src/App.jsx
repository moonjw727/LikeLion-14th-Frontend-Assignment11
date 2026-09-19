import { useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/auth-context";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import MyPage from "./components/MyPage";

function AppContent() {
  const { currentUser } = useAuth();
  const [mode, setMode] = useState("login");

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xs">
        {currentUser ? (
          <MyPage />
        ) : mode === "login" ? (
          <LoginForm onSwitchToSignup={() => setMode("signup")} />
        ) : (
          <SignupForm onSwitchToLogin={() => setMode("login")} />
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
