import { useState, useContext } from "react";
import { UserContext } from "../CartContext/UserContext";
import './Profile.css';

const Profile = () => {
    const { user, logOutUser, updateUserCustomData, sendResetPasswordLink } = useContext(UserContext);
    const [editMode, setEditMode] = useState(false);
    const [updatedDetails, setUpdatedDetails] = useState(
        {
            phone: user.customData.phoneNumber,
            firstName: user.customData.firstName,
            lastName: user.customData.lastName
        });

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSubmit = async () => {
        setEditMode(false);
        try {
            await updateUserCustomData(updatedDetails.firstName, updatedDetails.lastName, updatedDetails.phone);
            alert("Updated user details.");
        } catch (error) {
            alert(error);
        }
    };

    const handleInputChange = (e) => {
        setUpdatedDetails({
            ...updatedDetails,
            [e.target.name]: e.target.value
        });
    };

    const logOut = async () => {
        try {
            const loggedOut = await logOutUser();
            if (loggedOut) {
                window.location.reload(true);
            }
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-center">
                <div className="d-flex flex-column profile-details">
                    <h2 className="mb-3 text-center">Account Information</h2>
                    <hr />
                    <div className="d-flex flex-column my-3 gap-3">
                        {!editMode ? (
                            <>
                                <div className="text-truncate">
                                    <b>Email:</b>
                                    <span className="ms-2">{user.profile.email}</span>
                                </div>

                                <label>
                                    <b>Phone: </b>
                                    <input type="text" className="form-control"
                                        name="phone" id="phone"
                                        value={updatedDetails.phone}
                                        disabled />
                                </label>
                                <label>
                                    <b>First name:</b>
                                    <input type="text" className="form-control"
                                        name="firstName" id="firstName"
                                        value={updatedDetails.firstName}
                                        disabled />
                                </label>
                                <label>
                                    <b>Last name:</b>
                                    <input type="text" className="form-control"
                                        name="lastName" id="lastName"
                                        value={updatedDetails.lastName}
                                        disabled />
                                </label>
                                <div className="d-inline-flex flex-row justify-content-between align-items-end">
                                    <button type="button" className="btn btn-outline-dark"
                                        name="resetPassword" id="resetPassword" onClick={sendResetPasswordLink} >
                                        Reset Password
                                    </button>
                                </div>
                                <button type="button"
                                    className="btn btn-dark mt-3"
                                    name="editButton" id="editButton"
                                    onClick={handleEdit}>
                                    Edit
                                </button>
                            </>
                        ) : (
                            <form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
                                <div>
                                    <b>Email:</b>
                                    <span className="ms-2">{user.profile.email}</span>
                                </div>
                                <label>
                                    <b>Phone: </b>
                                    <input type="text" className="form-control"
                                        name="phone" id="phone"
                                        defaultValue={user.customData.phoneNumber}
                                        onChange={handleInputChange} maxLength={10} required />
                                </label>
                                <label>
                                    <b>First name:</b>
                                    <input type="text" className="form-control"
                                        name="firstName" id="firstName"
                                        defaultValue={user.customData.firstName}
                                        onChange={handleInputChange} required />
                                </label>
                                <label>
                                    <b>Last name:</b>
                                    <input type="text" className="form-control"
                                        name="lastName" id="lastName"
                                        defaultValue={user.customData.lastName}
                                        onChange={handleInputChange} required />
                                </label>
                                <div className="d-inline-flex flex-row justify-content-between align-items-end">
                                    <button type="button" className="btn btn-outline-dark"
                                        name="resetPassword" id="resetPassword" onClick={sendResetPasswordLink}>
                                        Reset Password
                                    </button>
                                </div>
                                <button type="submit" className="btn btn-dark mt-3"
                                    name="saveButton" id="saveButton"
                                >Save</button>
                            </form>
                        )}
                    </div>
                    <button type="button" className="btn btn-outline-dark" onClick={logOut}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;