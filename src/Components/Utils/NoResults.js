import React from 'react';

import './NoResults.css'

const NoResults = () => {
    return (
        <div className='empty-state'>
            <h1>No results found for your query. Sorry. :(</h1>
        </div>
    );
};

export default NoResults;