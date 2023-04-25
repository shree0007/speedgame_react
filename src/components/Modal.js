import React from 'react';
import './Modal.css';

const Modal = (props) => {
    return (
        <div className='overlay'>
            <div className='modal'>
                <h2>Game Over</h2>
                <p>Score:{props.score}</p>
                <button className='close' onClick={props.close}>X</button>
            </div>
        </div>
    );
};

export default Modal;