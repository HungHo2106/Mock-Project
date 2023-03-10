import { InputComponent } from "../../components/Input";
import { useState, useEffect } from "react";
import { httpClient } from "../../api/httpClient";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import "./style.css";
import { Col, Row } from "react-bootstrap";

export const CreateEditPage = () => {
  const [titleArticle, setTitleArticle] = useState("");
  const [aboutArticle, setAboutArticle] = useState("");
  const [contentArticle, setContentArticle] = useState("");
  const [tagList, setTagList] = useState([]);
  const [tagChoice, setTagChoice] = useState([]);
  const [error, setError] = useState(false);
  const [errorTitleMessage, setTitleErrorMessage] = useState("");
  const [errorAboutMessage, setErrorAboutMessage] = useState("");
  const [errorContentMessage, setErrorContentMessage] = useState("");

  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      httpClient.get(`articles/${slug}`).then((response: any) => {
        setTitleArticle(response.data.article.title);
        setAboutArticle(response.data.article.description);
        setContentArticle(response.data.article.body);
      });
    }
  }, [slug]);

  useEffect(() => {
    httpClient.get("tags").then((response: any) => {
      setTagList(response.data.tags);
    });
  }, []);

  const update = () => {
    if (titleArticle && aboutArticle && contentArticle) {
      httpClient
        .put(`articles/${slug}`, {
          article: {
            title: titleArticle,
            description: aboutArticle,
            body: contentArticle,
          },
        })
        .then((response: any) => {
          navigate(`/article/${response.data.article.slug}`);
        })
        .catch((error: any) => console.log(error.data));
    }
  };

  const options = tagList.map((tag: any) => {
    let obj = {
      value: "",
      label: "",
    };
    obj["value"] = tag;
    obj["label"] = tag.charAt(0).toUpperCase() + tag.slice(1);
    return obj;
  });
  const tagArticle = tagChoice.map((op: any) => op.value);

  const publish = () => {
    if (titleArticle && aboutArticle && contentArticle) {
      httpClient
        .post("articles", {
          article: {
            title: titleArticle,
            description: aboutArticle,
            body: contentArticle,
            tagList: tagArticle,
          },
        })
        .then((response: any) => {
          navigate(`/article/${response.data.article.slug}`);
        });
    } else {
      setError(true);
      setErrorAboutMessage("Mi??u t??? kh??ng h???p l???");
      setTitleErrorMessage("Ch??? ????? kh??ng h???p l???");
      setErrorContentMessage("N???i dung kh??ng h???p l???");
    }
  };

  return (
    <>
      <div className="editor-container ">
        <Row>
          <Col xs={12}>
            {slug ? (
              <h2 className="text-center text-dark my-3">S???a n???i dung</h2>
            ) : (
              <h2 className="text-center text-dark my-3">T???o n???i dung m???i</h2>
            )}

            <form onSubmit={(e: any) => e.preventDefault()}>
              <label>Ch??? ????? b??i vi???t:</label>
              <InputComponent
                type="text"
                className="form-control my-1 p-2"
                values={titleArticle}
                onChange={(e: any) => setTitleArticle(e.target.value)}
              />
              {error && titleArticle.trim() === "" && (
                <p className="mb-2 text-danger">{errorTitleMessage}</p>
              )}

              <label>Mi??u t??? b??i vi???t:</label>

              <InputComponent
                type="text"
                className="form-control my-1"
                values={aboutArticle}
                onChange={(e: any) => setAboutArticle(e.target.value)}
              />
              {error && aboutArticle.trim() === "" && (
                <p className="mb-2 text-danger">{errorAboutMessage}</p>
              )}

              <label>N???i dung b??i vi???t:</label>

              <textarea
                className="form-control my-1"
                rows={8}
                value={contentArticle}
                onChange={(e: any) => setContentArticle(e.target.value)}
              ></textarea>
              {error && contentArticle.trim() === "" && (
                <p className="mb-2 text-danger">{errorContentMessage}</p>
              )}
              <label>Th??? b??i vi???t:</label>

              <Select
                options={options}
                isMulti
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={(choice: any) => setTagChoice(choice)}
              />
              <div className="d-flex justify-content-end">
                {slug ? (
                  <button
                    className="btn btn-success "
                    type="button"
                    onClick={update}
                  >
                    C???p nh???t b??i vi???t
                  </button>
                ) : (
                  <button
                    className="btn btn-success "
                    type="button"
                    onClick={publish}
                  >
                    ????ng t???i b??i vi???t
                  </button>
                )}
              </div>
            </form>
          </Col>
        </Row>
      </div>
    </>
  );
};
