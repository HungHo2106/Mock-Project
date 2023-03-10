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

  const logout = () => {
    sessionStorage.removeItem("userToken");
    navigate("/login");
    setIsLoggedIn(false);
  };

  return (
    <Row className="m-0">
      <Col xs={12} lg={3} className="p-0">
        <div className="settings-nav">
          <h3>C??i ?????t</h3>
          <div className="setting-option">
            <AiFillSetting className="settings-icon" /> Chung
          </div>
          <div className="setting-option">
            <SiAdguard className="settings-icon" /> B???o m???t{" "}
          </div>
          <div className="setting-option">
            <BsFillLockFill className="settings-icon" /> Quy???n ri??ng t??
          </div>
          <div className="setting-option">
            <FaGlobeAsia className="settings-icon" /> Ng??n ng??? v?? khu v???c
          </div>
          <div className="setting-option">
            <ImLocation className="settings-icon" /> V??? tr??
          </div>
          <div className="setting-option">
            <ImUserMinus className="settings-icon" /> Ch???n
          </div>
          <div className="setting-option">
            <FaBookOpen className="settings-icon" /> Tin
          </div>
        </div>
      </Col>
      <Col sm={9} className="p-0">
        <h4 className="setting-title">C??i ?????t t??i kho???n chung</h4>
        <div className="settings-container">
          <form>
            <div className="d-flex my-3">
              <label className="label-settings">???nh ?????i di???n:</label>
              <input type="file" onChange={handlePreviewImage} multiple />
              {avatar && (
                <img src={avatar?.preview} alt="" className="avatar-preview" />
              )}
            </div>
            <div className="d-flex my-3">
              <label className="label-settings">T??n ng?????i d??ng:</label>
              <InputComponent
                className="form-control"
                type="text"
                placeholder="Your Name"
                values={username}
                onChange={(e: any) => setUsername(e.target.value)}
              />
            </div>
            <div className="d-flex my-3">
              <label className="label-settings ">Ti???u s???:</label>
              <textarea
                className="form-control"
                rows={8}
                placeholder="Short bio about you"
                value={bio === null ? undefined : bio}
                onChange={(e: any) => setBio(e.target.value)}
              ></textarea>
            </div>
            <div className="d-flex my-3">
              <label className="label-settings">?????a ch??? email:</label>
              <InputComponent
                className="form-control"
                type="text"
                placeholder="Email"
                values={email}
                onChange={(e: any) => setEmail(e.target.value)}
              />
            </div>
            <div className="d-flex my-3 ">
              <label className="label-settings">M???t kh???u:</label>
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
                C???p nh???t c??i ?????t
              </Button>
            </div>
          </form>
        </div>
        <div className="log-out-container">
          <Button className="btn btn-danger " onClick={logout}>
            ????ng xu???t t??i kho???n
          </Button>
        </div>
      </Col>
    </Row>
  );
};
