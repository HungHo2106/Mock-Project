import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { BsBookmark, BsFillBookmarkCheckFill } from "react-icons/bs";
import "./style.css";

export const ModalSaveComponent = () => {
  const [smShow, setSmShow] = useState(false);
  const [isSave, setIsSave] = useState(false);

  return (
    <>
      <Button
        className="btn-success"
        onClick={() => {
          setSmShow(true);
          setIsSave(!isSave);
        }}
      >
        {isSave ? (
          <BsFillBookmarkCheckFill className="bookmark-icon" />
        ) : (
          <BsBookmark className="bookmark-icon" />
        )}
      </Button>
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">Thông báo</Modal.Title>
        </Modal.Header>
        {isSave ? (
          <Modal.Body>
            Đã lưu bài viết vào <b>Bộ sưu tập</b>
          </Modal.Body>
        ) : (
          <Modal.Body>
            Đã xóa bài viết khỏi <b>Bộ sưu tập</b>
          </Modal.Body>
        )}
      </Modal>
    </>
  );
};
