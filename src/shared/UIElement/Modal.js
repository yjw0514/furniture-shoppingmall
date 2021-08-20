import React from 'react';
import reactDom from 'react-dom';
import './Modal.css';

const Modal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;
  if (!open) {
    return null;
  }
  const content = (
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
            {header}
            <button className='close' onClick={close}></button>
          </header>
          <main className={props.mainClass}>{props.children}</main>
          <footer className='modal__footer'>
            {props.footer}
            <button className='close' onClick={close}>
              close
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
  return reactDom.createPortal(content, document.getElementById('modal-hook'));
};

export default Modal;
