import whiteLogo from '../assets/Stay_Logo_White_raster_0.25x.png'

import stayBG from '../assets/stayBG_blur.jpg'

const loginBGstyle = {
    backgroundColor: '#1A1A1A',
    width: '100%',
    height: '100vh',
    backgroundImage: `url(${stayBG})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    // backgroundAttachment: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    // transistion: '1s',
}

const paneBGstyle = {
    width: '450px',
    height: '100%',
    // backgroundColor: 'rgba(255, 255, 255, 0.25)',
    // background: 'linear-gradient(179.41deg, rgba(255, 255, 255, 0.5) -4.06%, rgba(255, 255, 255, 0) 99.49%)',
    // borderRadius: '0',
}

const logoStyle = {
    width: 'calc(100% - 200px)',
    height: 'auto',
    margin: '100px 100px 20px 100px',
    filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.25))',
}
const inputsDiv = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
}

const sTextBox = {
    width: 'calc(100% - 180px)',
    // color: 'white',
    // fontSize: 'large',
    // padding: '10px',
    // backgroundColor: 'rgba(255, 255, 255, 0.089)',
    // borderColor: 'rgba(255, 255, 255, 0.164)',
    // borderStyle: 'solid',
    // borderRadius: '12px',
    // borderWidth: '2px',
    // outline: 'none',
    /* height: 45px; */
}
const sTextBoxHidden = {
    width: 'calc(100% - 180px)',
    opacity: '0',
}

const headingStyle = {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: 'x-large',
    // fontWeight: 'bold',
}

const allStyles = {loginBGstyle,paneBGstyle,logoStyle,inputsDiv,sTextBox,sTextBoxHidden,headingStyle}

export default allStyles