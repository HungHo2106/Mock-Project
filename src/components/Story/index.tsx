import { useSelector } from "react-redux";
import { useContext } from "react";
import "./style.css";
import str1 from "../../assets/images/str1.jpg";
import str3 from "../../assets/images/str3.jpg";
import str4 from "../../assets/images/str4.jpg";
import str5 from "../../assets/images/str5.jpg";
import avt4 from "../../assets/images/avt4.jpg";
import avt2 from "../../assets/images/avt2.jpg";
import avt3 from "../../assets/images/avt3.jpg";
import avt1 from "../../assets/images/avt1.jpg";
import { GlobalContext } from "../../globalContext";
import userAvatar from "../../assets/images/user-avatar.png";
import { useNavigate } from "react-router-dom";

export const StoryComponent = () => {
  const currentUser = useSelector((store: any) => store.currentUser);
  const navigate = useNavigate();

  const { isLoggedIn } = useContext(GlobalContext);
  const handleClick = () => {
    !isLoggedIn && navigate("/login");
  };
  return (
    <div className="story p-0" onClick={handleClick}>
      <div className="cover">
        <div className="create">
          <div className="svg">
            <img
              src={isLoggedIn ? currentUser.user.user.image : userAvatar}
              alt=""
            />
          </div>
          <h3 className="text-center">Tạo tin</h3>
        </div>
        <div
          className="bg-create"
          style={{
            backgroundImage: isLoggedIn
              ? `url(${currentUser.user.user.image})`
              : "#ccc",
          }}
        ></div>
      </div>

      <div className="cover">
        <div className="pro"></div>
        <h3>Anh Đức</h3>
        <div
          className="bg"
          style={{
            backgroundImage: `url(${str1})`,
          }}
        ></div>
        <div
          className="rounded"
          style={{ backgroundImage: `url(${avt1})` }}
        ></div>
      </div>

      <div className="cover">
        <div className="pro"></div>
        <h3>Duy Anh</h3>
        <div
          className="bg"
          style={{
            backgroundImage: `url(${str5})`,
          }}
        ></div>
        <div
          className="rounded"
          style={{ backgroundImage: `url(${avt2})` }}
        ></div>
      </div>
      <div className="cover">
        <div className="pro"></div>
        <h3>Trung Kiên</h3>
        <div
          className="bg"
          style={{
            backgroundImage: `url(${str3})`,
          }}
        ></div>
        <div
          className="rounded"
          style={{ backgroundImage: `url(${avt3})` }}
        ></div>
      </div>

      <div className="cover">
        <div className="pro"></div>
        <h3>Chí Thịnh</h3>
        <div
          className="bg"
          style={{
            backgroundImage: `url(${str4})`,
          }}
        ></div>
        <div
          className="rounded"
          style={{ backgroundImage: `url(${avt4})` }}
        ></div>
      </div>
    </div>
  );
};
