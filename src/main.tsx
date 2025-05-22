
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './ide-theme.css'

// Add a custom class to body for IDE-like styling
document.body.classList.add('windows-app');
document.body.classList.add('ide-theme');

createRoot(document.getElementById("root")!).render(<App />);
