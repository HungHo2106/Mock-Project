import { InputComponent } from "../../components/Input";
import { Button } from "react-bootstrap";

export const SettingsPage = () => {
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
            />
            <InputComponent
              className="form-control  my-3"
              type="text"
              placeholder="Your Name"
            />
            <textarea
              className="form-control  my-3"
              rows={8}
              placeholder="Short bio about you"
            ></textarea>
            <InputComponent
              className="form-control  my-3"
              type="text"
              placeholder="Email"
            />
            <InputComponent
              className="form-control  my-3"
              type="password"
              placeholder="Password"
            />
            <div className="d-flex justify-content-end">
              <Button className="btn btn-success">Update Settings</Button>
            </div>
          </form>
        </div>
        <Button>Or Click here to Log out</Button>
      </div>
    </>
  );
};
