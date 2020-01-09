import React from 'react';

function Modal(props) {
    return (
        <div className='Modal'>
            <div className='Modal__content'>
                <h2 className='Modal__heading'>Odesláno.</h2>
                <p className='Modal__paragraph'>Skvělý tým, díky!</p>
                <button className='btn btn--done Modal__button' onClick={props.onSubmitDone}>Hotovo</button>
                </div>
        </div>
    );
}

export default Modal;
