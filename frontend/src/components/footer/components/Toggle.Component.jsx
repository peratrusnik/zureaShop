import React, {useState} from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

function ToggleComponent({id}) {
    const [toggle, setToggle] = useState(true)
    
    const handleToggle = () => {
        setToggle((state) => !state)
    }
    return (
        <a
            className="title"
            data-bs-toggle="collapse"
            href={id}
            role="button"
            aria-expanded="false"
            onClick={handleToggle}
            >
                {toggle ? <FaChevronDown /> : <FaChevronUp />}
        </a>
    );
}

export default ToggleComponent;