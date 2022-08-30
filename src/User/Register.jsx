import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import Dashboard from "../layouts/Dashboard";
import { registerAsync, selectUsers } from "../redux/user/userSlice";
import './style.css'

import validationSchema from "./Validation";

function Signup() {
    const user = useSelector((state) => state.users);
    const updated = useSelector((state) => state.users.isRegistered);
    const dispacth = useDispatch();
    const userSlc = useSelector(selectUsers)
    const disable = userSlc.isLoading ? true : false
    const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
        useFormik({
            initialValues: {
                email: "",
                username: "",
                name: "",
                password: "",
                passwordConfirm: "",
            },
            onSubmit: async (values) => {
                await dispacth(registerAsync({
                    email: values.email,
                    username: values.username,
                    name: values.name,
                    password: values.password
                }
                ))
            },
            validationSchema,
        });
    return (
        <div>
            <div className="signup-form"  >
                <div className="signup-title" >
                    <h1 >Kayıt ol</h1>
                </div>
                <div className="signup-inputs" >
                    <form action="http://http://3.84.149.147/api/users/new"  onSubmit={handleSubmit}>
                        <input
                            placeholder={errors.email && touched.email ? (
                                errors.email
                            ):"Email"}
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <input
                             placeholder={errors.name && touched.name ? (
                                errors.name
                            ):"Ad"}
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <input
                            placeholder={errors.username && touched.username ? (
                                errors.username
                            ):"Kullanıcı adı"}
                            name="username"
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <input
                             placeholder={errors.password && touched.password ? (
                                errors.password
                            ):"Şifre"}
                            name="password"
                            type="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <input
                            placeholder={errors.passwordConfirm && touched.passwordConfirm ? (
                                errors.password
                            ):"Şifre Tekrarı"}
                            type="password"
                            name="passwordConfirm"
                            value={values.passwordConfirm}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <div>
                        <button disabled={ disable ? true:false}  id='signupbtn' type="submit">Kayıt Ol</button>
                        </div>
                    </form>
                    {updated && <Navigate to="/users" replace={false} />}
                </div>
            </div>
        </div>
    );
}

export default Signup;

