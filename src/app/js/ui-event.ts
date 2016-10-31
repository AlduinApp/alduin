class UiEvent {
    private body = document.querySelector("body");
    private pinButton = document.querySelector("#pin-button");

    constructor() {
        this.pinButton.addEventListener("click", e => this.body.classList.toggle("pinned"));
        ModalManager.registerEvents();
    }
}