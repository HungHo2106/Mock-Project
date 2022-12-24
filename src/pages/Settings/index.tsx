import { InputComponent } from "../../components/Input";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../globalContext";
import { httpClient } from "../../api/httpClient";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../redux/store/slice/user";
import "./style.css";
import { BsFillLockFill } from "react-icons/bs";
import { SiAdguard } from "react-icons/si";
import { AiFillSetting } from "react-icons/ai";
import { FaBookOpen, FaGlobeAsia } from "react-icons/fa";
import { ImLocation, ImUserMinus } from "react-icons/im";

export const SettingsPage = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(GlobalContext);
  const currentUser = useSelector((store: any) => store.currentUser);
  const [email, setEmail] = useState(currentUser.user.user.email);
  const [imageUrl, setImageUrl] = useState(currentUser.user.user.image);
  const [username, setUsername] = useState(currentUser.user.user.username);
  const [password, setPassword] = useState(currentUser.user.user.password);
  const [bio, setBio] = useState(currentUser.user.user.bio);
  const [avatar, setAvatar] = useState<any>();
  const dispatch = useDispatch();

  console.log(imageUrl);
  const updateSettings = () => {
    httpClient
      .put("user", {
        user: {
          email: email,
          password: password,
          username: username,
          bio: bio,
          image: imageUrl,
        },
      })
      .then((response: any) => {
        dispatch(setCurrentUser(response.data));
        navigate(`/profile/${response.data.user.username}`);
      });
  };

  const handlePreviewImage = (e: any) => {
    const file = e.target.files[0];

    file.preview = URL.createObjectURL(file);

    setAvatar(file);
    setImageUrl(file.preview);
  };

  return (
    <Row className="m-0">
      <Col sm={3} className="p-0">
        <div className="settings-nav">
          <h3>Cài đặt</h3>
          <div className="setting-option">
            <AiFillSetting className="settings-icon" /> Chung
          </div>
          <div className="setting-option">
            <SiAdguard className="settings-icon" /> Bảo mật{" "}
          </div>
          <div className="setting-option">
            <BsFillLockFill className="settings-icon" /> Quyền riêng tư
          </div>
          <div className="setting-option">
            <FaGlobeAsia className="settings-icon" /> Ngôn ngữ và khu vực
          </div>
          <div className="setting-option">
            <ImLocation className="settings-icon" /> Vị trí
          </div>
          <div className="setting-option">
            <ImUserMinus className="settings-icon" /> Chặn
          </div>
          <div className="setting-option">
            <FaBookOpen className="settings-icon" /> Tin
          </div>
        </div>
      </Col>
      <Col sm={9} className="p-0">
        <h4 className="setting-title">Cài đặt tài khoản chung</h4>
        <div className="settings-container">
          <form>
            <div className="d-flex my-3">
              <label className="label-settings">Ảnh đại diện:</label>
              <input type="file" onChange={handlePreviewImage} multiple />
              {avatar && (
                <img src={avatar?.preview} alt="" className="avatar-preview" />
              )}
            </div>
            <div className="d-flex my-3">
              <label className="label-settings">Tên người dùng:</label>
              <InputComponent
                className="form-control"
                type="text"
                placeholder="Your Name"
                values={username}
                onChange={(e: any) => setUsername(e.target.value)}
              />
            </div>
            <div className="d-flex my-3">
              <label className="label-settings ">Tiểu sử:</label>
              <textarea
                className="form-control"
                rows={8}
                placeholder="Short bio about you"
                value={bio === null ? undefined : bio}
                onChange={(e: any) => setBio(e.target.value)}
              ></textarea>
            </div>
            <div className="d-flex my-3">
              <label className="label-settings">Địa chỉ email:</label>
              <InputComponent
                className="form-control"
                type="text"
                placeholder="Email"
                values={email}
                onChange={(e: any) => setEmail(e.target.value)}
              />
            </div>
            <div className="d-flex my-3 ">
              <label className="label-settings">Mật khẩu:</label>
              <InputComponent
                className="form-control"
                type="password"
                placeholder="Password"
                values={password}
                onChange={(e: any) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-flex justify-content-end">
              <Button className="btn btn-success" onClick={updateSettings}>
                Cập nhật cài đặt
              </Button>
            </div>
          </form>
        </div>
      </Col>
    </Row>
  );
};
