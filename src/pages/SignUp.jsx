import { useState, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visabilityIcon from '../assets/svg/visibilityIcon.svg';


function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const { name, email, password } = formData;

    const navigate = useNavigate();

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    return (
        <Fragment>
            <div className="pageContainer">
                <header>
                    <p className="pageHeader">Welcome Back!</p>
                </header>
                <form>
                    <input className="nameInput" type="text" placeholder="Name" id="name" value={name} onChange={onChange} />
                    <input className="emailInput" type="email" placeholder="Email" id="email" value={email} onChange={onChange} />

                    <div className="passwordInputDiv">
                        <input type={showPassword ? 'text' : 'password'} className="passwordInput" placeholder="Password" id="password" onChange={onChange} />
                        <img className="showPassword" src={visabilityIcon} onClick={() => setShowPassword((prevState) => !prevState)} alt="Show password" />
                    </div>
                    <Link to='/forgot-password' className="forgotPasswordLink">
                        Forgot Password?
                    </Link>
                    <div className="signUpBar">
                        <p className="signUpText">
                            Sign Up
                        </p>
                        <button className="signUpButton">
                            <ArrowRightIcon fill='#ffffff' width="34px" height="34px" />
                        </button>
                    </div>
                </form>

                {/* Google Oauth */}

                <Link to='/sign-in' className="registerLink">
                    Sign In Instead
                </Link>
            </div>
        </Fragment>
    )
}

export default SignUp