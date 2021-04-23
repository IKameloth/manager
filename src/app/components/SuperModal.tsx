import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { unsetIsLoading, cleanErrorMessage } from "../store/common";
import { ModalStyled } from "../../assets/theme/modal";
import SvgWarningImage from "../../assets/images/SvgWarningImage";


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
    setVisible(false);
    dispatch(cleanErrorMessage());
    dispatch(unsetIsLoading());
  };

  return (
    <ModalStyled className={`modal ${visible ? "is-active" : ""}`}>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title"></p>
          <button onClick={handleModalClose} className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          <div className="fields">
            <div className="field">
              <SvgWarningImage />
            </div>
            <div className="field">
              { message }
            </div>
          </div>
        </section>
        <footer className="modal-card-foot"></footer>
      </div>
    </ModalStyled>
  );
};

export default SuperModal;