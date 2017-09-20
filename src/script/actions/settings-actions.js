export function saveSettings(settings){
    console.log(settings)
    return {
        type: 'SET_SETTINGS',
        payload: settings
    }
}