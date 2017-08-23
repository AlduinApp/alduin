export function saveSettings(settings){
    return {
        type: 'SET_SETTINGS',
        payload: settings
    }
}