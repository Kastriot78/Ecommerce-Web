import { Outlet } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { GoogleMap } from './components/GoggleMap/GoogleMap';
import AfterHeader from './components/AfterHead/AfterHead';

const PageLayout = () => {
  return (
    <>
      <Header />
      <AfterHeader />
      <Outlet />
      <GoogleMap />
      <Footer />
    </>
  )
}

export default PageLayout