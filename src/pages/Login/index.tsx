import { InputComponent } from "../../components/Input";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { httpClient } from "../../api/httpClient";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../globalContext";
import "./style.css";
import { setCurrentUser } from "../../redux/store/slice/user";
import { useDispatch } from "react-redux/es/exports";
import { Row, Col } from "react-bootstrap";
import logoFB from "../../assets/images/dF5SId3UHWd.svg";

export const LoginPage = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoggedIn } = useContext(GlobalContext);
  const dispath = useDispatch();
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
        dispath(setCurrentUser(response.data));
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((error: any) => {
        setError(true);
      });
  };

  return (
    <Row className="m-0 px-4 mt-5">
      <Col sm={12} lg={6}>
        <div className="sign-in-left">
          <div className="d-flex justify-content-center">
            <img src={logoFB} alt="" />
          </div>
          <h4 className="sign-in-title">
            Facebook giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống
            của bạn.
          </h4>
        </div>
      </Col>
      <Col sm={12} lg={6}>
        <div className="d-flex align-items-center justify-content-center">
          <div className="login-box">
            <div className="row">
              <div className=" text-center">
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
                  <div className="d-flex justify-content-end  btn-login-container">
                    <button className="btn-login" onClick={login}>
                      Đăng nhập
                    </button>
                  </div>
                </form>
                <Link
                  to="/register"
                  className="text-decoration-none text-dark "
                >
                  <div className="d-flex justify-content-end mb-2">
                    <button className="btn-register">Tạo tài khoản mới</button>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};
