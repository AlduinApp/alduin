import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMemo, useReducer } from 'react';
import { BrowserRouter } from 'react-router-dom';

import CenterPanel from './components/CenterPanel';
import ThemeManager from './components/ThemeManager';
import { DispatchProvider } from './components/context/DispatchContext';
import { ViewProvider } from './components/context/ViewContext';
import FooterBar from './components/layout/FooterBar';
import WindowBar from './components/layout/WindowBar';
import Clock from './components/utils/Clock';
import LoadManager from './components/utils/LoadManager';
import { initialViewState, viewReducer } from './state/view/ViewReducer';

const queryClient = new QueryClient();

function App() {
  const [viewState, dispatchView] = useReducer(viewReducer, initialViewState);

  const dispatchers = useMemo(
    () => ({
      view: dispatchView,
    }),
    [],
  );

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ViewProvider value={viewState}>
          <DispatchProvider value={dispatchers}>
            <Clock />
            <LoadManager />
            <ThemeManager>
              <div className="flex flex-col h-screen text-neutral-800 dark:text-zinc-400 overflow-hidden">
                <WindowBar />
                <CenterPanel />
                <FooterBar />
              </div>
            </ThemeManager>
          </DispatchProvider>
        </ViewProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
