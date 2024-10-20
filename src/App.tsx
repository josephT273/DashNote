import './App.css'
import LoginButton from './components/LoginButton'
import { getAuth, signInWithPopup, GoogleAuthProvider, User } from "firebase/auth";
import './config/firebaseConfig'
import { useState } from 'react';
import Dashboard from './pages/DashBoard';
function App() {

  const [user, setUser] = useState<User | null>(null);
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const handleLogin = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
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
  return (
    // <div className='loginPage'>
    //     <LoginButton onClick={() => {}}/>
    // </div>
    <Dashboard />
  )
}

export default App
