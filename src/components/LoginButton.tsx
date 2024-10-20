import googleIcon from "../assets/google_icon.svg";
import './LoginButton.css';

type LoginButtonProp = {
    onClick: () => void;
}
const LoginButton = ({onClick}: LoginButtonProp) => {
    return (
        <button className="loginWithGoogle" onClick={onClick}>
            <img src={googleIcon} alt="Google Icon"  />
            <p>Login with Google</p>
        </button>
    )
}
export default LoginButton;