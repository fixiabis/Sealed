var MessageBox = (function () {
    var MessageBox = {
        show: function (className) {
            messageBox.className = "active " + className;
            return new Promise(function (resolve, reject) {
                messageAccept.onclick = resolve;
                messageReject.onclick = reject;
            });
        },
        hide: function () {
            messageBox.className = "";
        },
        now: function() {
            return messageBox.className.replace(/active /, "");
        }
    };
    
    var messageBox = document.getElementById("message-box");
    var messageAccept = document.getElementById("message-accept");
    var messageReject = document.getElementById("message-reject");

    messageAccept.addEventListener("click", MessageBox.hide);
    messageReject.addEventListener("click", MessageBox.hide);

    return MessageBox;
})();