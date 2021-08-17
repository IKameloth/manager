import React, { useState, useEffect, FunctionComponent } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from "react-redux";
import { unsetIsLoading, cleanErrorMessage } from "../store/common";
import { AnimatePresence } from 'framer-motion';
import SvgWarningImage from "@/assets/images/SvgWarningImage";

export interface ModalProps {
  isShown: boolean;
  typeModal: "ERROR" | "NOTIFICATION";
  modalContent: string;
};

const Modal: FunctionComponent<ModalProps> = ({
  isShown,
  typeModal,
  modalContent,
}) => {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();

  useEffect( () => {
    isShown && setVisible(true);
    isShown && setActive(true);
  }, [isShown]);

  const handleModalClose = () => {
    typeModal === "ERROR" && dispatch(cleanErrorMessage());
    setActive(false);
    setTimeout(() => {
      setVisible(false);
    }, 500)
    dispatch(unsetIsLoading());
  };

  const modalElement = document.getElementById("modal");
  if(!modalElement) return <></>;

  return (
    <>
      { visible && active && (
          ReactDOM.createPortal(
            <AnimatePresence>
              <div className="modal is-active">
                <div className="modal-card">
                  <header className="modal-card-head">
                    <button onClick={handleModalClose} className="delete" aria-label="close"></button>
                  </header>
                  <section className="modal-card-body">
                    <div className="field">
                      { typeModal === "ERROR" && <SvgWarningImage />}
                    </div>
                    <div className="field">
                      {modalContent}
                    </div>
                  </section>
                  <footer className="modal-card-foot"></footer>
                </div>
              </div>
            </AnimatePresence>,
            modalElement
          )
        )
      }
    </>
  );
};

export default Modal;