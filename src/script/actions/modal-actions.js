import AddFeedModal from '../containers/modals/add-feed-modal.jsx'

export function openAddFeedModal() {
    return {
        type: 'OPEN_MODAL',
        payload: {
            type: AddFeedModal
        }
    }
}

export function closeCurrentModal() {
    return {
        type: 'CLOSE_MODAL'
    }
}