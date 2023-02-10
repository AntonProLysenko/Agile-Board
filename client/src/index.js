import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';
import Layout from './screens/layout/Layout';
import Show from './screens/Show';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App />
      {/* <Routes>
     
        <Route path="/" element={<Layout />}> {/*wrapping elements inside to apply for them default layout}
          <Route index element={<App />} /> {/*We need route with index for using outlet so the parent path shows element alocated in index route}
           <Route path=":id" element={<Show />} /> 
        </Route>  
      </Routes> */}
    </Router>
  </React.StrictMode>
);

