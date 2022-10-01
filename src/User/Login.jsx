import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "../layouts/Dashboard";
import {
  loginAsync,
  selectUsers,
  usersLoadMessage,
  usersStatus,
} from "../redux/user/userSlice";
import "./style.css";
import { Navigate, Route } from "react-router";

import validationSchema from "./Validation";

function Login() {
  const userSlice = useSelector((state) => state.users);
  const logined = localStorage.getItem("user_data") && true;
  const userStatus = useSelector(usersStatus);
  const userSlc = useSelector(selectUsers);
  const loadmess = useSelector(usersLoadMessage);
  const disable = userSlc.isLoading ? true : false;

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit: (values, { resetForm }) => {
        console.log(values);
        resetForm();
      },
      validationSchema,
    });
  const dispatch = useDispatch();
  const submitUser = async (e) => {
    e.preventDefault();
    await dispatch(
      loginAsync({ email: values.email, password: values.password })
    );
  };
  console.log(values);
  return (
    <div>
      {logined && <Navigate to="/" replace={true} />}
      <div className="signup-form">
        <div className="signup-title">
          {!userStatus && (
            <div className="error">
              <h1>{loadmess}</h1>
            </div>
          )}
          <h1>Giriş yap</h1>
        </div>
        <div className="signup-inputs">
          <form onSubmit={submitUser}>
            <input
              placeholder={
                errors.email && touched.email ? errors.email : "Email"
              }
              name="email"
              value={values.email}
              onChange={handleChange}
              type="email"
              onBlur={handleBlur}
            />

            <input
              type="password"
              placeholder={
                errors.password && touched.password ? errors.password : "Şifre"
              }
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <div>
              <button id="signupbtn" type="submit">
                Giriş yap
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
