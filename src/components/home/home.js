import React from 'react';
import './home.css';
import {AdsList} from "./adsList";

export const Home = () => {
    return (
        <div className={'homePage'}>
            <AdsList/>
        </div>
    );
};
