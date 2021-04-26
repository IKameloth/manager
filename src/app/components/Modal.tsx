import React, { useState, useEffect, FunctionComponent } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from "react-redux";
import { unsetIsLoading, cleanErrorMessage } from "../store/common";
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import SvgWarningImage from "../../assets/images/SvgWarningImage";

export interface ModalProps {
  isShown: boolean;
  typeModal: "ERROR" | "NOTIFICATION";
  modalContent: string;
};

const listVariants = {
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.3
    }
  },
  hidden: {
    opacity: 0,
    x: "2vw",
    transition: {
      when: "afterChildren",
      delay: 5
    }
  }
};

export const ModalStyled = styled(motion.div).attrs(() => ({
  initial: "hidden",
  variants: listVariants
}))`
  .modal-card {
    box-shadow: 0 25px 20px #777;
  }

  .modal-card-body {
    text-align: center;
    font-size: 1.5rem;
  }

  .modal-card-head {
    background-color: #fff;
    text-align: center;
    border-bottom: none;
    justify-content: flex-end;
  }

  .modal-card-foot {
    border-top: none;
  }

  footer {
    background-color: #fff;
    justify-content: center;
    align-items: center;
  }

  header {
    background-color: #fff;
  }
`;

const Modal: FunctionComponent<ModalProps> = ({
  isShown,
  typeModal,
  modalContent,
}) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect( () => {
    isShown && setVisible(true);
  }, [isShown]);

  const handleModalClose = () => {
    setVisible(false);
    typeModal === "ERROR" && dispatch(cleanErrorMessage());
    dispatch(unsetIsLoading());
  };

  const modalElement = document.getElementById("modal");
  if(!modalElement) return <></>;

  return (
    <>
      { visible && (
          ReactDOM.createPortal(
            <AnimatePresence>
              <ModalStyled animate={visible ? "visible" : "hidden"} className="modal is-active">
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
              </ModalStyled>
            </AnimatePresence>,
            modalElement
          )
        )
      }
    </>
  );
};

export default Modal;