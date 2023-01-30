import { InputComponent } from "../../components/Input";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { httpClient } from "../../api/httpClient";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../globalContext";
import { Row, Col } from "react-bootstrap";
import logoFB from "../../assets/images/dF5SId3UHWd.svg";
import { setCurrentUser } from "../../redux/store/slice/user";
import "./style.css";
import { useDispatch } from "react-redux";

export const RegisterPage = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { setIsLoggedIn } = useContext(GlobalContext);
  const navigate = useNavigate();
  const dispath = useDispatch();

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
        dispath(setCurrentUser(response.data));
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((error: any) => {
        setError(true);
      });
  };
  return (
    <Row className="m-0 px-4 mt-2">
      <Col sm={6}>
        <div className="sign-in-left">
          <img src={logoFB} />
          <h4 className="sign-in-title">
            Facebook giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống
            của bạn.
          </h4>
        </div>
      </Col>
      <Col sm={6}>
        <div className="d-flex justify-content-center align-items-center">
          <div className="register-box">
            <div className="text-center">
              <h3>Đăng ký</h3>
              <p>Nhanh chóng và dễ dàng</p>
              {error && (
                <p className="text-danger">
                  Tên người dùng hoặc Email không hợp lệ
                </p>
              )}
              <form onSubmit={(e: any) => e.preventDefault()}>
                <InputComponent
                  className="form-control my-3 p-2"
                  type="text"
                  placeholder="Tên người dùng"
                  values={username}
                  onChange={(e: any) => setUsername(e.target.value)}
                />
                <InputComponent
                  className="form-control my-3 p-2"
                  type="text"
                  placeholder="Email"
                  values={email}
                  onChange={(e: any) => setEmail(e.target.value)}
                />
                <InputComponent
                  className="form-control my-3 p-2"
                  type="password"
                  placeholder="Mật khẩu"
                  values={password}
                  onChange={(e: any) => setPassword(e.target.value)}
                />
                <div className="d-flex justify-content-end btn-register-container">
                  <button className="btn-login" onClick={register}>
                    Đăng ký
                  </button>
                </div>
              </form>
            </div>
            <div className="policy-register">
              <p>
                Người dùng dịch vụ của chúng tôi có thể đã tải thông tin liên hệ
                của bạn lên Facebook.
              </p>
              <p>
                Bằng cách nhấp vào Đăng ký, bạn đồng ý với Điều khoản, Chính
                sách quyền riêng tư và Chính sách cookie của chúng tôi. Bạn có
                thể nhận được thông báo của chúng tôi qua SMS và hủy nhận bất kỳ
                lúc nào.
              </p>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};
