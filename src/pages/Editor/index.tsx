import { InputComponent } from "../../components/Input";
import { Button } from "react-bootstrap";
export const CreateEditPage = () => {
  return (
    <>
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              <form>
                <InputComponent
                  type="text"
                  className="form-control my-3 p-2"
                  placeholder="Article Title"
                />
                <InputComponent
                  type="text"
                  className="form-control my-3"
                  placeholder="What's this article about?"
                />
                <textarea
                  className="form-control my-3"
                  rows={8}
                  placeholder="Write your article (in markdown)"
                ></textarea>
                <InputComponent
                  type="text"
                  className="form-control my-3"
                  placeholder="Enter tags"
                />
                <div className="d-flex justify-content-end">
                  <Button className="btn btn-success " type="button">
                    Publish Article
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
