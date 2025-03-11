import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './styles/animations.css';
import './styles/transitions.css'; // Importer le nouveau fichier de transitions

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);