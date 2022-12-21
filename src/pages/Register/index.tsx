import { InputComponent } from "../../components/Input";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { httpClient } from "../../api/httpClient";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../globalContext";
import "./style.css";

export const RegisterPage = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { setIsLoggedIn, setCurrentUser } = useContext(GlobalContext);
  const navigate = useNavigate();

  const register = () => {
    httpClient
      .post("users", {
        user: {
          username: username,
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
    <div className="d-flex justify-content-center align-items-center">
      <div className="register-box">
        <div className="row">
          <div className="text-center">
            <h2 className="my-3">Sign up</h2>
            <Link to="/login" className="text-decoration-none text-success">
              Have an account?
            </Link>{" "}
            {error && (
              <ul className="error-messages">
                <li>That email is already taken</li>
              </ul>
            )}
            <form onSubmit={(e: any) => e.preventDefault()}>
              <InputComponent
                className="form-control my-3"
                type="text"
                placeholder="Username"
                values={username}
                onChange={(e: any) => setUsername(e.target.value)}
              />
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
                <button className="btn btn-success " onClick={register}>
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
