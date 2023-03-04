import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import NavBar from './NavBar';
import LivrosCadastro from './LivrosCadastro';
import ClienteCadastro from './ClienteCadastro';

import {BrowserRouter, Route, Routes} from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NavBar/>
      <BrowserRouter>
      <Routes>

        <Route key="aluguel" path= "/aluguel" element={<App/>}/>
        
        <Route key="livro" path= "/livro" element={<LivrosCadastro/>}/>

        <Route key="cliente" path= "/cliente" element={<ClienteCadastro/>}/>
       

    
      </Routes>
    </BrowserRouter>
    
  </React.StrictMode>
);
