const fs = require("fs");
const login = require("facebook-chat-api");
var FormData = require('form-data');
// var answeredThreads = {};
login({appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))}, (err, api) => {
 
    api.setOptions({
        selfListen: false,
        logLevel: "silent",
        updatePresence: false,
        forceLogin: true
    });
    if(err) return console.error(err);
    var stopListening = api.listen((err, event) => {
        if(err) return console.error(err);

        switch(event.type) {
            case "message":
                if(event.body === '/stop') {
                    api.sendMessage("Goodbye...", event.threadID);
                    
                }
                api.markAsRead(event.threadID, (err) => {
                    if(err) console.log(err);
                });
                api.sendMessage(event.body, event.threadID);
                break;
            case "event":
                console.log(event);
                break;
        }
    });
    });
