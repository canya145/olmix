import React, {useEffect, useState} from 'react';
import {adsService} from '../../../services';
import './adsList.css'
import {AdItem} from "./adItem";

export const AdsList = () => {
    const [loading, setLoading] = useState(true);
    const [ads, setAds] = useState([]);

    const handleAdsData = async () => {
        const response = await adsService.getAllAds();
        //
        setAds(response);
        setLoading(false);
    };

    useEffect(() => {
        handleAdsData();
    }, []);

    return loading ? (
        <h3>Loading</h3>
    ) : (
        <div>
            <h3>Available Advertisements:</h3>
            <div className={'ads-row'}>
                {ads.map((value, index) => <AdItem key={index} items={value}/>)}
            </div>
        </div>
    );
};
