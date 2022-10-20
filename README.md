# Stay event portal
Made using MERN stack (MongoDB + ExpressJS + ReactJS + NodeJS)
It helps verified organizers create events visible to all.


## Key features
It is responsive, animated using css and lightweight because of less number of packages used.

### watch demo here: 
### [G-Drive Link](https://drive.google.com/drive/folders/1Syvc4uJq8Im8tHl4GjR3h1JE0xKzNdhS?usp=sharing)
### [Figma Link](https://www.figma.com/file/uCUegMbfWoltFFiwgU60kB/Event-Portal?node-id=0%3A1)
## Event card
Event card is a way of previewing event, the colors visible on it can be customised by organizer.

It contains event poster (cropped to square), it is highly recommended to compress image before hand.

It previews name and date of event.


### Creating Event
On signing in using organizer's account, button to create event is visible.
The live preview shows how card will look after creating.


## Setup & Hosting
You may clone the repo and then setup a mongoDB server (also available on MongoDB Atlas)
Then you need to create .env file with the following parameters:

mongoPasswd=<YOUR SERVER PASSWORD>
tokenSecret=<YOUR SECRET KEY TO GENERATE JWT TOKENS>
  
after this, you need to modify username and server address for MongoDB in [server/index.js]
  
mongoose.connect(`mongodb+srv://${userName}:${mongoPasswd}@cluster0.u3yxkz3.mongodb.net/?retryWrites=true&w=majority`)

and also replace your site address after @
  
  
