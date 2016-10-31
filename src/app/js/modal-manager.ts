class ModalManager {

    private static closeModalsButtons = document.querySelectorAll(".modal > .content > .close-modal-button");

    private static modals: { [str: string]: HTMLDivElement } = {};

    public static registerModal(id: string) {
        ModalManager.modals[id] = document.querySelector(id) as HTMLDivElement;
    }

    public static displayModal(id: string) {
        ModalManager.closeAll();
        ModalManager.modals[id].style.display = "block";
    }

    public static closeAll() {
        Object.keys(ModalManager.modals).forEach(modalId => {
            ModalManager.modals[modalId].style.display = "none";
        });
    }

    public static registerEvents(){

        for (let i = 0; i < this.closeModalsButtons.length; i++)
            this.closeModalsButtons.item(i).addEventListener("click", e => ModalManager.closeAll());

        AddFeedModal.registerEvents();
    }
}