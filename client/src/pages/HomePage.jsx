// src/pages/HomePage.jsx - MODIFIED
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import { BsFillCameraFill } from 'react-icons/bs'
import UploadZone from '../components/ui/UploadZone'
import CameraCapture from '../components/camera/CameraCapture'
import Button from '../components/ui/Button'
import { useCardDetection } from '../hooks/useCardDetection'

const HomePage = () => {
  const { processImage, isProcessing } = useCardDetection() // Remove navigate from here
  const [isCameraOpen, setIsCameraOpen] = useState(false)

  const handleFileSelect = async (file) => {
    await processImage(file)
    // Navigation is now handled inside processImage
  }

  const handleCameraCapture = async (file) => {
    setIsCameraOpen(false)
    await processImage(file)
    // Navigation is now handled inside processImage
  }

  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            CardVision
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-foreground/70 max-w-2xl mx-auto">
          Instantly detect and identify playing cards using advanced AI
        </p>
        
        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {['Real-time Detection', 'Multiple Cards', 'High Accuracy'].map((feature, i) => (
            <motion.span
              key={feature}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="px-4 py-2 bg-card/50 backdrop-blur-sm border border-card-border rounded-full text-sm"
            >
              {feature}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Upload Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="w-full max-w-3xl"
      >
        <UploadZone 
          onFileSelect={handleFileSelect}
          isProcessing={isProcessing}
        />
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-12 flex flex-wrap justify-center gap-4"
      >
        <Button
          variant="outline"
          size="lg"
          onClick={() => setIsCameraOpen(true)}
          icon={BsFillCameraFill}
        >
          Open Camera
        </Button>
        
        <Button
          variant="ghost"
          size="lg"
          onClick={() => navigate('/about')}
          icon={FiArrowRight}
        >
          Learn More
        </Button>
      </motion.div>

      {/* Camera Modal */}
      <CameraCapture
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={handleCameraCapture}
      />

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>
    </div>
  )
}

export default HomePage