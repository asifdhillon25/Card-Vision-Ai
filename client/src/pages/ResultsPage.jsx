// src/pages/ResultsPage.jsx - MODIFIED
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiDownload, FiRefreshCw } from 'react-icons/fi'
import { BsGrid3X3GapFill } from 'react-icons/bs'
import CardHand from '../components/cards/CardHand'
import Button from '../components/ui/Button'
import ErrorMessage from '../components/ui/ErrorMessage'
import { useCardDetection } from '../hooks/useCardDetection'

const ResultsPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { reset, processImage } = useCardDetection()
  
  // Get data from location state
  const cards = location.state?.cards || []
  const uploadedImage = location.state?.uploadedImage
  const error = location.state?.error
  const isProcessing = false // We're not processing on results page

  // If no state, redirect to home
  useEffect(() => {
    console.log('Results page - Location state:', location.state)
    console.log('Results page - Cards:', cards)
    
    if (!location.state) {
      navigate('/')
    }
  }, [location.state, navigate, cards.length])

  const handleRetry = async () => {
    if (uploadedImage) {
      // Convert preview URL back to file
      const response = await fetch(uploadedImage)
      const blob = await response.blob()
      const file = new File([blob], 'retry-image.jpg', { type: 'image/jpeg' })
      await processImage(file)
    }
  }

  const handleDownload = () => {
    const data = {
      cards,
      timestamp: new Date().toISOString(),
      totalCards: cards.length
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `card-detection-${new Date().getTime()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleNewDetection = () => {
    reset()
    navigate('/')
  }

  return (
    <div className="min-h-[calc(100vh-200px)] py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-8"
      >
        <Button
          variant="ghost"
          onClick={handleNewDetection}
          icon={FiArrowLeft}
        >
          New Detection
        </Button>

        <h1 className="font-display text-2xl md:text-3xl font-bold">
          Detection Results
        </h1>

        <Button
          variant="outline"
          onClick={handleDownload}
          icon={FiDownload}
          disabled={!cards.length}
        >
          Export
        </Button>
      </motion.div>

      {/* Preview Image */}
      {uploadedImage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8 relative group"
        >
          <div className="relative rounded-2xl overflow-hidden border border-card-border max-w-md mx-auto">
            <img 
              src={uploadedImage} 
              alt="Uploaded" 
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-center text-sm text-foreground/60 mt-2">
            Source Image
          </p>
        </motion.div>
      )}

      {/* Error State */}
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <ErrorMessage 
            message={error}
            onRetry={handleRetry}
            onDismiss={handleNewDetection}
          />
        </motion.div>
      )}

      {/* Cards Display */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 rounded-3xl blur-3xl" />
        
        {/* Card hand */}
        <CardHand cards={cards} isLoading={isProcessing} />

        {/* Stats */}
        {cards.length > 0 && !isProcessing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <StatCard 
              label="Total Cards" 
              value={cards.length} 
              icon={BsGrid3X3GapFill}
            />
            <StatCard 
              label="Unique Ranks" 
              value={new Set(cards.map(c => c.length === 3 ? '10' : c[0])).size}
            />
            <StatCard 
              label="Unique Suits" 
              value={new Set(cards.map(c => c.length === 3 ? c[2] : c[1])).size}
            />
            <StatCard 
              label="Detection Time" 
              value="~2.3s"
              suffix="avg"
            />
          </motion.div>
        )}
      </motion.div>

      {/* Retry Button */}
      {!error && cards.length === 0 && !isProcessing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-8"
        >
          <Button
            variant="primary"
            onClick={handleRetry}
            icon={FiRefreshCw}
          >
            Try Another Image
          </Button>
        </motion.div>
      )}
    </div>
  )
}

const StatCard = ({ label, value, icon: Icon, suffix = '' }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-card/50 backdrop-blur-sm border border-card-border rounded-2xl p-4"
  >
    <div className="flex items-center justify-between mb-2">
      <span className="text-foreground/60 text-sm">{label}</span>
      {Icon && <Icon className="w-4 h-4 text-primary" />}
    </div>
    <div className="flex items-baseline">
      <span className="font-display text-2xl font-bold">{value}</span>
      {suffix && <span className="text-foreground/60 text-sm ml-1">{suffix}</span>}
    </div>
  </motion.div>
)

export default ResultsPage