import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./style.css";

export const ModalFriendDeleteRequest = () => {
  const [smShow, setSmShow] = useState(false);
  const [isAccept, setIsAccept] = useState(false);

  return (
    <>
      <Button
        className="btn-danger"
        onClick={() => {
          setSmShow(true);
          setIsAccept(!isAccept);
        }}
      >
        {isAccept ? <span>Hoàn tác</span> : <span>Xóa</span>}
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
        {isAccept ? (
          <Modal.Body>Đã xóa thành công</Modal.Body>
        ) : (
          <Modal.Body>Hoàn tác thành công</Modal.Body>
        )}
      </Modal>
    </>
  );
};
