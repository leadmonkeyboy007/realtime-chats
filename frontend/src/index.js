import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';

import { AuthContextProvider } from "./context/AuthContext";

import App from './App'

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </StrictMode>,
);