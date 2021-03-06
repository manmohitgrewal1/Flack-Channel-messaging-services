# FLACK

<h4>In this project, I've built an online messaging service Flask, similar in spirit to Slack. Users will be able to sign in to the site with a display name, create channels (i.e. chatrooms) to communicate in, as well as see and join existing channels. Once a channel is selected, users will be able to send and receive messages with one another in real-time.</h4>
<h1>Milestone</h1>
- This project is built on two important python libraries flask and socketio. Flack is built using Flask micro-framework, flask-socketio- JavaScript library for realtime web applications.
- Users can log in by entering the username in the prompt window. As I've not used any database in this project the username is stored in the localStorage using localStorage.setItem().
- Once a user has logged-in he/she can create channels and communicate in the selected channel. List of all the channels and users is stored in the form of python list in the appication.py.
- For the users to communicate, without rendering different templates or without reloading the page for every new message sent or received, we have used flask-socket io.
After the socket is connected to the server, the user will enter the message in the input box and the input value will be extracted using querySelector in javascript. Info like username, message, time, and the channel name is put in a dictionary and emitted to the server with the event name attached to it. socketio decorator for that event is created in the application.py that will trigger the function beneath it. Data sent by socketio will be stored in the python dictionary-user_info_chunks={}. Subsequently, the same data is emitted out with the additional parameter "broadcast=True" which will broadcast the message to all the active sockets. This event will be caught by the socket.io function defined in the javascript file. The function will dynamically create a li tag and a few other elements that will help the data look visually pretty.
<br>
<img src="screenshot.png" height=300>
<br/>
<h1>STYLING with CSS and JS</h1>
In this project, I've tried to make the website look fancy with the help of an animated hamburger button, input box, and content-box with auto-down scroll. You can check out the snippet of the respective animation in the style.css file. 
I hope this helped you some way. Thanks for visiting:)
<br>
Check out my YOUTUBE video which shows working of this web application. <br> 
Link: https://www.youtube.com/watch?v=qMGqm-8GarA
