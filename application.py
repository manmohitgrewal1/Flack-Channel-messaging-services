import os
from flask import Flask, session, render_template, request, flash, redirect, url_for,jsonify
from flask_session import Session
from helpers import login_required
from flask_socketio import SocketIO, emit
import time

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

user_info_chunks={}
channels=[]
users=[]
@app.route("/", methods=['POST', 'GET'])
def index():
    if request.method=='GET':
        return render_template("layout.html",channel_list= channels)
    if request.method=='POST':
        nw_channel= request.form.get("inp_create_channel")
        if nw_channel in channels:
            return "Channel already exist!"
        channels.append(nw_channel)
        return render_template("layout.html", channel_list= channels)

@app.route('/users', methods=['POST', 'GET'])
def add_user():
    if request.method=='POST':
        nw_user=request.form.get("user")
        if nw_user in users:
            return "USERNAME ALREADY EXIST!"
        users.append(nw_user)
        return redirect(url_for('index'))
@app.route('/channel', methods=['GET'])
def channel():
    if request.method=='GET':
        return jsonify(user_info_chunks)

@socketio.on('send_msg')
def Message(data):
    named_tuple = time.localtime()
    times = str(time.strftime(" %H:%M, %m/%d/%Y", named_tuple))
    msg= data['msg']
    user= data["user"]
    channel=data["channel"]
    if channel in user_info_chunks:
        user_info_chunks[channel].append([user, msg, times])
    elif channel not in user_info_chunks:
        user_info_chunks[channel]=[[user, msg, times]]
    emit("response_trigger", {"msg": msg, "user": user, 'time': times, 'channel': channel}, broadcast=True)
