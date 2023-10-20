import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListMessageComponent from './components/ListMessageComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateMessageComponent from './components/CreateMessageComponent';
import ViewMessageComponent from './components/ViewMessageComponent';

function App() {

  return (
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListMessageComponent />} />
          <Route path="/Messages" element={<ListMessageComponent/>} />
          <Route path="/add-Message/:id" element={<CreateMessageComponent />} />
          <Route path="/view-Message/:id" element={<ViewMessageComponent />} />
        </Routes>
      </BrowserRouter>
  
    
  );
}

export default App; 