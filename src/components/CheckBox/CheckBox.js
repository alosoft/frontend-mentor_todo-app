import React, { useState } from 'react';
import './CheckBox.css';
import IconCheck from '../../images/icon-check.svg';

const CheckBox = ({ checked, clicked }) => {
    const [state, setState] = useState(checked ?? false)

    return (
        <div onClick={() => {
            clicked(!state);
            setState(!state)
        }} className='body__add_todo__checkbox' style={{ background: state ? '' : 'unset', border: state ? 'none' : '1px solid var(--light-grayish-blue)' }}>
            {state ?
                <img src={IconCheck} alt='check icon' />
                : null}
        </div>
    )
}

export default CheckBox
