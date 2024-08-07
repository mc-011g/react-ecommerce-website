import { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../CartContext/UserContext";

const Register = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { emailPasswordSignup, updateUserCustomData } = useContext(UserContext);
    const [form, setForm] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: ""
    });
    const [passwordVisibilityToggle, setPasswordVisibilityToggle] = useState(false);
    const [passwordConfirmVisibilityToggle, setPasswordConfirmVisibilityToggle] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [errorMessage, setErrorMessage] = useState(0);

    const onFormInputChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    }

    const redirectNow = () => {
        const redirectTo = location.search.replace("?redirectTo=", "");
        navigate(redirectTo ? redirectTo : "/");
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await emailPasswordSignup(form.email, form.password, form.firstName, form.lastName, form.phoneNumber);
            await updateUserCustomData(form.firstName, form.lastName, form.phoneNumber);
            if (user) {
                redirectNow();
            }
        } catch (error) {
            if (error.message.includes("password must be between 6 and 128 characters")) {
                setErrorMessage(1);
            } else if (error.message.includes("name already in use")) {
                setErrorMessage(2);
            } else {
                alert(error);
            }
        }
    }

    const handlePasswordVisibilityToggle = () => {
        if (passwordVisibilityToggle === false) {
            setPasswordVisibilityToggle(true);
        } else {
            setPasswordVisibilityToggle(false);
        }
    }

    const handlePasswordConfirmVisibilityToggle = () => {
        if (passwordConfirmVisibilityToggle === false) {
            setPasswordConfirmVisibilityToggle(true);
        } else {
            setPasswordConfirmVisibilityToggle(false);
        }
    }

    const checkPasswordsMatching = () => {
        if ((password === passwordConfirm) && (password !== '' || passwordConfirm !== '')) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <div className="container-sm login-container">
            <div className="login-details gap-3">
                <h1>Create an account</h1>
                <form className="d-flex flex-column gap-3" onSubmit={(e) => onSubmit(e)}>
                    <div className="form-group d-flex flex-column gap-3">
                        <label>
                            First name
                            <input type="text" className="form-control" id="firstName" name="firstName" value={form.firstName} onChange={onFormInputChange} required />
                        </label>
                        <label>
                            Last name
                            <input type="text" className="form-control" id="lastName" name="lastName" value={form.lastName} onChange={onFormInputChange} required />
                        </label>
                        <label>
                            Phone number
                            <input type="text" className="form-control" id="phoneNumber" name="phoneNumber" value={form.phoneNumber} onChange={onFormInputChange} maxLength={10} required />
                        </label>
                        <label>
                            Email
                            <input type="text" className="form-control" id="email" name="email"
                                value={form.email}
                                onChange={onFormInputChange}
                                required />
                        </label>
                        <div>
                            <label htmlFor={password}>Password</label>
                            <div className="position-relative d-flex align-items-center">
                                <input type={`${passwordVisibilityToggle === false ? 'password' : 'text'}`} className="form-control mt-0 z-0" id={password} name="password"
                                    value={form.password}
                                    onChange={(e) => { onFormInputChange(e); setPassword(e.target.value); checkPasswordsMatching(); }}
                                    required />
                                <i class={`bi ${passwordVisibilityToggle === false ? 'bi-eye' : 'bi-eye-slash'} position-absolute z-1 passwordVisiblityToggle`} onClick={() => handlePasswordVisibilityToggle()}></i>
                            </div>
                        </div>
                        <div>
                            <label htmlFor={passwordConfirm}> Confirm Password</label>
                            <div className="position-relative d-flex align-items-center">
                                <input type={`${passwordConfirmVisibilityToggle === false ? 'password' : 'text'}`} className="form-control mt-0 z-0" id={passwordConfirm} name="confirmPassword"
                                    onChange={(e) => { setPasswordConfirm(e.target.value); checkPasswordsMatching() }}
                                    required />
                                <i class={`bi ${passwordConfirmVisibilityToggle === false ? 'bi-eye' : 'bi-eye-slash'} position-absolute z-1 passwordVisiblityToggle`} onClick={() => handlePasswordConfirmVisibilityToggle()}></i>
                            </div>
                            {((checkPasswordsMatching() === false) && (password !== '' || passwordConfirm !== '')) &&
                                <div className="text-danger">Passwords must match</div>
                            }
                            {errorMessage === 1 ?
                                <div className="text-danger">
                                    Password must be between 6 and 128 characters.
                                </div>
                                : errorMessage === 2 &&
                                <div className="text-danger">
                                    This email address is already in use.
                                </div>
                            }
                        </div>
                    </div>
                    <div className="login-btns justify-content-center">
                        <button
                            type="submit"
                            className="btn btn-dark"
                            disabled={!checkPasswordsMatching()}>Create account</button>
                        <Link to="/login">
                            <button type="button" className="btn btn-outline-dark">Login</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;