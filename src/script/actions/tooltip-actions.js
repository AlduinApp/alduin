export function setTooltip(message) {
  return {
    type: 'SET_TOOLTIP',
    payload: message
  }
}
export function resetTooltip() {
  return {
    type: 'SET_TOOLTIP',
    payload: ''
  }
}