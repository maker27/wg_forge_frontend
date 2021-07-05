import React, { useState } from 'react';

function ErrorMessage({ text }: { text: string }) {
    const [hidden, setHidden] = useState<boolean>(false);
    return (
        <div className="alert alert-dismissible alert-danger" style={{ display: hidden ? 'none' : 'block' }}>
            <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                onClick={() => setHidden(true)}>
                {' '}
            </button>
            <h4 className="alert-heading">Error!</h4>
            <p className="mb-0">{text}</p>
        </div>
    );
}

export default function ErrorsList({ errors }: { errors: string[] }) {
    return (
        <div className="errors-list">
            {errors.map((error, i) => (
                <ErrorMessage key={i} text={error} />
            ))}
        </div>
    );
}
