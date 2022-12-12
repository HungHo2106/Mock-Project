import { InputComponent } from "../../components/Input";
import { useState } from "react";
import { Link } from "react-router-dom";

export const RegisterPage = () => {
  const [error, setError] = useState("");

  return (
    <>
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-12 text-center">
              <h2 className="my-3">Sign up</h2>
              <Link to="/login" className="text-decoration-none text-success">
                Have an account?
              </Link>{" "}
              {error && (
                <ul className="error-messages">
                  <li>That email is already taken</li>
                </ul>
              )}
              <form>
                <InputComponent
                  className="form-control my-3"
                  type="text"
                  placeholder="Username"
                />
                <InputComponent
                  className="form-control my-3"
                  type="text"
                  placeholder="Email"
                />
                <InputComponent
                  className="form-control my-3"
                  type="password"
                  placeholder="Password"
                />
                <div className="d-flex justify-content-end">
                  <button className="btn btn-success ">Sign up</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
