import { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../CartContext/UserContext.js";
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();

    //Get and set user details
    const { user, fetchUser, emailPasswordLogin } = useContext(UserContext);
    const [passwordVisibilityToggle, setPasswordVisibilityToggle] = useState(false);
    const [errorMessage, setErrorMessage] = useState(0);

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const onFormInputChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    }

    const redirectNow = () => {
        const redirectTo = location.search.replace("?redirectTo=", "");
        navigate(redirectTo ? redirectTo : "/");
    }

    const loadUser = async () => {
        if (!user) {
            const fetchedUser = await fetchUser();
            if (fetchedUser) {
                redirectNow();
            }
        }
    }

    useEffect(() => {
        loadUser();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            // Validate the user's credentials
            const user = await emailPasswordLogin(form.email, form.password);
            if (user) {
                redirectNow();
            }
        } catch (error) {
            if (error.statusCode === 401) {
                setErrorMessage(1);
            } else {
                alert(error);
            }
        }
    };

    const handlePasswordVisibilityToggle = () => {
        if (passwordVisibilityToggle === false) {
            setPasswordVisibilityToggle(true);
        } else {
            setPasswordVisibilityToggle(false);
        }
    }

    return (
        <div className="container-sm login-container">
            <div className="login-details gap-3">
                <h1>Login</h1>
                <form className="d-flex flex-column gap-3 mt-3" onSubmit={(e) => onSubmit(e)}>
                    <div className="form-group d-flex flex-column gap-3">
                        <label>
                            Email
                            <input type="text" className="form-control mt-0" id="email" name="email"
                                value={form.email}
                                onChange={onFormInputChange}
                                required />
                        </label>
                        <div>
                            <label htmlFor="password">Password</label>
                            <div className="position-relative d-flex align-items-center">
                                <input type={`${passwordVisibilityToggle === false ? 'password' : 'text'}`} className="form-control mt-0 z-0" id="password" name="password"
                                    value={form.password}
                                    onChange={onFormInputChange}
                                    required />
                                <i class={`bi ${passwordVisibilityToggle === false ? 'bi-eye' : 'bi-eye-slash'} position-absolute z-1 passwordVisiblityToggle`} onClick={() => handlePasswordVisibilityToggle()}></i>
                            </div>
                        </div>
                        {errorMessage === 1 &&
                            <div className="text-danger">
                                Username or password is incorrect.
                            </div>
                        }
                    </div>
                    <div className="login-btns justify-content-center">
                        <button type="submit" className="btn btn-dark">Login</button>
                        <Link to="/register">
                            <button type="button" className="btn btn-outline-dark">Create Account</button>
                        </Link>
                    </div>
                </form>
                <div className="d-flex justify-content-center">
                    <Link to="/">
                        Forgot password?
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;