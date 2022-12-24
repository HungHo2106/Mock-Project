import { BsApple } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import "./style.css";

export const TutorialComponent = () => {
  return (
    <div className="tutorial">
      <h3>Mới dùng Facebook?</h3>
      <p>Đăng ký ngay để nhận dòng thời gian cá nhân hóa của riêng bạn!</p>
      <Link to="/register" className="text-decoration-none">
        <div className="tutorial-btn">
          <FcGoogle className="mx-1" />
          Đăng ký bằng Google
        </div>
        <div className="tutorial-btn">
          <BsApple className="mx-1" />
          Đăng ký bằng Apple
        </div>
      </Link>
      <Link to="/login" className="text-decoration-none">
        <div className="tutorial-btn">Đăng nhập</div>
      </Link>
      <p>
        Khi đăng ký, bạn đã đồng ý với Điều khoản Dịch vụ và Chính sách Quyền
        riêng tư, gồm cả Sử dụng Cookie.
      </p>
    </div>
  );
};
