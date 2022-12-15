import { InputComponent } from "../../components/Input";
import { useState, useContext, useEffect } from "react";
import { httpClient } from "../../api/httpClient";
import { GlobalContext } from "../../globalContext";
import { useNavigate, useParams } from "react-router-dom";

export const CreateEditPage = () => {
  const [titleArticle, setTitleArticle] = useState("");
  const [aboutArticle, setAboutArticle] = useState("");
  const [contentArticle, setContentArticle] = useState("");
  const [tagArticle, setTagArticle] = useState("");
  const { articles, setArticles } = useContext(GlobalContext);
  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      httpClient.get(`articles/${slug}`).then((response: any) => {
        console.log(response.data);
        setTitleArticle(response.data.article.title);
        setAboutArticle(response.data.article.description);
        setContentArticle(response.data.article.body);
        setTagArticle(response.data.article.tagList.map((tag: any) => tag));
      });
    }
  }, [slug]);

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
        setArticles(response.data.article, articles);
        console.log(response.data);
        navigate(`/article/${response.data.article.slug}`);
      })
      .catch((error: any) => console.log(error.data));
  };

  const publish = () => {
    httpClient
      .post("articles", {
        article: {
          title: titleArticle,
          description: aboutArticle,
          body: contentArticle,
          tagList: [tagArticle],
        },
      })
      .then((response: any) => {
        setArticles(response.data.article, articles);
        console.log(response.data);
        navigate(`/article/${response.data.article.slug}`);
      });
  };

  return (
    <>
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              <form onSubmit={(e: any) => e.preventDefault()}>
                <InputComponent
                  type="text"
                  className="form-control my-3 p-2"
                  placeholder="Article Title"
                  values={titleArticle}
                  onChange={(e: any) => setTitleArticle(e.target.value)}
                />
                <InputComponent
                  type="text"
                  className="form-control my-3"
                  placeholder="What's this article about?"
                  values={aboutArticle}
                  onChange={(e: any) => setAboutArticle(e.target.value)}
                />
                <textarea
                  className="form-control my-3"
                  rows={8}
                  placeholder="Write your article (in markdown)"
                  value={contentArticle}
                  onChange={(e: any) => setContentArticle(e.target.value)}
                ></textarea>
                <InputComponent
                  type="text"
                  className="form-control my-3"
                  placeholder="Enter tags"
                  values={tagArticle}
                  onChange={(e: any) => setTagArticle(e.target.value)}
                />
                <div className="d-flex justify-content-end">
                  {slug ? (
                    <button
                      className="btn btn-success "
                      type="button"
                      onClick={update}
                    >
                      Update Article
                    </button>
                  ) : (
                    <button
                      className="btn btn-success "
                      type="button"
                      onClick={publish}
                    >
                      Publish Article
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
