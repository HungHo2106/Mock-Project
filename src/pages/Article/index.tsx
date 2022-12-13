import "./style.css";

export const ArticlePage = () => {
  return (
    <>
      <div className="article-page pb-5 mb-5">
        <div className="banner d-flex flex-column">
          <h1>
            Sunt excepturi ut dolore fuga.\nAutem eum maiores aut nihil magnam
            corporis consectetur sit. Voluptate et quasi optio eos et eveniet
            culpa et nobis.\nSint aut sint sequi possimus reiciendis
          </h1>{" "}
          <div className="article-meta d-flex align-items-center my-3">
            <img
              className="article-avatar"
              src="https://api.realworld.io/images/demo-avatar.png"
            />
            <div className="mx-2">
              <a className="article-name-user m-0" href="">
                Eric Simons
              </a>
              <p className="article-date">October 9, 2022</p>
            </div>
            <button className="btn btn-sm btn-secondary action-btn">
              <i className="ion-plus-round"></i>
              <span>+</span> Follow Eric Simons
              <span className="counter">(10)</span>
            </button>
            &nbsp;&nbsp;
            <button className="btn btn-sm btn-outline-success action-btn">
              <i className="ion-heart"></i>
              &nbsp; Favorite Post <span className="counter">(29)</span>
            </button>
          </div>
        </div>
        <div className="container page">
          <div className="row ">
            <div className="col-md-12 article-body">
              <p>
                Ut in omnis sapiente laboriosam autem laborum.\nRepellendus et
                beatae qui qui numquam saepe.\nNon vitae molestias quos
                illum.\nSed fugiat qui ullam molestias ad ullam dolore.\nAutem
                ex minus distinctio dicta sapiente beatae veritatis at. Ut in
                omnis sapiente laboriosam autem laborum.\nRepellendus et beatae
                qui qui numquam saepe.\nNon vitae molestias quos illum.\nSed
                fugiat qui ullam molestias ad ullam dolore.\nAutem ex minus
                distinctio dicta sapiente beatae veritatis at. Voluptatum
                tempora voluptas est odio iure odio dolorem.\nVoluptatum est
                deleniti explicabo explicabo harum provident quis molestiae.
                Facere consequatur ullam.\nSint illum iste ab et saepe sit ut
                quis voluptatibus.\nQuo esse dolorum a quasi nihil.\nError quo
                eveniet.\nQuia aut rem quia in iste fugit ad. Ipsa cumque ad
                repellat qui libero quia impedit fugiat.\nExcepturi ut vitae
              </p>
              <div className="tags">
                <a>qui</a>
                <a>et</a>
                <a>doloribus</a>
                <a>doloribus</a>
                <a>doloribus</a>
                <a>doloribus</a>
              </div>
            </div>
          </div>

          <hr />

          <div className="article-actions">
            <div className="article-meta d-flex align-items-center justify-content-center my-3">
              <img
                className="article-avatar"
                src="https://api.realworld.io/images/demo-avatar.png"
              />
              <div className="mx-2">
                <a className="article-name-user m-0" href="">
                  Eric Simons
                </a>
                <p className="article-date">October 9, 2022</p>
              </div>
              <button className="btn btn-sm action-btn ng-binding btn-outline-secondary">
                <i className="ion-plus-round"></i>
                <span>+ Follow Eric Simons</span>
                <span className="counter">(10)</span>
              </button>
              &nbsp;&nbsp;
              <button className="btn btn-sm action-btn ng-binding btn-outline-secondary">
                <i className="ion-heart"></i>
                &nbsp; Favorite Post <span className="counter">(29)</span>
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2  my-3">
              <form className="card comment-form">
                <div className="card-block">
                  <textarea
                    className="form-control"
                    placeholder="Write a comment"
                    rows={3}
                  ></textarea>
                </div>
                <div className="d-flex justify-content-between align-items-center p-3">
                  <img
                    className="article-avatar"
                    src="https://api.realworld.io/images/demo-avatar.png"
                  />
                  <button className="btn btn-sm btn-primary">
                    Post Comment
                  </button>
                </div>
              </form>

              <div className="card my-3">
                <div className="card-block p-3">
                  <p className="text-secondary">
                    With supporting text below as a natural lead-in to
                    additional conte
                  </p>
                </div>
                <div className="d-flex  p-2 bg-light align-items-center">
                  <img
                    className="comment-avatar"
                    src="https://api.realworld.io/images/demo-avatar.png"
                  />
                  <div className="d-flex mx-2 flex-row">
                    <a
                      className="article-date text-decoration-none text-secondary"
                      href=""
                    >
                      Eric Simons
                    </a>
                    <p className="article-date text-secondary m-0 mx-1">
                      October 9, 2022
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
