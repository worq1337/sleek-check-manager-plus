
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add a custom class to body for Windows styling
document.body.classList.add('windows-app');

createRoot(document.getElementById("root")!).render(<App />);
