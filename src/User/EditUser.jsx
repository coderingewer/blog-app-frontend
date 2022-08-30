import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import UpdateImage from "../image/UpdateImage";
import UpdateUserImg from "../image/UpdateUserImg";
import Dashboard from "../layouts/Dashboard";
import { editUserAsync, getUserAsync, selectUser } from "../redux/user/userSlice";
import './style.css'

import validationSchema from "./Validation";

function EditUser() {
    const usr = JSON.parse(localStorage.getItem("user_data"));
    const user = useSelector(selectUser);
    const userSlice = useSelector(state => state.users) 
    const dispacth = useDispatch();
    const {handleChange, handleBlur, values, errors, touched } =
        useFormik({
            initialValues: {
                email: user.email,
                username: user.username,
                name: user.name,
            },
            validationSchema,
        });

        useEffect(()=>{
            dispacth(getUserAsync(usr.ID))
        }, [dispacth])

    const submitUser = (e) => {
        e.preventDefault()
        dispacth(editUserAsync({
            id: usr.ID,
            email: values.email,
            username: values.username,
            name: values.name,
        }
        ))  
    }
    return (
        <div>
            <Dashboard />
            <div className="signup-form"  >
                <div className="signup-title" >
                    <h1 >Düzenle</h1>
                </div>
                <div>
                    <UpdateUserImg/>
                </div>
                <div className="signup-inputs" >
                    <form onSubmit={submitUser}>
                        <input
                            placeholder="Email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.email && touched.email && (
                            <div className="error">{errors.email}</div>
                        )}

                        <input
                            placeholder="Adı"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />

                        {errors.name && touched.name && (
                            <div className="error">{errors.name}</div>
                        )}


                        <input
                            placeholder="Kullanıcı Adı"
                            name="username"
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.username && touched.username && (
                            <div className="error">{errors.username}</div>
                        )}
                        <div>
                        <button id = "signupbtn" onSubmit={submitUser} type="submit">Kaydet</button>
                        </div>
                        {userSlice.isUpdated && <Navigate to="/adminpanel" replace = {true} />}
                    </form>
                <div className="change-password"  >
                    <a className="link change-password" href={"/updatepassword/"+user.ID} >Şifreyi değiştir</a>
                </div>
                </div>
            </div>
        </div>
    );
}

export default EditUser;

