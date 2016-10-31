class AddFeedModal {
    private static addFeedButton = document.querySelector("#add-feed-button");

    private static titleInput = document.querySelector("#feed-title-input") as HTMLInputElement;
    private static linkInput = document.querySelector("#feed-link-input") as HTMLInputElement;

    public static registerEvents(){
        this.addFeedButton.addEventListener("click", e => ModalManager.displayModal("#add-feed-modal"));
        document.querySelector("#add-feed-confirm").addEventListener("click", e => {
            communicator.addFeedRequest(AddFeedModal.titleInput.value, AddFeedModal.linkInput.value);
        });
    }
}