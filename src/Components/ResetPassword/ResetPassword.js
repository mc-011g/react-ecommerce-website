import React, { useContext, useState } from "react";
import { UserContext } from "../CartContext/UserContext";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const { resetPassword } = useContext(UserContext);

    const changePassword = async () => {
        try {
            await resetPassword(newPassword, document.location);
            alert("Password reset.");
        } catch (error) {
            alert(error);
        }
    }

    return (
        <div className="container">
            <div className="d-flex flex-column">
                <label>
                    Enter a new password:
                    <input type="text" name="newPassword" className="form-control"
                        onChange={(e) => setNewPassword(e.target.value)} minLength={6} maxLength={128} required />
                </label>
                <button type="button" className="btn btn-dark mt-3" onClick={changePassword}>
                    Save Password
                </button>
            </div>
        </div>
    );
}

export default ResetPassword;