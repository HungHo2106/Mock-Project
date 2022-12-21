import { InputComponent } from "../../components/Input";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { httpClient } from "../../api/httpClient";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../globalContext";
import "./style.css";

export const LoginPage = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("hohung987@test.com");
  const [password, setPassword] = useState("456456");
  const { setIsLoggedIn, setCurrentUser } = useContext(GlobalContext);
  const navigate = useNavigate();

  const login = () => {
    httpClient
      .post("users/login", {
        user: {
          email: email,
          password: password,
        },
      })
      .then((response: any) => {
        sessionStorage.setItem("userToken", response.data.user.token);
        setCurrentUser(response.data);
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((error: any) => {
        setError(true);
      });
  };

  return (
    <div className="d-flex align-items-center justify-content-center mt-5">
      <div className="login-box">
        <div className="row">
          <div className=" text-center">
            <h2 className="my-3">Sign in</h2>
            <Link to="/register" className="text-decoration-none text-success">
              Need an account?
            </Link>{" "}
            {error && (
              <ul className="error-messages">
                <p className="text-center text-danger">
                  Email or Password invalid. Try again!
                </p>
              </ul>
            )}
            <form onSubmit={(e) => e.preventDefault()}>
              <InputComponent
                className="form-control my-3"
                type="text"
                placeholder="Email"
                values={email}
                onChange={(e: any) => setEmail(e.target.value)}
              />
              <InputComponent
                className="form-control my-3"
                type="password"
                placeholder="Password"
                values={password}
                onChange={(e: any) => setPassword(e.target.value)}
              />
              <div className="d-flex justify-content-end">
                <button className="btn btn-success" onClick={login}>
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
