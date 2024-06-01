import React from 'react';
import './Main.css';

import ArtWork from '../../components/ArtWork/ArtWork';
import SNS from '../../components/SNS/SNS';

export default function Main() {
    return (
        <div className='Main'>
            <ArtWork />
            <SNS />
        </div>
    );
}
