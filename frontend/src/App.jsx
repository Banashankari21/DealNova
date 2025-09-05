// src/App.jsx

import React from 'react';
import AppRoutes from './routes/AppRoutes';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <main style={{ minHeight: '80vh' }}>
        <AppRoutes />
      </main>
      <Footer />
    </>
  );
}

export default App;
