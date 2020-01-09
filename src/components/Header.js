import React from 'react';

const Header = props => {
    return (
        <>
            <h1 className='heading-1 Header__heading'>
                Vyber si svůj <span>tým roku!</span>
            </h1>
            <div className='Header__actions'>
                <button
                    className='btn btn--delete Header__btn'
                    onClick={props.onClearSquad}
                >
                    Smazat <span>mužstvo</span>
                </button>
                <button
                    className='btn btn--submit Header__btn'
                    onClick={props.onSubmitSquad}
                    disabled={!props.showSubmitButton}
                >
                    Odeslat <span>mužstvo</span>
                </button>
            </div>
        </>
    );
};

export default Header;
