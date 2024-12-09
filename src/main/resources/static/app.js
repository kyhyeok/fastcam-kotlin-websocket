/**
 * StompJs 클라이언트 생성
 * @type {StompJs.Client}
 */
const stompClient = new StompJs.Client({
    brokerURL: "ws://localhost:8080/hello-websocket-chatting",
    reconnectDelay: 200,
});

stompClient.onConnect = (frame) => {
    setConnected(true)
    console.log('Connected: ' + frame);
    stompClient.subscribe("/topic/chatting", (received_message) => {
        console.log("> Received message: " + received_message.body);
        showChatting(JSON.parse(received_message.body).content)
    });
};
stompClient.onWebSocketError = (error) => {
    console.error("Error with websocket:", error);
};
stompClient.onStompError = (frame) => {
    console.error("Broker reported error: " + frame.headers["message"]);
    console.error("Additional details: " + frame.body);
}

const setConnected = (connected) => {
    jQuery("#connect").prop("disabled", connected);
    jQuery("#disconnect").prop("disabled", !connected);
    jQuery("#chatting").html("");
    if (connected) {
        jQuery("#chatting").append("<tr><td>>>> Connected Chatting Server!!!</td></tr>");
        jQuery("#conversation").show();
    } else {
        jQuery("#conversation").hide();
    }
}

const connect = () => {
    stompClient.activate();
}

const disconnect = () => {
    stompClient.deactivate();
    setConnected(false);
    console.log("Disconnected");
}

const sendMessage = () => {
    console.log("> Send message : " + jQuery("#chatting-message").val());
    stompClient.publish({
        destination: "/app/chatting-message",
        body: JSON.stringify({"message": jQuery("#chatting-message").val()})
    });
}

const showChatting = (message) => {
    jQuery("#chatting").append("<tr><td>" + message + "</td></tr>");
}

jQuery(function() {
    jQuery("#form").on("submit", (e) => e.preventDefault())
    jQuery("#connect").click(() => connect());
    jQuery("#disconnect").click(() => disconnect());
    jQuery("#send").click(() => sendMessage());
})