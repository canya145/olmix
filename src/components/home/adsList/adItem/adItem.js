import React from 'react';
import './adItem.css';
import {useHistory} from 'react-router-dom';

export const AdItem = ({items}) => {
  const history = useHistory();
  const handleAdDetails = () => {
      history.push(`/ads/${items.id}?id=${items.id}`);
  };

  return (
    <div className={'card-ad'} onClick={handleAdDetails}>
      <div className={'ad-photo'}>
          <img src={items.imageUrl} alt={items.title} />
      </div>
      <div className={'ad-title'}>
        <h4>{items.title}</h4>
      </div>
    </div>
  );
};
