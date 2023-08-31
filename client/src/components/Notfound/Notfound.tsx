import React from 'react';
import { Link } from 'react-router-dom';

const Notfound = () => {
  return (
    <div>
        <div className="section notfound text-center">
            <div className="heading_s1">
                <h2 className='title'>404</h2>
            </div>
            <p>
                <b>oops! The page you requested was not found</b>
            </p>
            <p>The page you are looking was removed or might never existed.</p>

            <Link to="/" className='btn btn-fill-out'>Back Home</Link>
        </div>
    </div>
  )
}

export default Notfound;