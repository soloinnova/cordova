/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

        var options={
            "android":{
                "senderID":"807412467094"
            },
            "ios":{
                "alert":"true"
                ,"badge":"true"
                ,"sound":"true"
            },
            "windows":{

            }
        };
        console.log('Divice is' + device);
        document.getElementById("devicePlatform").innerHTML = device.platform;
        document.getElementById("deviceName").innerHTML = device.name;
        document.getElementById("deviceFramework").innerHTML = device.cordova ? device.cordova:device.phonegap;

        var push = PushNotification.init(options);
        var registerWithPubnub = function(regID){
            var subscribe_key ="sub-c-665ef520-d9f5-11e5-9ce2-0619f8945a4f";
            var chanel_name = "cordova_push";
            var registrationType = "apn";
            if((device.platform != undefined) && (device.platform.toLowerCase() === 'android')){
                registrationType = "gmc";
            }
            var url="http://pubsub.pubnub.com/v1/sub-key" + subscribe_key + "/devices/" + regID + "?add=" + chanel_name + "&type=" + RegistrationType;
            $.get(url, function(data){
                document.getElementById('pubnubRegistrationStatus').innerHTML = "<p>" + data.registrationId + "</p>";
            });
        };

        push.on("registration", function(data){
            document.getElementById('registrationID').innerHTML ="<p>" + data.registrationId + "</p>";
            registerWithPubnub(data.registrationId);
        });

        push.on('notification', function(data){

            console.log('Notification event');
            console.log(JSON.stringify(data));
            var cards = document.getElementById("cards");
            var content = '<div class="row">' +
                    '<div class="col s12 m6">' +
                    ' <div class="card darken-1">' +
                    '  <div class="card-content black-text">'+
                    '   <span class="card-title black-text">'+ data.title +' </span>';
                    '   <p>' + data.message +'</p>' +
                    '  </div>'+
                    ' </div>'+
                    '</div>';
            cards.innerHTML += content;
        });

        push.on('error', function(e){
            console.log("push error");
            console.log(e);
        });



    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();