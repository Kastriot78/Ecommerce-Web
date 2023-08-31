import React from 'react'

const DangerAlert: React.FC<any> = ({ msg }) => {
    return (
        <div className="alert alert-danger" role="alert">
            {msg ? msg : 'Error'}
        </div>
    )
}

export default DangerAlert;
