import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'; // Import your main App component
import './index.css'; // Import your global CSS styles
import { Provider } from 'react-redux'; // Import the Provider from react-redux
import store from './store.js'; // Import the configured Redux store

// Create the root and render the application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}> {/* Wrap your App component with Provider */}
      <App />
    </Provider>
  </React.StrictMode>,
);

