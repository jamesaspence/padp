import React from 'react';
import './ContentCard.scss';

const ContentCard = ({ children }) => (
  <div className="ContentCard__wrap">
    <div className="ContentCard">
      {children}
    </div>
  </div>
);

export default ContentCard;