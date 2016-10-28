class UiEvent {
    private body = document.querySelector("body");

    private addFeedButton = document.querySelector("#add-feed-button");
    private pinButton = document.querySelector("#pin-button");

    constructor() {
        this.addFeedButton.addEventListener("click", e => ModalManager.displayModal("#add-feed-modal"));

        this.pinButton.addEventListener("click", e => this.body.classList.toggle("pinned"));

    }
}