// ErrorPage.js
import React from 'react';

const ErrorPage = () => {
    return (
        <div className="error-container" style={{textAlign: 'center', color: '#333'}}>
            <h1 style={{fontSize: '3em', marginBottom: '10px'}}>Error 404</h1>
            <p style={{fontSize: '1.2em'}}>Page not found</p>
        </div>
    );
};

export default ErrorPage;