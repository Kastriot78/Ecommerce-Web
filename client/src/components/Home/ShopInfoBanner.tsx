
import './style.css';

const ShopInfoBanner = () => {
    return (
        <div className='section pb_70'>
            <div className="container">
                <div className="row g-0">
                    <div className="col-lg-4">
                        <div className="icon_box icon_box_style1">
                            <div className="icon">
                                <i className="fa-solid fa-truck"></i>
                            </div>
                            <div className="icon_box_content">
                                <h5>TRANSPORT FALAS</h5>
                                <p>Transporti është falas për të gjitha porositë.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="icon_box icon_box_style1">
                            <div className="icon">
                                <i className="fa-solid fa-sack-dollar"></i>
                            </div>
                            <div className="icon_box_content">
                                <h5>30 DITË MUNDËSI NDËRRIMI</h5>
                                <p>Keni 14 ditë kohë për të vendosur nëse një artikull është i duhuri për ju.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="icon_box icon_box_style1">
                            <div className="icon">
                                <i className="fa-solid fa-headset"></i>
                            </div>
                            <div className="icon_box_content">
                                <h5>MBËSHTETJE 24/7</h5>
                                <p>Na kontaktoni nëpërmjet e-mail 24 orë në ditë, 7 ditë në javë.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShopInfoBanner;
