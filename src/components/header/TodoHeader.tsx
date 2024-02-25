import React from 'react';
// css
import './TodoHeader.css';

const TodoHeader: React.FC = () => {
    return (
        <div className="header">
            <div className="header-menu-line">
                <p>Todo</p>
            </div>
        </div>
    );
};

export default TodoHeader;