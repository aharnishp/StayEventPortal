import { useState } from 'react';
// import whiteLogo from './assets/Stay_Logo_White_optimized.svg'
// import whiteLogo from './assets/Stay_Logo_White_raster_0.25x.png'

import './stylesheets/RegLogin.css'

import allStyles from './stylesheets/RegLogin';
import { useNavigate } from 'react-router-dom';





// var ip = require('ip');
// var ServerIPAddr = ip.address();


function RegLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [emailExists, setEmailExists] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    
    const navigate = useNavigate();
    
    // const [ipAddr, setIpAddr] = useState('');

    // function getIP() {
    //     setIpAddr(ip.address());
    //     console.log(ipAddr);
    //     return(ipAddr)
    // }

    async function loginUser(event) {
        // event.preventDefault();

        console.log('Logging in...');
        console.log('Email: ' + email);
        // console.log('Password: ' + password);

        const response = await fetch('http://localhost:1337/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })

        const data = await response.json()

        console.log("Data: ", data);

        if(data.user){
            console.log('Login successful!');
            localStorage.setItem('token', data.user);
            navigate('/dashboard');
            // console.log(data.user);
        }else{
            console.log('Login failed!');
            alert('Please check password!')

        }
        // console.log(data);
    }

    async function registerUser(event) {
        // event.preventDefault();
    
        console.log('Registering user...');
        console.log('Name: ' + name);
        console.log('Email: ' + email);
        
        // console.log('Password: ' + password);
    
        const response = await fetch('http://localhost:1337/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
          }),
        })
    
        const data = await response.json()
    
        if(data.status === 'ok'){
        //   navigate('/login');
            console.log('Registration successful!');
            loginUser();
        }
    
        console.log(data);
    }
    

    async function checkEmailExists(event) {
        // event.preventDefault();
        if(email.length > 0){
            console.log('Checking if email exists...');

            const response = await fetch('http://localhost:1337/api/checkEmailExists', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                }),
            })

            const data = await response.json()

            console.log("Data: ", data);

            if(data.exists){
                console.log('Email exists!');
                setEmailExists(true);
                setShowPassword(true);
                // localStorage.setItem('token', data.user);
                // window.location.href = '/dashboard';
                // console.log(data.user);
            }else{
                console.log('Email does not exist!');
                setEmailExists(false);
                setShowPassword(true);

            }

        }else{
            setEmailExists(false);
            setShowPassword(false);
        }
            // console.log(data);
    }

    async function regLoginClick(){ 
        if(showPassword){
            if(emailExists){
                loginUser();
            }else{
                // window.location.href = '/register';
                registerUser();
            }
        }else{
            // checkEmailExists();
        }

    }

    function loginHeading(){
        if(!showPassword){
            return(
                <div className="heading" style={allStyles.headingStyle}>
                    <big><center><br /> </center></big>
                    {/* <br /> */}
                    email
                </div>
            )
        } else {
            if(emailExists){
                return(
                    <div className="heading" style={allStyles.headingStyle}>
                    <big><center>Sign In</center></big>

                        Welcome Back!
                    </div>
                )
            }else{
                return(
                    <div className="heading" style={allStyles.headingStyle}>
                    <big><center>Register</center></big>
                        Welcome!
                    </div>
                )
            }
        }
    }

    function PwdInput(){
        if(showPassword){
            return(
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="password"
                    className='silent'
                    style={allStyles.sTextBox}
                />
            )
        }else{
            return(
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="password"
                    className='silent'
                    style={allStyles.sTextBoxHidden}
                />
            )
        }
    }

    function NameInput(){
        if(!emailExists & showPassword){
            return(
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="name"
                    className='silent'
                    style={allStyles.sTextBox}
                />
            )
        }else{
            return(
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="name"  
                    className='silent'
                    disabled
                    style={allStyles.sTextBoxHidden}
                />
            )
        }
    }

    function WhiteLogo() {
        return(<svg className='stayLogo' style={allStyles.logoStyle} alt='Stay Logo' width="1797" height="1845" version="1.1" viewBox="0 0 475 488" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(-55.4 -41.7)">
            <path d="m370 529c-15.4-3.4-33.9-19.2-48.4-41.4-18.2-27.9-28.7-61.7-26.4-85.4 3.29-34 23.8-53.3 64.3-60.5 6.08-1.08 15.8-1.99 28-2.6l6.51-0.33-0.294-3.67c-0.161-2.02-0.441-5.57-0.622-7.89l-0.328-4.23-2.83 1.47c-3.84 1.99-9.41 2.04-13.1 0.126-3.38-1.77-10-8.33-13.1-12.9l-2.49-3.74-2.84 4.82c-3.65 6.19-10.9 13.6-15.5 15.9-2.54 1.26-4.25 1.69-7.35 1.85-3.77 0.19-4.33 0.0628-8.28-1.89-5.23-2.58-12.5-9.65-15.8-15.3l-2.15-3.73-3.46 7.04c-4 8.15-7.56 12.5-11.9 14.7-3.46 1.72-4.89 1.78-7.93 0.303-4.19-2.03-8.66-9.18-10.6-17l-1.03-4.1-2.54 5.29c-4.5 9.37-12.7 20.7-18.7 25.7-8.87 7.41-17.1 5.04-22.6-6.54-6.29-13.1-9.27-29.7-9.41-52.4-0.0383-6.27-0.143-11.3-0.232-11.2-0.0891 0.0891-2.24 3.9-4.78 8.47-4.76 8.56-10.8 17.9-15 23.3-2.23 2.85-2.4 3.3-2.4 6.41 0 6.8-2.43 16.7-5.65 23.1-4.79 9.45-14.8 18.6-25.8 23.6-8 3.63-19.7 7-29.1 8.35-22.2 3.21-39-0.137-53.7-10.7-8.36-6-19.5-17.9-24.7-26.4-5.84-9.53-5.84-20-0.0054-26 2.81-2.89 6.64-4.8 13.2-6.55 4.78-1.28 6.32-1.42 16-1.46 11.5-0.0496 14.6 0.322 25.5 3.03 8.56 2.13 15.7 4.56 29.2 9.92 17.6 7 25.1 8.41 33.2 6.29 3.53-0.92 9.46-3.85 9.83-4.87 0.619-1.68-1.01-10.2-3.25-16.9-5.15-15.5-15.4-33.5-33.6-58.6-3.46-4.79-8.35-12-10.9-16.1-2.52-4.08-4.77-7.42-5.01-7.42-0.233-6e-3 -2.36 1.66-4.74 3.71-9.9 8.55-23.7 17.8-28.2 18.9-2.41 0.578-3.01 0.534-4.83-0.357-1.58-0.772-2.13-1.4-2.26-2.6-0.265-2.32 0.83-3.14 2.1-1.59 2.01 2.45 4.55 1.4 14.2-5.86 8-6.03 20.6-17 20.6-17.9 0-0.391-1.14-3.16-2.54-6.14-7.77-16.6-11-34.9-9.63-54.4 2.59-36.9 14.8-64.2 37.9-84.5 13.5-11.9 22-16.5 30.6-16.5 9.05-0.0258 17.2 5.48 21.1 14.3 4.41 9.96 4.89 24.8 1.21 37.5-4.37 15.1-18.4 43.7-30 61.2-6.89 10.4-18.5 24.9-31.3 39.3l-5.58 6.27 1.72 3.06c2.9 5.16 9.36 14.7 17 25.1 12.2 16.6 17.7 25.4 25.1 40 5.25 10.4 8.01 17.1 9.81 23.9 0.692 2.61 1.51 4.67 1.81 4.57 1.91-0.616 13.4-19.2 19.9-32.1l4.16-8.27 0.786-9.93c0.888-11.2 2.84-31.1 3.32-33.7l0.314-1.75-3.22-0.359c-16.7-1.86-28.6-5.43-30.6-9.19-0.85-1.59 0.78-4.01 2.43-3.61 6.57 1.58 13.3 2.72 21.8 3.68 5.58 0.631 10.2 1.07 10.3 0.966 0.1-0.1 0.697-3.52 1.33-7.61 3.5-22.7 8.19-38.4 14.4-48.2 3.43-5.43 7.21-6.61 9.14-2.86 0.705 1.36 0.865 3.63 0.842 11.9-0.0399 14-1.95 29-5.57 43.9-0.59 2.43-0.903 4.56-0.696 4.75 0.207 0.186 10.2 1.14 22.2 2.12 36 2.94 39.4 3.41 46.1 6.37 4.55 2.01 4.07 3.04-1.42 3.04-4.83 0-43.1-1.91-55.4-2.76-4.25-0.295-9.09-0.538-10.8-0.54l-3.03-3e-3 -3.18 9.79c-1.75 5.38-4.55 13.1-6.22 17.2-2.77 6.78-3.09 8.04-3.67 14.1-0.345 3.64-0.648 14.9-0.672 25.1-0.0471 20 0.475 25.9 3.26 37 2.97 11.8 7.33 20.4 10.4 20.4 1.94 0 6.12-3.09 10.1-7.43 8.38-9.25 14.4-19.8 17.1-29.8 1.31-4.93 1.45-6.37 1.36-13.8-0.0596-4.55-0.16-8.99-0.224-9.87-0.0634-0.88 0.167-1.7 0.512-1.82 0.726-0.251 3.78 6.77 4.36 10 0.217 1.21 0.507 2.4 0.645 2.64 0.138 0.24 1.12-1.37 2.17-3.59 5.02-10.5 14.6-21.9 20.9-25 2.78-1.36 3.89-1.59 7.66-1.58 3.74 0.0143 4.86 0.251 7.38 1.56 6.36 3.31 11.2 10.4 13 18.8 2.2 10.4-0.235 11.3-4.97 1.89-3.42-6.81-6.13-10-10.2-12.1-1.89-0.943-3.95-1.71-4.59-1.7-7.42 0.078-22 19.7-25.8 34.7-2.03 8.11-0.789 17.4 3.12 23.3 2 3.03 2.74 3.12 5.3 0.635 4.72-4.57 8.39-14.3 13.1-35.1 1.37-5.99 2.02-7.83 3.15-8.96 2.55-2.55 6.78-1.38 7.65 2.11 0.179 0.715-0.0966 4-0.614 7.29-1.7 10.8-0.387 18 4.68 25.7 10.4 15.9 21.7 14.2 31.7-4.69 4.36-8.23 4.84-9.88 5.29-18.1 0.572-10.4 3.05-18.6 6.28-20.7 1.97-1.29 4.55-1.13 6.15 0.373 1.13 1.06 1.31 1.75 1.31 4.86-6e-3 4.15-1.44 10.7-3.93 18.1-2.04 6-1.95 7.05 1.24 13.4 2.49 4.98 7.28 10.5 10.5 12.2 4.37 2.23 8.66 0.778 12-4.04l1.6-2.34 0.312-12.1c0.311-12.1 0.701-15.9 2.4-23.2 1.7-7.28 3.84-10.2 7.54-10.2 3.17-0.0172 5.12 2.17 5.64 6.34 0.822 6.58-0.667 18.5-3.43 27.6-1.88 6.14-2.09 10.9-1.15 26.2l0.694 11.3 3.86 0.366c14 1.33 19.6 1.96 40.8 4.6 31.1 3.87 36.6 4.33 47.6 4 17.3-0.51 21.9-3.32 30.7-18.5 4.02-6.96 4.76-5.9 1.98 2.8-1.87 5.82-4.76 10.7-8.25 13.8-3.15 2.84-9.26 5.67-14.7 6.8-6.4 1.34-23.3 1.2-37.2-0.308-37.2-4.05-63.2-6.13-64-5.15-0.179 0.214 0.232 9.95 0.913 21.6 3.28 56.3 4.31 94.2 3.04 112-0.725 9.9-2.25 19.7-3.96 25.4-1.68 5.63-5.27 12.2-8.49 15.5-6.36 6.52-16.7 9.32-26.5 7.16zm11.7-12.7c6.06-1.8 10.8-8.31 13.3-18.2 5.86-23.1 6.27-58.9 1.43-126-0.754-10.5-1.52-20.2-1.7-21.6l-0.325-2.62h-3.95c-9.62 6e-3 -25.9 2.19-37.3 5.01-16.3 4.05-26.9 9.6-35.6 18.7-9.65 10.1-14.1 24.2-13.4 41.9 0.631 15 4.74 29.6 13.3 47.2 12.1 24.7 29.1 44.4 45.7 52.7 7.4 3.72 12.9 4.6 18.5 2.96zm-239-166c13-2.84 23.4-7.3 30.1-13 5.71-4.82 10.7-12.2 12.3-18.4 0.542-2 0.515-2.08-0.638-1.72-0.662 0.204-1.87 0.712-2.69 1.13-2.76 1.4-8.41 2.4-13.7 2.4-6.74 9e-3 -12.9-1.48-27-6.5-22.7-8.09-33.4-10.6-47.7-11-10.8-0.327-16.5 0.378-21.9 2.72-3.23 1.39-4.25 2.75-4.25 5.65 0.0112 4.64 5.64 13.1 14.9 22.4 10.3 10.3 18.8 15.2 30.5 17.4 6.65 1.26 21.7 0.705 30.1-1.11zm95.2-136c0.337-1.55 0.223-1.76-1.1-2.1-0.81-0.203-1.6-0.248-1.74-0.0986-0.367 0.367-1.77 12.3-1.73 14.7 0.0246 1.48 0.522 0.436 2.11-4.41 1.14-3.49 2.25-7.12 2.46-8.07zm2.74-11.1c0.712-2.4 3.14-16 3.92-22 1.1-8.4 1.7-24.1 0.873-22.8-1.85 2.89-5.67 19.2-8.04 34.4-1.84 11.8-1.87 11.3 0.789 11.3 1.59 0 2.25-0.258 2.45-0.965zm-92.4-19.7c18.4-22.9 25.2-33.1 34.8-51.9 16.2-31.8 19.9-50.4 13.7-67.3-2.16-5.82-7.53-9.79-11.9-8.78-0.846 0.195-3.35 1.32-5.57 2.5-12.2 6.45-27.1 21.4-34.7 34.8-5.69 10-10.7 25.3-13.2 40-1.44 8.58-1.44 31.9 3.3e-4 39 1.22 5.98 3.79 14.2 5.95 19 1.39 3.08 1.7 3.43 2.46 2.79 0.48-0.398 4.28-4.96 8.45-10.1z" fill="#fff" />
            </g>
            </svg>)
    }



    return (
        <div style={{backgroundColor: '#1b6878',}}>
            <div className='loginBG' style={allStyles.loginBGstyle}>
                <div id='pane' style={allStyles.paneBGstyle}>
                    <div>
                        {/* <img src={whiteLogo} className='stayLogo' style={allStyles.logoStyle} alt='Stay Logo' /> */}
                        { WhiteLogo() }

                        <div className='inputsDiv' style={allStyles.inputsDiv}>
                            { loginHeading() }
                            <br />
                            
                            <input
                                autoFocus
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={() => checkEmailExists()}
                                type="email"
                                placeholder="email"
                                className='silent'
                                style={allStyles.sTextBox}
                            />
                            <br />
                            { PwdInput() }  
                            <br />
                            { NameInput() }
                            <br />

                            <input
                                type="submit"
                                value={ showPassword ? (emailExists ? 'Sign In' : 'Register') : 'Next'}
                                className='silentBtn'
                                style={allStyles.sButton}
                                onClick={() => regLoginClick()}
                            />

                        </div>
                    </div>

                </div>


            </div>
        </div>
    )
}

export default RegLogin