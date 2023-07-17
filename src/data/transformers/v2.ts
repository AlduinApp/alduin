import { DataBackup, PreferenceBackup } from '../Backup';

export default {
  data: (backup: DataBackup) => {
    return {
      ...backup,
      state: {
        ...backup.state,
        feeds: backup.state.feeds.map((feed) => ({
          ...feed,
          image: null,
        })),
      },
    };
  },
  preference: (backup: PreferenceBackup) => {
    return {
      ...backup,
      state: {
        ...backup.state,
        showFeedIcons: true,
      },
    };
  },
};
