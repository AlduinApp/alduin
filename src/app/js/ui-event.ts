class UiEvent {
    private addFeedButton = document.querySelector("#add-feed-button");
    private pinButton = document.querySelector("#pin-button");

    constructor(){
        this.addFeedButton.addEventListener("click", e => ModalManager.displayModal("#add-feed-modal"));

        // Pin button
        this.pinButton.addEventListener("click", e => {
            const body = document.querySelector("body");
            const classToCheck = "pinned";
            if(body.classList.contains(classToCheck)) {
                body.classList.remove(classToCheck);
            } else {
                body.classList.add(classToCheck);
            }
        });
    }
}