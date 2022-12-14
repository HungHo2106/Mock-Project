import { InputComponent } from "../../components/Input";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { GlobalContext } from "../../globalContext";
import { httpClient } from "../../api/httpClient";

export const SettingsPage = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn, currentUser } = useContext(GlobalContext);
  const [email, setEmail] = useState(currentUser.user.email);
  const [imageUrl, setImageUrl] = useState(currentUser.user.image);
  const [username, setUsername] = useState(currentUser.user.username);
  const [password, setPassword] = useState(currentUser.user.password);
  const [bio, setBio] = useState(currentUser.user.bio);

  const { setCurrentUser } = useContext(GlobalContext);

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
        sessionStorage.setItem("userToken", response.data.user.token);
        setCurrentUser(response.data);
        navigate(`/profile/${currentUser.user.username}`);
      });
  };

  const logout = () => {
    sessionStorage.removeItem("userToken");
    navigate("/");
    setIsLoggedIn(false);
  };

  return (
    <>
      <div className="row pb-5 mb-5 m-0">
        <div className="col-6 offset-md-3 col-xs-12">
          <h2 className="text-center my-2">Your Settings</h2>

          <form>
            <InputComponent
              className="form-control my-3"
              type="text"
              placeholder="URL of profile picture"
              values={imageUrl}
              onChange={(e: any) => setImageUrl(e.target.value)}
            />
            <InputComponent
              className="form-control  my-3"
              type="text"
              placeholder="Your Name"
              values={username}
              onChange={(e: any) => setUsername(e.target.value)}
            />
            <textarea
              className="form-control  my-3"
              rows={8}
              placeholder="Short bio about you"
              value={bio}
              onChange={(e: any) => setBio(e.target.value)}
            ></textarea>
            <InputComponent
              className="form-control  my-3"
              type="text"
              placeholder="Email"
              values={email}
              onChange={(e: any) => setEmail(e.target.value)}
            />
            <InputComponent
              className="form-control  my-3"
              type="password"
              placeholder="Password"
              values={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />
            <div className="d-flex justify-content-end">
              <Button className="btn btn-success" onClick={updateSettings}>
                Update Settings
              </Button>
            </div>
          </form>
          <Button variant="danger" onClick={logout}>
            Or Click here to Log out
          </Button>
        </div>
      </div>
    </>
  );
};
