const communicator = new Communicator();
(() => {
    new UiEvent();
    ModalManager.registerEvents();
    ModalManager.registerModal("add-feed-modal");
})();