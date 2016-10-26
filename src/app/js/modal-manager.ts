class ModalManager {

    private static modals: { [str: string]: HTMLDivElement } = {};

    public static registerModal(id: string) {
        ModalManager.modals[id] = document.querySelector(id) as HTMLDivElement;
    }

    public static displayModal(id: string) {
        Object.keys(ModalManager.modals).forEach(modalId => {
            ModalManager.modals[modalId].style.display = "none";
        });
        ModalManager.modals[id].style.display = "block";
    }
}