import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

type Props = {
    open: Boolean,
    setSearchopen: Function
}

const Search = ({ open, setSearchopen }: Props) => {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const closeModal = () => {
        setSearchopen(false);
    }

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate(`/${search}`);
        closeModal();
    }

    return (
        <div style={{ zIndex: '99999', position: 'fixed' }}>
            <div className={`search_wrap ${open ? 'open' : ''}`} onBlur={() => setSearchopen(false)}>
                <div className="close-search">
                    <span onClick={closeModal}>
                        <svg x="0px" y="0px" width="17px" height="16px" viewBox="-0.26 -0.512 17 16" enableBackground="new -0.26 -0.512 17 16" xmlSpace="preserve">
                            <line stroke="currentColor" strokeMiterlimit="10" x2="0.583" y2="14.593" x1="15.895" y1="0.353"></line>
                            <line stroke="currentColor" strokeMiterlimit="10" x2="15.896" y2="14.593" x1="0.584" y1="0.353"></line>
                        </svg>
                    </span>
                </div>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        className='form-control' 
                        id='search_input' 
                        placeholder='Search' 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className='search_icon'>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </form>
            </div>

            <div className={`search_overlay ${open ? 'open' : ''}`} onClick={closeModal}></div>
        </div>
    )
}

export default Search;