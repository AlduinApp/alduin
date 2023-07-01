import { useMemo, useReducer } from 'react';
import { BrowserRouter } from 'react-router-dom';

import CenterPanel from './components/CenterPanel';
import FooterBar from './components/FooterBar';
import WindowBar from './components/WindowBar';
import { DataProvider } from './components/context/DataContext';
import { DispatchProvider } from './components/context/DispatchContext';
import { ViewProvider } from './components/context/ViewContext';
import { dataReducer, initialDataState } from './state/data/DataReducer';
import { initialViewState, viewReducer } from './state/view/ViewReducer';

function App() {
  const [dataState, dispatchData] = useReducer(dataReducer, initialDataState);
  const [viewState, dispatchView] = useReducer(viewReducer, initialViewState);

  const dispatchers = useMemo(
    () => ({ data: dispatchData, view: dispatchView }),
    [],
  );

  return (
    <BrowserRouter>
      <DataProvider value={dataState}>
        <ViewProvider value={viewState}>
          <DispatchProvider value={dispatchers}>
            <div className="flex flex-col h-screen text-zinc-400 overflow-hidden">
              <WindowBar />
              <CenterPanel />
              <FooterBar />
            </div>
          </DispatchProvider>
        </ViewProvider>
      </DataProvider>
    </BrowserRouter>
  );
}

export default App;
