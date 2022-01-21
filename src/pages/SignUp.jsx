import { useState, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visabilityIcon from '../assets/svg/visibilityIcon.svg';
import OAuth from '../components/OAuth';



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

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const auth = getAuth();

            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            )

            const user = userCredential.user;

            updateProfile(auth.currentUser, {
                displayName: name
            });

            const formDataCopy = {...formData}
            delete formDataCopy.password
            formDataCopy.timestamp = serverTimestamp();
            await setDoc(doc(db, 'users', user.uid), formDataCopy);
            
            navigate('/');
        } catch (error) {
            toast.error('Something went wrong with registration.');
        }
    }

    return (
        <Fragment>
            <div className="pageContainer">
                <header>
                    <p className="pageHeader">Welcome Back!</p>
                </header>
                <form onSubmit={onSubmit}>
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
                        <button type="submit" className="signUpButton">
                            <ArrowRightIcon fill='#ffffff' width="34px" height="34px" />
                        </button>
                    </div>
                </form>

                <OAuth />

                <Link to='/sign-in' className="registerLink">
                    Sign In Instead
                </Link>

                <Link to='/sign-in' className="registerLink">
                    Sign In Instead
                </Link>
            </div>
        </Fragment>
    )
}

export default SignUp