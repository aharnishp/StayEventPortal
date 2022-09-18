import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import blackLogo from './assets/Stay_Logo_Black.png';

// import './stylesheets/Dashboard.css'
import './stylesheets/CreateEvent.css'
import dashStyles from "./stylesheets/DashboardStyles";

import FileBase64 from 'react-file-base64';


// import jwt from 'jsonwebtoken';

// const jwt = require("jsonwebtoken");

// var quotes = {}

const CreateEvent = () => {


    const navigate = useNavigate();
    const [ quotes, setQuotes ] = React.useState({});
    const [ tempQuotes, setTempQuotes ] = React.useState({});

    const [ showColors, setShowColors ] = React.useState(false);
    


    // const [ events, setEvents ] = React.useState([]);
    const [ thisEvent, setThisEvent ] = React.useState({
        key: 1,
        name: '',
        description: '',
        startDate: '2022-09-18',
        startTime: '12:00',
        colors:{ primary: '#046e7c', secondary: '#4b8599', background: '#ffffff' },
        image:'',
        creator: {
            email: '',
            name: '',
        },
    });

    function clearThisEvent() {

        setThisEvent({        
            key: 1,
            name: '',
            description: '',
            startDate: '2022-09-18',
            startTime: '12:00',
            colors:{ primary: '#046e7c', secondary: '#4b8599', background: '#ffffff' },
            image:'',
            creator: {
                email: '',
                name: '',
            },
        })    

        
        setThisEvent({ ...thisEvent, creator: getAuthorName() })

        console.log('Set creator to: ' + thisEvent.creator.name);
        // console.log(JSON.stringify(authorName))

        

    }
    

    
    useEffect(() => { // Execute on page load

        console.log('Page loaded');
        clearThisEvent();
        setThisEvent({ ...thisEvent, creator: getAuthorName() })
        console.log('Author loaded');

        return () => {

        };
    }, []);

    // async function fetchEvents(){
    //     console.log('Fetching events...');

    //     const loginToken = localStorage.getItem('token');

    //     if(loginToken===null){
    //         console.log('No token found');
    //         navigate('/login');
            
    //     }

    //     const req = await fetch('http://localhost:1337/api/events', {
    //         method: 'GET',
    //         headers: {
    //             // 'Content-Type': 'application/json',
    //             'x-access-token': loginToken,
    //         },
    //     })

    //     const data = await req.json()

    //     //  console.log(`data: ${data}`);

    //     if(data.status === 'ok'){
    //         console.log(`data: ${JSON.stringify(data)}`);
                
    //         setEvents((data.events));


    //         console.log(events)

    //         // if(data.message){
    //         //     navigate('/login');
    //         // }else{
    //         //     console.log(`data: ${data}`);
                
    //         //     setTempQuotes('');
    //         //     setQuotes(data.quotes);
    //     }else if(data.error === 'User not found'){
    //         navigate('/login');
    //     }
    // }

    async function getAuthorName(){
        const loginToken = localStorage.getItem('token');

        if(loginToken===null){
            console.log('No token found');
            navigate('/login');
            
        }

        const req = await fetch('http://localhost:1337/api/users', {
            method: 'POST',
            headers: {
                // 'Content-Type': 'application/json',
                'x-access-token': loginToken,
            },
        })

        const data = await req.json()

        //  console.log(`data: ${data}`);

        if(data.status === 'ok'){
            console.log(`data: ${JSON.stringify(data)}`);
            setThisEvent({ ...thisEvent, creator: data.user })

                
            return data.user;
        }else if(data.error === 'User not found'){
            navigate('/login');
        }
    }

    async function createEvent(){
        console.log('Creating event...');
        console.log(thisEvent);

        const req = await fetch('http://localhost:1337/api/createEvent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token'),
            },
            body: JSON.stringify(thisEvent),
        })

        const data = await req.json()
        if(data.status === 'ok'){
            // console.log(`data: ${JSON.stringify(data)}`);
            console.log("Created Event")
            navigate('/dashboard');
        }

        

    }

    function ColorPanel() {

        if(showColors){
            return (
                <div className="color-panel">
                    <center>
                        <div style={{padding: '10px', fontSize: '1.25em', color: thisEvent.colors.primary}}>Color</div>
                    </center>
                    <div className="color-box">
                        <div className="color-box-palette">
                            <input type="color" id="primary-color" className="colorPickerIn" name="primary-color" value={thisEvent.colors.primary} onChange={(e) => setThisEvent({ ...thisEvent, colors: { ...thisEvent.colors, primary: e.target.value } })} />
                            <div>
                                Primary
                            </div>
                        </div>
                        <div className="color-box-palette">
                            <input type="color" id="secondary-color" className="colorPickerIn" name="secondary-color" value={thisEvent.colors.secondary} onChange={(e) => setThisEvent({ ...thisEvent, colors: { ...thisEvent.colors, secondary: e.target.value } })} />
                            <div>
                                Secondary
                            </div>
                        </div>
                        <div className="color-box-palette">
                            <input type="color" id="background-color" className="colorPickerIn" name="background-color" value={thisEvent.colors.background} onChange={(e) => setThisEvent({ ...thisEvent, colors: { ...thisEvent.colors, background: e.target.value } })} />
                            <div>
                                Background
                            </div>
                        </div>
                    </div>
            </div>
            )
        }else{
            return <div>
                <button class='silentBtn' style={{
                    width: '100px',
                    // margin: 'auto',
                    marginTop: '20px',
                    marginBottom: '20px',
                    marginLeft: 'calc(50% - 50px)', 
                    marginRight: 'auto', 
                    padding: '10px',
                    }} onClick={() => setShowColors(true)}>Colors</button>
            </div>;
        }
    }

    function EventCard(props){

        var dateText = 'Today';

        
        var eventDate = new Date(thisEvent.startDate);
        var today = new Date(new Date().toDateString());

        var startTime = props.event.startDate + props.event.startTime;

        // console.log(`eventDate: ${eventDate}`);
        // console.log(`today: ${today}`);
        console.log(`startTime: ${startTime}`);

        if(eventDate => today){
            dateText = 'on ' + eventDate.toLocaleDateString('en-US', {weekday: 'long',  day: 'numeric', month: 'short',});
            if(eventDate.getFullYear() !== today.getFullYear()){
                dateText = dateText + ' ' + eventDate.getFullYear();
            }
        }

        console.log(`dateText: ${dateText}`)


        
        return(
            <div className="eventCard" style={dashStyles.eventCard( props.event.colors.background ? props.event.colors.background : '#FFF' )}>
                <div className="eventCardImage" style={dashStyles.card.cardImage}>
                    { props.event.image ? <img src={props.event.image} alt="" style={dashStyles.card.cardImage}/> : <br /> }
                </div>
                <div className="eventCardInfo">
                    <div className="title" style={dashStyles.card.cardTitle(props.event.colors.primary)}>
                        {props.event.name ? props.event.name : 'Untitled Event'}
                    </div>

                    { props.event.startDate ? <div className="date" style={dashStyles.card.cardDate(props.event.colors.secondary)}>{dateText}</div> : null }

                </div>
            </div>
            // <div>
            //     {JSON.stringify(props)}
            // </div>
        )
    }

    return (
        <div className="psuedoRoot">
            <div className="dashboard">
                <div className="sidePane">
                    <div className="titlebar blackLogo">
                        <center>
                            <div>Create New Event</div>
                        </center>
                    </div>
                    {/* <img src={blackLogo} alt="Stay Logo" className="blackLogo" /> */}
            
                                <EventCard key={1} event={thisEvent} />
                                <br />
                                <center><div>Preview</div></center>
                                <br />
                                <ColorPanel />
                </div>

                <div className='bodyBG'>
                    <div className="editCard" style={dashStyles.cardEditor.editCard()}>
                        <div className="editCardHeader" style={dashStyles.cardEditor.editorHeader('#FFF')}>
                            <input
                                type="text"
                                value={thisEvent.name}
                                onChange={(e) => setThisEvent({ ...thisEvent, name: e.target.value })}
                                placeholder="Untitled Event"
                                className="eventName silentCreateEvent"
                                style={dashStyles.cardEditor.editorHeading(thisEvent.colors.primary)}
                            />
                        </div>
                        <div className="editCardBody" style={dashStyles.cardEditor.editCardBody}>
                            <textarea 
                                // type="textarea"
                                rows={3}
                                value={thisEvent.description}
                                placeholder="Event Description"
                                className="eventDescription silentCreateEvent"
                                onChange={(e) => setThisEvent({ ...thisEvent, description: e.target.value })}
                                style={dashStyles.cardEditor.cardDescription('#000')}

                            />
                            <div className="editCardImage">
                                <FileBase64
                                    className="eventImage silentCreateEvent"
                                    multiple={ false }
                                    onDone={ (file) => setThisEvent({ ...thisEvent, image: file.base64 }) }
                                    style={dashStyles.cardEditor.cardImage}
                                />

                                {/* <img src={thisEvent.image} alt="eventImage" style={dashStyles.cardEditor.cardEditorImage} /> */}
                            </div>
                            <div className="timePicker">
                                Event Date
                                <input
                                    type="date"
                                    value={thisEvent.startDate}
                                    onChange={(e) => setThisEvent({ ...thisEvent, startDate: e.target.value })}
                                    placeholder="Start Date"
                                    className="eventStartDate silentCreateEvent"
                                    style={dashStyles.cardEditor.cardPicker(thisEvent.colors.secondary)}
                                />

                            </div>
                                <div style={dashStyles.cardEditor.editorAuthorHeading}>
                                    Event Organiser:
                                </div>
                                <div className="authorDetails" style={dashStyles.cardEditor.editorAuthorDetails}>
                                    {(thisEvent.creator.name)},  {thisEvent.creator.email}
                                </div>

                                <div>
                                    <button className="createButton" onClick={createEvent} 
                                        style={dashStyles.cardEditor.createButton(thisEvent.colors.primary, thisEvent.colors.background)}>
                                            Create Event
                                    </button>

                                </div>
                                    {/* <input
                                        type="button"
                                        value="Cancel"
                                        className="cancelButton"
                                        onClick={() => navigate('/')}
                                        style={dashStyles.cardEditor.cancelButton(thisEvent.colors.secondary)}
                                    /> */}
                        </div>
                    </div>
 

                </div>
            </div>
        </div>
    )
}

export default CreateEvent