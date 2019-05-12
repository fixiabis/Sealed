let body: HTMLElement = document.getElementById("message-box") as HTMLElement;

export class MessageBoxView {
    constructor(public type: string) {
        body.className = type;
    }
}