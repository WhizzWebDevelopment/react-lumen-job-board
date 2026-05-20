import React from 'react';
import ReactDOM from 'react-dom';  // React 17 API — replaced by ReactDOM.createRoot() in React 18
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// React 17 entry point: ReactDOM.render() mounts the entire React tree
// into the real DOM node with id="root" (defined in public/index.html).
//
// React.StrictMode is a development-only wrapper (produces no DOM output)
// that activates extra runtime warnings:
//   - Double-invokes render/lifecycle functions to detect side effects
//   - Warns about deprecated APIs (e.g. legacy string refs, findDOMNode)
//   - Flags components with unsafe lifecycle methods
//
// NOTE: React 18 replaces this pattern with:
//   const root = ReactDOM.createRoot(document.getElementById('root'));
//   root.render(<React.StrictMode><App /></React.StrictMode>);
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// reportWebVitals measures real-user performance metrics:
//   CLS (Cumulative Layout Shift), FID (First Input Delay),
//   FCP (First Contentful Paint), LCP (Largest Contentful Paint), TTFB.
// Pass a callback to log results or send to an analytics endpoint.
// Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
