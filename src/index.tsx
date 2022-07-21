import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IndvCountry from './IndvCountry';
// import theme from './types/theme';


// const lightTheme : theme = {
//   'color' : '#000',
//   'bg1' : '#f0e8e8',
//   'bg2' : '#fff',
//   'hover' : '#ddd'
// }    
// const darkTheme : theme = {
//   'color' : '#fff',
//   'bg1' : 'hsl(207, 26%, 17%)',
//   'bg2' : 'hsl(209, 23%, 22%)',
//   'hover' : '#4f6b83'
// }

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App msg='hola'/>}/>
      <Route path='/:name' element={<IndvCountry />}/>
    </Routes>
  </BrowserRouter>
);

