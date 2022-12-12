import { InputComponent } from "../../components/Input";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { httpClient } from "../../api/httpClient";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../globalContext";

export const LoginPage = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("hohung789@test.com");
  const [password, setPassword] = useState("123123");
  const { setIsLoggedIn } = useContext(GlobalContext);
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
        console.log(response.data);
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((error: any) => {
        setError(true);
      });
  };

  return (
    <>
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-12 text-center">
              <h2 className="my-3">Sign in</h2>
              <Link
                to="/register"
                className="text-decoration-none text-success"
              >
                Need an account?
              </Link>{" "}
              {error && (
                <ul className="error-messages">
                  <p className="text-center text-danger">
                    That email is not exist
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
    </>
  );
};
