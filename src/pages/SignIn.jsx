import { useState, Fragment } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visabilityIcon from '../assets/svg/visibilityIcon.svg';


function SignIn() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const { email, password } = formData;

    const navigate = useNavigate();

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const auth = getAuth();

            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            if(userCredential.user) {
                navigate('/');
            }
        } catch (error) {
            toast.error('Bad User Credentials');
        }

    }

    return (
        <Fragment>
            <div className="pageContainer">
                <header>
                    <p className="pageHeader">Welcome Back!</p>
                </header>
                <form onSubmit={onSubmit}>
                    <input className="emailInput" type="email" placeholder="Email" id="email" value={email} onChange={onChange} />

                    <div className="passwordInputDiv">
                        <input type={showPassword ? 'text' : 'password'} className="passwordInput" placeholder="Password" id="password" onChange={onChange} />
                        <img className="showPassword" src={visabilityIcon} onClick={() => setShowPassword((prevState) => !prevState)} alt="Show password" />
                    </div>
                    <Link to='/forgot-password' className="forgotPasswordLink">
                        Forgot Password?
                    </Link>
                    <div className="signInBar">
                        <p className="signInText">
                            Sign In
                        </p>
                        <button className="signInButton">
                            <ArrowRightIcon fill='#ffffff' width="34px" height="34px" />
                        </button>
                    </div>
                </form>

                {/* Google Oauth */}

                <Link to='/sign-up' className="registerLink">
                    Sign Up Instead
                </Link>
            </div>
        </Fragment>
    )
}

export default SignIn