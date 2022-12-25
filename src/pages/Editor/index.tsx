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
  };

  return (
    <>
      <div className="editor-container ">
        <Row>
          <Col xs={12}>
            {slug ? (
              <h2 className="text-center text-dark my-3">Sửa nội dung</h2>
            ) : (
              <h2 className="text-center text-dark my-3">Tạo nội dung mới</h2>
            )}

            <form onSubmit={(e: any) => e.preventDefault()}>
              <label>Chủ đề bài viết:</label>
              <InputComponent
                type="text"
                className="form-control mb-3 p-2"
                values={titleArticle}
                onChange={(e: any) => setTitleArticle(e.target.value)}
              />
              <label>Miêu tả bài viết:</label>

              <InputComponent
                type="text"
                className="form-control mb-3"
                values={aboutArticle}
                onChange={(e: any) => setAboutArticle(e.target.value)}
              />
              <label>Nội dung bài viết:</label>

              <textarea
                className="form-control mb-3"
                rows={8}
                value={contentArticle}
                onChange={(e: any) => setContentArticle(e.target.value)}
              ></textarea>
              <label>Thẻ bài viết:</label>

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
                    Cập nhật bài viết
                  </button>
                ) : (
                  <button
                    className="btn btn-success "
                    type="button"
                    onClick={publish}
                  >
                    Đăng tải bài viết
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
