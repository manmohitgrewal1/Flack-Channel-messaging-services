
// ===============================
//         Hamburger
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#hamburger").onclick = () => {
    document.querySelector(".icon").classList.toggle("active");
    document.querySelector(".curtain").classList.toggle("active");
  };
});

// =================================
//          Local storage
// ==================================
if (localStorage.getItem('user')) {
  var user_name=localStorage.getItem('user');
  document.querySelector('#user_link').innerHTML=localStorage.getItem('user');
}
else {
  document.addEventListener("DOMContentLoaded", () => {
    msg = prompt("Enter the username your want to login with.", "Username");
    var request= new XMLHttpRequest();
    request.open('POST','/users')
    const data = new FormData();
    data.append('user', msg);
    request.send(data);
    localStorage.setItem('user', msg)
    document.querySelector('#user_link').innerHTML=localStorage.getItem('user');
    return false;
  });
}
document.querySelector('#user_link').onclick= ()=>{
  localStorage.removeItem('user');
  msg = prompt("Enter the username your want to login with.", "Username");
  var request= new XMLHttpRequest();
  request.open('POST','/users')
  const data = new FormData();
  data.append('user', msg);
  request.send(data);
  localStorage.setItem('user', msg)
  document.querySelector('#user_link').innerHTML=localStorage.getItem('user');
  return false;
};

// ===================================
//             SocketIO
// ===================================

document.addEventListener('DOMContentLoaded', ()=> {
  var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
  socket.on('connect', ()=>{
    document.querySelector('#send_btn').onclick=()=>{
      var msg_typed=document.querySelector('.wrapper_input').value;
      var now = new Date();
      var user_name=localStorage.getItem('user');
      var channel= document.querySelector('#atv_ch').innerHTML;
      socket.emit("send_msg",{"msg": msg_typed, "user": user_name, 'channel': channel,'time': now});
      document.querySelector('.wrapper_input').value=" ";
    }
  });
  socket.on("response_trigger", data =>{
    var div=document.querySelector('.content_msg_main');
    var li=document.createElement('li');
    var para= document.createElement('p');
    var para2= document.createElement("p");
    var svg= document.createElementNS("http://www.w3.org/2000/svg","svg");
    var path1=document.createElementNS("http://www.w3.org/2000/svg","path");
    var path2=document.createElementNS("http://www.w3.org/2000/svg","path")
    var path3=document.createElementNS("http://www.w3.org/2000/svg","path")
    var span= document.createElement('span');
    var h3= document.createElement("h3");

    svg.setAttribute("id","icon_msg")
    svg.setAttribute("class", "bi bi-people-circle");
    svg.setAttribute("width", "2em");
    svg.setAttribute("height", "2em");
    svg.setAttribute("viewBox", "0 0 16 16");
    svg.setAttribute("fill", "currentColor");

    path1.setAttribute("d", "M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 008 15a6.987 6.987 0 005.468-2.63z");
    path2.setAttribute("fill-rule", "evenodd");
    path2.setAttribute("d", "M8 9a3 3 0 100-6 3 3 0 000 6z");
    path2.setAttribute("clip-rule", "evenodd");
    path3.setAttribute("fill-rule", "evenodd");
    path3.setAttribute("clip-rule", "evenodd");
    path3.setAttribute("d","M8 1a7 7 0 100 14A7 7 0 008 1zM0 8a8 8 0 1116 0A8 8 0 010 8z");
    svg.appendChild(path1);
    svg.appendChild(path2);
    svg.appendChild(path3);

    span.classList.add("time");
    para2.setAttribute("id", "text");
    para.innerHTML=`${data.user}`;
    para2.innerHTML=`${data.msg}`;
    span.innerHTML=`${data.time}`;
    para.appendChild(span);
    li.appendChild(svg);
    li.appendChild(para);
    li.appendChild(para2);

    document.querySelector('#message_ul').append(li);
  });
});

// ==============================================
//               Switch Channel Function
// ==============================================

function switch_channel(obj){
  document.querySelector('#atv_ch').innerHTML=obj;
  var request= new XMLHttpRequest();
  request.open('GET', '/channel');
  request.onload=()=>{
    const data= JSON.parse(request.responseText)
    if (obj in data){
      var div = document.querySelector('#message_ul');
      while(div.firstChild){
        div.removeChild(div.firstChild);
      }

      const main_data= data[obj];
      var i;
      for (i=0; i< main_data.length; i++){
        var li=document.createElement('li');
        var para= document.createElement('p');
        var para2= document.createElement("p");
        var svg= document.createElementNS("http://www.w3.org/2000/svg","svg");
        var path1=document.createElementNS("http://www.w3.org/2000/svg","path");
        var path2=document.createElementNS("http://www.w3.org/2000/svg","path")
        var path3=document.createElementNS("http://www.w3.org/2000/svg","path")
        var span= document.createElement('span');
        var h3= document.createElement("h3");

        svg.setAttribute("id","icon_msg")
        svg.setAttribute("class", "bi bi-people-circle");
        svg.setAttribute("width", "2em");
        svg.setAttribute("height", "2em");
        svg.setAttribute("viewBox", "0 0 16 16");
        svg.setAttribute("fill", "currentColor");


        path1.setAttribute("d", "M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 008 15a6.987 6.987 0 005.468-2.63z");
        path2.setAttribute("fill-rule", "evenodd");
        path2.setAttribute("d", "M8 9a3 3 0 100-6 3 3 0 000 6z");
        path2.setAttribute("clip-rule", "evenodd");
        path3.setAttribute("fill-rule", "evenodd");
        path3.setAttribute("clip-rule", "evenodd");
        path3.setAttribute("d","M8 1a7 7 0 100 14A7 7 0 008 1zM0 8a8 8 0 1116 0A8 8 0 010 8z");
        svg.appendChild(path1);
        svg.appendChild(path2);
        svg.appendChild(path3);
        span.classList.add("time");
        para2.setAttribute("id", "text");
        para.innerHTML=main_data[i][0];
        para2.innerHTML=main_data[i][1];
        span.innerHTML=main_data[i][2];
        para.appendChild(span);
        li.appendChild(svg);
        li.appendChild(para);
        li.appendChild(para2);
        document.querySelector('#message_ul').append(li);
      }}

      else{
        var div = document.querySelector('#message_ul');
        while(div.firstChild){
          div.removeChild(div.firstChild);
        }

      }

    }
    request.send();
  }
  // ===================================================
  //                   UPDATE Channels
  // ===================================================
  window.setInterval(function() {
    var elem = document.querySelector('.content_msg_main');
    elem.scrollTop = elem.scrollHeight;
  }, 1000);
