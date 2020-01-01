import React from 'react';

function Header(props) {
    return (
        <>
            <h1 className='heading-1 Header__heading'>
                Vyber si svůj <span>tým roku!</span>
            </h1>
            <div className='Header__actions'>
                <button
                    className='btn Header__btn Header__btn--delete'
                    onClick={props.onClearSquad}
                >
                    Smazat mužstvo
                </button>
                <button className='btn Header__btn Header__btn--send'>
                    Odeslat mužstvo
                </button>
            </div>
        </>
    );
}

export default Header;