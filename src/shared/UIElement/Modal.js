import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

export default function Modal(props) {
  const { open, close, header } = props;
  if (!open) {
    return null;
  }

  let content = (
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

  // 모달이 열릴때 openModal 클래스가 생성된다.
  return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
}
