import cake from "../../assets/images/cake.png";
import "./style.css";
import { useSelector } from "react-redux";

export const BirthdayNotiComponent = () => {
  const currentUser = useSelector((store: any) => store.currentUser);

  return (
    <div className="birthday-noti-container">
      <div className="d-flex align-items-center">
        <img src={cake} width={20} height={20} alt="" />
        <h5 className="m-0 mx-2">Sinh nhật</h5>
      </div>
      <p>
        Hôm nay là sinh nhật của <b>{currentUser.user.user.username}</b>
      </p>
    </div>
  );
};
