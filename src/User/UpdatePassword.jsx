import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router";
import UpdateImage from "../image/UpdateImage";
import UpdateUserImg from "../image/UpdateUserImg";
import Dashboard from "../layouts/Dashboard";
import { editUserAsync, editUserPassword, getUserAsync, selectUser } from "../redux/user/userSlice";
import './style.css'

import validationSchema from "./Validation";

function UpdatePassword() {
    const usr = JSON.parse(localStorage.getItem("user_data"));
    const user = useSelector(selectUser);
    const {userId} = useParams()
    const userSlice = useSelector(state => state.users)
    const dispacth = useDispatch();
    const { handleChange, handleBlur, values, errors, touched } =
        useFormik({
            initialValues: {
                password: "",
                newPassword: "",
                newPasswordConfirm: "",
            },
            validationSchema,
        });

    useEffect(() => {
        dispacth(getUserAsync(usr.ID))
    }, [dispacth])

    const submitUser = async (e) => {
        e.preventDefault()
        await dispacth(editUserPassword({
            id:userId,
            password: values.password,
            newPassword: values.newPassword,
        }
        ))
    }
    return (
        <div>
            <Dashboard />
            <div className="signup-form"  >
                <div className="signup-title" >
                    <h1 >Şifreyi Değiştir</h1>
                </div>
                <div>
                </div>
                <div className="signup-inputs" >
                    <form onSubmit={submitUser} >
                        <input
                            placeholder={errors.password && touched.password ? (
                                errors.password  + "(Şifre)"
                            ) : "Önceki Şifre"}
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <input
                            placeholder={errors.password && touched.password ? (
                                errors.password  + "(Yeni Şifre)"
                            ) : " Yeni Şifre"}
                            name="newPassword"
                            value={values.newPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <input
                            placeholder={errors.passwordConfirm && touched.passwordConfirm ? (
                                errors.password + "(Yeni Şifre Tekrarı)"
                            ) : "Yeni Şifre Tekrarı"}
                            name="newPasswordConfirm"
                            value={values.newPasswordConfirm}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <div>
                        <button id="signupbtn" type="submit">Kaydet</button>
                        </div>
                        {userSlice.isUpdated && <Navigate to="/adminpanel" replace={true} />}
                    </form>
                </div>
            </div>
        </div >
    );
}

export default UpdatePassword;

