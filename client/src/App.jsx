// src/App.jsx
import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import HomePage from './pages/HomePage'
import ResultsPage from './pages/ResultsPage'
import AboutPage from './pages/AboutPage'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Container from './components/layout/Container'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-felt-dark to-background">
      <Header />
      <main className="flex-grow">
        <Container>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/results" element={<ResultsPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </AnimatePresence>
        </Container>
      </main>
      <Footer />
    </div>
  )
}

export default App