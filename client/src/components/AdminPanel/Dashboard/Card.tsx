import React from 'react';

import './style.css';

type CardProps = {
    title: string;
    number: number;
}

const Card: React.FC<CardProps> = ({ title, number }) => {
  return (
    <div className="dashboard-card">
        <div className='text-center'>
            <span>{number}</span>
            <h6>{title}</h6>
        </div>
    </div>
  )
}

export default Card;