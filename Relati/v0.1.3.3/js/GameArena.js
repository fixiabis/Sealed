var GameArena = (function () {
    var socket;
    var playerId = "";

    return {
        link: function () {
            socket = io("https://gridboard.herokuapp.com");
            socket.on("user.leave", function () {
                playerId = "";
            });
        },
        leave: function () {
            if (socket.disconnected) return;
            socket.disconnect();
        },
        join: function (gameName, name, picUrl) {
            socket.disconnect();
            socket.connect();
            return new Promise(function (resolve, reject) {
                socket.emit("join", {
                    name: name,
                    picUrl: picUrl,
                    gameName: gameName
                });
                socket.on("matched", function (data) {
                    playerId = data.id;
                    resolve(data);
                });
            });
        },
        set: function (crd) {
            socket.emit("symbol.set", {
                id: playerId,
                crd: crd
            });
        },
        whenPlayerSet: function (execute) {
            socket.on("symbol.set", function (crd) {
                execute(crd);
            });
        },
        whenPlayerLeave: function (execute) {
            socket.on("user.leave", function () {
                playerId = "";
                execute();
            });
        },
        playerExist: function () {
            return playerId !== "";
        },
        whenGetLeaderboard: function () {
            return new Promise(function (resolve, reject) {
                socket.on("leaderboard", function (data) {
                    resolve(data);
                });
            });
        }
    };
})();
