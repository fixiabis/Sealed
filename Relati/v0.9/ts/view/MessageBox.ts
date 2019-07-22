export namespace MessageBox {
    export let view: HTMLElement = document.getElementById("message-box") as HTMLElement;
    export let messageIcon: HTMLElement = document.getElementById("message-icon") as HTMLElement;
    export let messageContent: HTMLElement = document.getElementById("message-content") as HTMLElement;
    export let acceptButton: HTMLElement = document.getElementById("message-accept") as HTMLElement;
    export let rejectButton: HTMLElement = document.getElementById("message-reject") as HTMLElement;
    export let verifyButton: HTMLElement = document.getElementById("message-verify") as HTMLElement;

    export let isShow: boolean = false;

    export type MessageCallback = (result: string) => void;
    let callback: MessageCallback | null;

    export function show(type: string, message: string, response: MessageCallback | null) {
        view.className = type;
        messageContent.innerText = message;
        messageContent.style.display = message ? "" : "none";
        callback = response;
        isShow = true;
    }

    export function hide() {
        view.className = "none";
        isShow = false;
    }

    export function response(result: string) {
        if (callback) callback(result);
        callback = null;
        hide();
    }

    acceptButton.addEventListener("click", event => response("accept"));
    rejectButton.addEventListener("click", event => response("reject"));
    verifyButton.addEventListener("click", event => response("verify"));
}