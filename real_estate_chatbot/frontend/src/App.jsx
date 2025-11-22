import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import { Container } from 'react-bootstrap';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="py-4">
          <Container>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </Container>
        </main>
        <footer className="bg-light py-4 mt-5">
          <Container>
            <div className="text-center text-muted">
              <p className="mb-0">
                &copy; {new Date().getFullYear()} RealEstate Analyzer. All rights reserved.
              </p>
              <p className="mb-0 small">
                Built with React, Django, and ❤️
              </p>
            </div>
          </Container>
        </footer>
      </div>
    </Router>
  );
}

export default App;