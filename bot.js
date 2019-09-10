const fs = require("fs");
const login = require("facebook-chat-api");
var FormData = require('form-data');
var answeredThreads = {};
login({appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))}, (err, api) => {
 
    api.setOptions({
     selfListen: false,
        logLevel: "silent",
        updatePresence: false
    });
    if(err) return console.error(err);
    api.listen(function callback(err, message) {
        console.log(message.threadID);
        if(!answeredThreads.hasOwnProperty(message.threadID)){

            //Chức năng này dành cho người muốn bỏ qua ID nào đó
            // Tìm id ở đây https://findmyfbid.in/
            // Thêm 1 người vào chỉ cần thêm dấu ,"ID người"
            // Group cũng thế
            var blockUserIds =[];
            var blockGroupIds =[];
            var crushId ="100004326754690";
            var myLoveId ="100038833934028";


            if(blockUserIds.find(x=>x ==message.threadID)){
                return console.error("block ID: "+ message.threadID);
            }

            if(blockGroupIds.find(x=>x == message.threadID)){
                return console.error("block GroupId: " + message.threadID);
            }

            //Chức năng này dành cho người muốn nhắn riêng với id nào đó
            switch(message.threadID){
                case crushId:
                        api.sendMessage("Chào Đạt", message.threadID);
                    break;
                case myLoveId:
                            api.sendMessage("Chào Luyến", message.threadID);
                        break;
            }
 


            answeredThreads[message.threadID] = true;
            api.sendMessage("BOT - Hiện tại CườngVjpPro không online, mình sẽ trả lời bạn ngay khi online, hoặc gọi cho mình: 034.338.2777", message.threadID);
       
       
       
        }
    });
 
});
