import React from 'react';

export default function LoadingIndicator({ percent }: { percent: number }) {
    return (
        <div className="loading-indicator">
            <h4>Please wait, loading</h4>
            <div className="progress">
                <div
                    className="progress-bar progress-bar-striped progress-bar-animated"
                    role="progressbar"
                    aria-valuenow={percent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    style={{ width: percent + '%' }}>
                    {' '}
                </div>
            </div>
        </div>
    );
}
