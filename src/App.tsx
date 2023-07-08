import { useMemo, useReducer } from 'react';
import { BrowserRouter } from 'react-router-dom';

import CenterPanel from './components/CenterPanel';
import ThemeManager from './components/ThemeManager';
import { DataProvider } from './components/context/DataContext';
import { DispatchProvider } from './components/context/DispatchContext';
import { PreferenceProvider } from './components/context/PreferenceContext';
import { ViewProvider } from './components/context/ViewContext';
import FooterBar from './components/layout/FooterBar';
import WindowBar from './components/layout/WindowBar';
import BackupManager from './components/utils/BackupManager';
import Clock from './components/utils/Clock';
import {
  dataReducer,
  initialDataState as defaultDataState,
} from './state/data/DataReducer';
import {
  initialPreferenceState as defaultPreferenceState,
  preferenceReducer,
} from './state/preference/PreferenceReducer';
import { initialViewState, viewReducer } from './state/view/ViewReducer';

function App() {
  const [dataState, dispatchData] = useReducer(dataReducer, defaultDataState);
  const [preferenceState, dispatchPreference] = useReducer(
    preferenceReducer,
    defaultPreferenceState,
  );
  const [viewState, dispatchView] = useReducer(viewReducer, initialViewState);

  const dispatchers = useMemo(
    () => ({
      data: dispatchData,
      view: dispatchView,
      preference: dispatchPreference,
    }),
    [],
  );

  return (
    <BrowserRouter>
      <DataProvider value={dataState}>
        <PreferenceProvider value={preferenceState}>
          <ViewProvider value={viewState}>
            <DispatchProvider value={dispatchers}>
              <Clock />
              <BackupManager />
              <ThemeManager>
                <div className="flex flex-col h-screen text-neutral-800 dark:text-zinc-400 overflow-hidden">
                  <WindowBar />
                  <CenterPanel />
                  <FooterBar />
                </div>
              </ThemeManager>
            </DispatchProvider>
          </ViewProvider>
        </PreferenceProvider>
      </DataProvider>
    </BrowserRouter>
  );
}

export default App;
