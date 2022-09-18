const eventsContainer = {
    display: 'flex',
    flexWrap: 'wrap',
    // flexFlow: 'wrap',
    // flexDirection: 'column',
    // gridTemplateColumns: 'repeat(3, 1fr)',
    // gridAutoColumns: 'auto',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    
    width: '100%',
    height: '100%',
    padding: '0px',
    boxSizing: 'border-box',
    overflow: 'scroll',
    transition: '0.25s',

}

function eventCard(bgcolor) {
    return({
        width: '220px',
        height: '300px',
        backgroundColor: (bgcolor === null ? '#fff' : bgcolor),
        borderRadius: '32px',
        padding: '0px',
        display: 'flex',

        flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'center',
        transition: '1s',
        boxShadow: '0px 3px 7px 0px rgba(0,0,0,0.05)',
    })
}

const cardImage = {
    marginTop: '0px',
    marginBottom: '0px',
    width: '220px',
    height: '220px',
    // backgroundColor: '#FFF',
    borderRadius: '32px',
    objectFit: 'cover',
    objectPosition: 'center',
    transition: '0.25s',
}

function cardTitle(primaryColor) {
    return({
        marginTop: '0px',
        marginBottom: '0px',
        padding: '5px',
        fontSize: '1.5em',
        // fontWeight: 'bold',
        textAlign: 'center',
        color: ((primaryColor === null) ? '#000' : primaryColor),
    })
}

function cardDate(secondaryColor){
    return({
        marginTop: '0px',
        marginBottom: '0px',
        padding: '5px',
        fontSize: '1em',
        textAlign: 'center',
        color: ((secondaryColor === null) ? '#000' : secondaryColor),
    })
}

function cardTime(secondaryColor){
    return({
        marginTop: '0px',
        marginBottom: '0px',
        padding: '5px',
        fontSize: '1em',
        textAlign: 'center',
        color: ((secondaryColor === null) ? '#000' : secondaryColor),
    })
}


function editCard(){
    return({
        height: '500px',
        backgroundColor: '#fff',
        borderRadius: '50px',
        
    })
}

function editorHeader(bgColor) {
    return({
        width: '100%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50px',
        display: 'flex',
        backgroundColor: (bgColor === null ? '#fff' : bgColor),
    })
}

function editorHeading(primaryColor) {
    return({
        
        width: '100%',
        height: '50px',
        justifyContent: 'center',
        borderRadius: '50px',
        alignItems: 'center',
        color: (primaryColor === null ? '#000' : primaryColor),
        display: 'flex',
    })
}


const editCardBody = {
    padding: '30px',
    width: '100%',
    height: 'auto',
    // justifyContent: 'center',
    
}

function cardDescription(bodyColor) {
    return({
        borderRadius: '10px',
        height: 'auto',
        width: 'calc(100% - 140px)',
        resize: 'none',
        margin: '20px',
        padding: '15px',
        fontSize: '1em',
        textAlign: 'left',
        color: ((bodyColor === null) ? '#000' : bodyColor),
    })
}
const cardEditorImage = {
    
}


function cardPicker(secondaryColor) {
    return({
        borderRadius: '30px',
        height: 'auto',
        width: 'calc(100% - 300px)',
        resize: 'none',
        margin: '20px',
        marginLeft: '30px',
        padding: '15px',
        fontSize: '1em',
        textAlign: 'left',
        color: ((secondaryColor === null) ? '#000' : secondaryColor),
    })
}


const editorAuthorHeading = {
    opacity: '0.5',
    fontSize: '0.5em',
    padding: '0px',
}

const editorAuthorDetails = {
    fontSize: '0.75em',

    opacity: '0.75',
    padding: '5px',
}

function createButton(primaryColor,backgroundColor){
    return({
        width: 'calc(100% - 300px)',
        height: '50px',
        // borderRadius: '30px',
        backgroundColor: (primaryColor === null ? '#000' : primaryColor),
        color: (backgroundColor === null ? '#fff' : backgroundColor),
        marginLeft: 'calc(130px)',
        marginRight: 'calc(0px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
    })
}

const card = {cardImage, cardTitle, cardDate, cardTime, }

const cardEditor = {editCard, editorHeader, editorHeading, editCardBody, cardDescription, cardPicker, cardEditorImage, editorAuthorDetails, editorAuthorHeading ,createButton }

const dashStyles = {eventsContainer, eventCard, card, cardEditor}

export default dashStyles