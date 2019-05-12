import * as http from "http";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as socketIO from "socket.io";

var webServer = express();

webServer.use(bodyParser.urlencoded({ extended: true }));
webServer.use(bodyParser.json());
webServer.use(express.static("web"));
webServer.use("/base", express.static("base"));
webServer.use("/dist", express.static("dist"));

var server = new http.Server(webServer);

var socketServer = socketIO(server);
var socketClientInfo = {};

socketServer.on("connection", function (socketClient) {
    socketClientInfo[socketClient.id] = {
        "socket": socketClient
    };

    socketClient.on("update", function (name, value) {
        if (name === "socket") return; 
        socketClientInfo[socketClient.id][name] = value;
    });
});

server.listen(3000);