class UiEvent {
    private addFeedButton = document.querySelector("#add-feed-button");

    constructor(){
        this.addFeedButton.addEventListener("click", e => ModalManager.displayModal("#add-feed-modal"));
    }
}