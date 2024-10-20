import './App.css'
import LoginButton from './components/LoginButton'
import { getAuth, signInWithPopup, GoogleAuthProvider, User, setPersistence, browserLocalPersistence } from "firebase/auth";
import './config/firebaseConfig'
import { useState } from 'react';
import Dashboard from './pages/DashBoard';
import { useAuth } from './components/AuthProvider';
function App() {

  const [user, setUser] = useState<User | null>(null);
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const {currentUser} = useAuth();

  const handleLogin = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      localStorage.setItem("accessToken", token?.toString() || "");
      localStorage.setItem("user", result.user?.toString() || "");

      setUser(result.user);
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);

      console.error("Error! Can't login: ", errorCode, errorMessage, email, credential);
      alert(errorMessage);
    })
  }

  setPersistence(auth, browserLocalPersistence).catch((error) => {
    console.log("Error ", error)
  })
  return (
    <>
    {currentUser ? (
      <Dashboard />
    ):(

      <div className='loginPage'>
      <LoginButton onClick={handleLogin}/>
      </div>
      )}
      </>
  )
}

export default App
