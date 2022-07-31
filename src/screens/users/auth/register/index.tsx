import React from "react";
import { useFormik } from "formik";
import { IRegistrationForm } from "../../../../types";
import { object, string } from "yup";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { registerUserAction } from "../../../../store/actions/user/auth";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Facebook from "../../../../components/guest/signup/Facebook";

const RegisterScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useAppSelector(
    (state) => state.registerUser
  );
  const { handleSubmit, touched, errors, values, setFieldValue } =
    useFormik<IRegistrationForm>({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: object().shape({
        firstName: string().required("Please provide a first name"),
        lastName: string().required("Please provide a last name"),
        email: string()
          .required("Please provide an email")
          .email("Please provide a valid email"),
        password: string()
          .required("Please provide a password")
          .min(6, "Password must be at least 6 characters long"),
        confirmPassword: string().test(
          "passwords-match",
          "Passwords must match",
          function (value) {
            return this.parent.password === value;
          }
        ),
      }),
      onSubmit: (form: IRegistrationForm) => {
        dispatch(registerUserAction(form));
      },
    });

  React.useEffect(() => {
    console.log(errors);
  });

  React.useEffect(() => {
    if (success) {
      navigate("/user/auth/register/success");
    }
  }, [success]);

  return (
    <div className={"container"}>
      <div className={"row justify-content-center"}>
        <div className={"col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4"}>
          <div className={"card w-100"}>
            <div className={"card-header"}>
              <h6>Register an Account</h6>
              {error && <h6 className={"invalid-feedback d-block"}>{error}</h6>}
            </div>
            <div className={"card-body"}>
              <form onSubmit={handleSubmit} className={"form"} noValidate>
                <div className={"row"}>
                  <div
                    className={"col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4"}
                  >
                    <div className={"form-group"}>
                      <label htmlFor={"firstName"} className={"form-label"}>
                        First Name
                      </label>
                      <input
                        disabled={loading}
                        type={"text"}
                        className={"form-control"}
                        name={"firstName"}
                        onChange={(e) =>
                          setFieldValue("firstName", e.target.value)
                        }
                        value={values.firstName}
                      />
                      {touched.firstName && (
                        <div className={"invalid-feedback d-block"}>
                          {errors.firstName}
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    className={"col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4"}
                  >
                    <div className={"form-group"}>
                      <label htmlFor={"lastName"} className={"form-label"}>
                        Last Name
                      </label>
                      <input
                        disabled={loading}
                        type={"text"}
                        className={"form-control"}
                        name={"lastName"}
                        value={values.lastName}
                        onChange={(e) =>
                          setFieldValue("lastName", e.target.value)
                        }
                      />
                      {touched.lastName && (
                        <div className={"invalid-feedback d-block"}>
                          {errors.lastName}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className={"form-group"}>
                  <label htmlFor={"email"} className={"form-label"}>
                    Email
                  </label>
                  <input
                    disabled={loading}
                    type={"email"}
                    className={"form-control"}
                    name={"email"}
                    value={values.email}
                    onChange={(e) => setFieldValue("email", e.target.value)}
                  />
                  {touched.email && (
                    <div className={"invalid-feedback d-block"}>
                      {errors.email}
                    </div>
                  )}
                </div>
                <div className={"form-group"}>
                  <label htmlFor={"password"} className={"form-label"}>
                    Password
                  </label>
                  <input
                    disabled={loading}
                    type={"password"}
                    className={"form-control"}
                    name={"password"}
                    value={values.password}
                    onChange={(e) => setFieldValue("password", e.target.value)}
                  />
                  {touched.password && (
                    <div className={"invalid-feedback d-block"}>
                      {errors.password}
                    </div>
                  )}
                </div>
                <div className={"form-group"}>
                  <label htmlFor={"confirmPassword"} className={"form-label"}>
                    Confirm Password
                  </label>
                  <input
                    disabled={loading}
                    type={"password"}
                    className={"form-control"}
                    name={"confirmPassword"}
                    value={values.confirmPassword}
                    onChange={(e) =>
                      setFieldValue("confirmPassword", e.target.value)
                    }
                  />
                  {touched.confirmPassword && (
                    <div className={"invalid-feedback d-block"}>
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>
                <div className={"form-group"}>
                  <button
                    disabled={loading}
                    className={"btn btn-block btn-primary"}
                    type={"submit"}
                  >
                    <i
                      className={"bi bi-person mx-1"}
                      style={{ fontSize: "13px" }}
                    ></i>
                    <span>REGISTER</span>
                  </button>
                </div>
              </form>
              <div className={"form-group"}>
                <Facebook />
              </div>
            </div>
            <div className={"card-footer"}>
              {"Already have an account? "}
              <Link to={"/user/auth/login"}>Login Here</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
