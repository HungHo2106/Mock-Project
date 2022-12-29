import { useNavigate } from "react-router-dom";
import under from "../../assets/images/under-construction.png";

export const UnderConstructor = () => {
  const navigate = useNavigate();
  return (
    <div className="d-flex justify-content-center align-items-center flex-column pt-5">
      <img src={under} alt="" width={600} height={400} />
      <button className="btn btn-success mt-4" onClick={() => navigate(-1)}>
        Quay lại
      </button>
    </div>
  );
};
