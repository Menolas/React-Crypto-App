import React from 'react';
import {CryptoContextProvider} from "./context/crypto-context.jsx";
import {AppLayout} from "./components/layout/AppLayout.jsx";

const App = () => {
  return (
      <CryptoContextProvider>
          <AppLayout />
      </CryptoContextProvider>
  )
};

export default App;
