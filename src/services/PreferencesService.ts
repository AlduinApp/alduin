import { preferences as preferencesStore } from './database/store';

export interface IPreferences {
  darkMode: boolean;
  showFeedIcons: boolean;
  showArticleThumbnails: boolean;
  autoStart: boolean;
  startMinimized: boolean;
}

const defaultPreferences: IPreferences = {
  darkMode: true,
  showFeedIcons: false,
  showArticleThumbnails: false,
  autoStart: true,
  startMinimized: false,
};

async function getPreferences() {
  console.log('getPreferences');

  return {
    ...defaultPreferences,
    ...Object.fromEntries(await preferencesStore.entries()),
  } as unknown as IPreferences;
}

async function setPreferences(preferences: IPreferences) {
  console.log('setPreferences');

  await preferencesStore.clear();
  for (const [key, value] of Object.entries(preferences)) {
    await preferencesStore.set(key, value);
  }

  await preferencesStore.save();
}

const PreferencesService = {
  getPreferences,
  setPreferences,
  defaultPreferences,
};

export default PreferencesService;
