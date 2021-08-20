import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

export default function Modal(props) {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;
  if (!open) {
    return null;
  }
  let content = (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>{props.children}</main>
          <footer>
            {props.footer}
            <button className="close" onClick={close}>
              close
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );

  // 모달이 열릴때 openModal 클래스가 생성된다.
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
}
