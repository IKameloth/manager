import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { unsetIsLoading, cleanErrorMessage } from "../store/common";

type Props = {
  open: boolean,
  message: string,
};

const SuperModal = (props: Props) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const { open, message } = props;

  useEffect(() => {
    open && setVisible(true);
  }, [open]);

  const handleModalClose = () => {
    console.log("close modal")
    setVisible(false);
    dispatch(cleanErrorMessage());
    dispatch(unsetIsLoading());
  };

  return (
    <div className={`modal ${visible ? "is-active" : ""}`}>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Modal title</p>
          <button className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          { message }
        </section>
        <footer className="modal-card-foot">
          <button onClick={handleModalClose} className="modal-close is-large" aria-label="close">Cancel</button>
        </footer>
      </div>
    </div>
  );
};

export default SuperModal;