import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import blackLogo from './assets/Stay_Logo_Black.png';

import './stylesheets/Dashboard.css'
// import './stylesheets/CreateEvent.css'
import dashStyles from "./stylesheets/DashboardStyles";


// import jwt from 'jsonwebtoken';

// const jwt = require("jsonwebtoken");

// var quotes = {}

const Dashboard = () => {
    const navigate = useNavigate();
    const [ quotes, setQuotes ] = React.useState({});
    const [ tempQuotes, setTempQuotes ] = React.useState({});
    const [ events, setEvents ] = React.useState([]);
    const [ isOrganizer, setIsOrganizer ] = React.useState(false);


    async function populateQuotes(){
        console.log('Populating quotes...');
        const req = await fetch('http://localhost:1337/api/quotes', {
            method: 'GET',
            headers: {
                // 'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token'),
            },
        })

        const data = await req.json()

        console.log(`data: ${data}`);

        if(data.status === 'ok'){
            console.log(`data: ${JSON.stringify(data)}`);
                
            // setQuotes('good');
            setQuotes((data.quotes));
            setTempQuotes('');

            // if(data.message){
            //     navigate('/login');
            // }else{
            //     console.log(`data: ${data}`);
                
            //     setTempQuotes('');
            //     setQuotes(data.quotes);


            //     // const quotesDiv = document.getElementById('quotes');
            //     // data.quotes.forEach(quote => {
            //     //     quotesDiv.innerHTML += `<div class="quote">
            //     //         <h3>${quote.text}</h3>
            //     //     </div>`
            //     // })
            // }

        }else{
            alert(data.error)
        }

        
    }
    
    async function updateQuotes(){
        console.log('Populating quotes...');
        const req = await fetch('http://localhost:1337/api/quotes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token'),
            },
            body: JSON.stringify({
                newQuote: tempQuotes,
            })
        })

        const data = await req.json()
        if(data.status === 'ok'){
            setQuotes(data.quotes);
            console.log('quote was updated here');

        }else{
            console.log('Error updating quotes');
        }
    }


    useEffect(() => { // Execute on page load
        fetchEvents();
        
        // populateQuotes();
        return () => {

        };
    }, []);

    async function fetchEvents(){
        console.log('Fetching events...');

        const loginToken = localStorage.getItem('token');

        if(loginToken===null){
            console.log('No token found');
            navigate('/login');
            
        }

        const req = await fetch('http://localhost:1337/api/events', {
            method: 'GET',
            headers: {
                // 'Content-Type': 'application/json',
                'x-access-token': loginToken,
            },
        })

        const data = await req.json()

        //  console.log(`data: ${data}`);

        if(data.status === 'ok'){
            console.log(`data: ${JSON.stringify(data)}`);
                
            setEvents((data.events));

            if(data.organizer === 1){
                setIsOrganizer(true);
            }



            console.log(events)

            // if(data.message){
            //     navigate('/login');
            // }else{
            //     console.log(`data: ${data}`);
                
            //     setTempQuotes('');
            //     setQuotes(data.quotes);
        }else if(data.error === 'User not found'){
            navigate('/login');
        }
    }

    function logOut(){
        localStorage.removeItem('token');
        navigate('/login');
    }

    function EventCard(props){

        // var eventDate = new Date(props.event.startDate);
        // var today = new Date();
        // if(eventDate <= today){
        //     eventDate = 'Today';
        // }

        var dateText = 'Today';

        
        var eventDate = new Date(props.event.startDate);
        var today = new Date(new Date().toDateString());

        var startTime = props.event.startDate + props.event.startTime;

        // console.log(`eventDate: ${eventDate}`);
        // console.log(`today: ${today}`);
        console.log(`startTime: ${startTime}`);
            if(eventDate != today){
                dateText = 'on ' + eventDate.toLocaleDateString('en-US', {weekday: 'long',  day: 'numeric', month: 'short',});
                if(eventDate.getFullYear !== today.getFullYear){
                    dateText = dateText + ' ' + eventDate.getFullYear();
                }
            // }else if( startTime !== null){
            //     dateText = 'Today at ' + new Time(startTime);

            }

        console.log(`dateText: ${dateText}`)

        return(
            <div className="eventCard" style={{  ...(dashStyles.eventCard( props.event.colors.background ? props.event.colors.background : '#FFF' )), 'margin': '30px',}}>
                <div className="eventCardImage" style={dashStyles.card.cardImage}>
                    { props.event.image ? <img src={props.event.image} alt="" style={dashStyles.card.cardImage}/> : <br /> }
                    {/* <img src={props.event.image} alt="eventImage" style={dashStyles.card.cardImage} /> */}
                </div>
                <div className="eventCardInfo">
                    <div className="title" style={dashStyles.card.cardTitle(props.event.colors.primary)}>{props.event.name}</div>
                    {/* <div className="description">{props.event.description}</div> */}

                    {/* {eventDate > today ? } */}


                    {/* <div className="date" style={dashStyles.card.cardDate(props.event.colors.secondary)}>{eventDate}</div> */}
                    { props.event.startDate ? <div className="date" style={dashStyles.card.cardDate(props.event.colors.secondary)}>{dateText}</div> : null }

                </div>
            </div>
        )
    }

    return (
        <div className="psuedoRoot">
            <div className="dashboard">
                <div className="sidePane">
                    <img src={blackLogo} alt="Stay Logo" className="blackLogo" />
                    <div className="sidePaneContent">
                        <button className="sidePaneButton" style={dashStyles.sidePaneButton} onClick={() => navigate('/createEvent')}>Create Event</button>
                        <button className="sidePaneButton" style={dashStyles.sidePaneButton} onClick={logOut}>Log Out</button>
                    </div>
                </div>

                <div className='bodyBG'>

                    <div className="eventContainer" style={dashStyles.eventsContainer}>
                        {events.map((event) => {    
                            return(
                                <EventCard key={event.key} event={event} />
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard