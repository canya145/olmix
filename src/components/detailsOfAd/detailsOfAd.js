import React, {useEffect, useState} from 'react';
import {adsService} from '../../services';
import './detailsOfAd.css'
import {useLocation} from 'react-router-dom';

export const DetailsOfAd = () => {
  const [loading, setLoading] = useState(true);
  const [ad, setAd] = useState([]);

  const query = new URLSearchParams(useLocation().search);
  const id = query.get('id');

  const handleGetAd = async () => {
    const response = await adsService.getAdById(id);
    setAd(response);
    setLoading(false);
  };

  useEffect(() => {
    handleGetAd();
  }, []);

  return (
    <div>
      {loading ? (
        <h3>Loading...</h3>
      ) : (
          <div className={'details'}>
            <div className={'details-page'}>
              <div className={'detailsImg'}>
                <img src={ad.imageUrl} alt={ad.title} />
              </div>
              <div className={'details-information'}>
                <div>
                  <h2>{ad.title}</h2>
                  <p>Description: {ad.description}.</p>
                  <p>Contact information: {ad.contactInformation}</p>
                </div>
              </div>
            </div>
          </div>
      )}
    </div>
  );
};
