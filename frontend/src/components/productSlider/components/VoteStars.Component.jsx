import React from 'react';
import {AiOutlineStar} from 'react-icons/ai'

function VoteStarsComponent() {
    return (
        <div className='star-content'>
            <div className="star">
                <AiOutlineStar/>
                <AiOutlineStar/>
                <AiOutlineStar/>
                <AiOutlineStar/>
                <AiOutlineStar/>
            </div>            
        </div>
    );
}

export default VoteStarsComponent;