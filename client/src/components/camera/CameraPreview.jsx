// src/components/camera/CameraPreview.jsx
import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BsCheckLg, 
  BsArrowRepeat, 
  BsXLg,
  BsCamera,
  BsCameraVideo,
  BsCameraVideoOff,
  BsBrightnessHigh,
  BsBrightnessAltHigh
} from 'react-icons/bs'
import { FiCamera, FiRotateCw } from 'react-icons/fi'
import { MdFlipCameraIos, MdOutlineFlashOn, MdOutlineFlashOff } from 'react-icons/md'
import Button from '../ui/Button'

const CameraPreview = ({ 
  stream, 
  onCapture, 
  onClose, 
  onFlip,
  facingMode = 'environment',
  isActive = true 
}) => {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [isCameraReady, setIsCameraReady] = useState(false)
  const [capturedImage, setCapturedImage] = useState(null)
  const [isFlashOn, setIsFlashOn] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [torchSupported, setTorchSupported] = useState(false)
  const [gridOverlay, setGridOverlay] = useState(false)
  const [countdown, setCountdown] = useState(null)
  const [aspectRatio, setAspectRatio] = useState('16/9')

  // Initialize video stream
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream
      
      // Check if torch mode is supported
      const track = stream.getVideoTracks()[0]
      const capabilities = track.getCapabilities?.()
      if (capabilities && capabilities.torch) {
        setTorchSupported(true)
      }
    }
  }, [stream])

  // Handle video ready
  const handleVideoReady = () => {
    setIsCameraReady(true)
    if (videoRef.current) {
      // Set aspect ratio based on video dimensions
      const { videoWidth, videoHeight } = videoRef.current
      setAspectRatio(`${videoWidth}/${videoHeight}`)
    }
  }

  // Toggle flash/torch
  const toggleFlash = async () => {
    if (stream && torchSupported) {
      const track = stream.getVideoTracks()[0]
      try {
        await track.applyConstraints({
          advanced: [{ torch: !isFlashOn }]
        })
        setIsFlashOn(!isFlashOn)
      } catch (err) {
        console.error('Flash toggle failed:', err)
      }
    }
  }

  // Capture image with countdown
  const startCapture = () => {
    setCountdown(3)
  }

  useEffect(() => {
    if (countdown === null) return

    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else if (countdown === 0) {
      captureImage()
      setCountdown(null)
    }
  }, [countdown])

  // Capture image
  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      
      // Apply zoom if needed
      if (zoomLevel > 1) {
        const scaledWidth = video.videoWidth / zoomLevel
        const scaledHeight = video.videoHeight / zoomLevel
        const offsetX = (video.videoWidth - scaledWidth) / 2
        const offsetY = (video.videoHeight - scaledHeight) / 2
        
        context.drawImage(
          video, 
          offsetX, offsetY, scaledWidth, scaledHeight,
          0, 0, canvas.width, canvas.height
        )
      } else {
        context.drawImage(video, 0, 0, canvas.width, canvas.height)
      }
      
      // Apply flash effect if enabled
      if (isFlashOn) {
        context.fillStyle = 'rgba(255, 255, 255, 0.3)'
        context.fillRect(0, 0, canvas.width, canvas.height)
      }
      
      // Convert to base64
      const imageData = canvas.toDataURL('image/jpeg', 0.95)
      setCapturedImage(imageData)
    }
  }

  // Retake photo
  const retakePhoto = () => {
    setCapturedImage(null)
  }

  // Confirm and use photo
  const confirmPhoto = () => {
    if (capturedImage) {
      fetch(capturedImage)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], 'camera-capture.jpg', { 
            type: 'image/jpeg',
            lastModified: Date.now()
          })
          onCapture(file)
        })
    }
  }

  // Adjust zoom
  const handleZoom = (direction) => {
    setZoomLevel(prev => {
      const newZoom = direction === 'in' ? prev + 0.1 : prev - 0.1
      return Math.min(Math.max(newZoom, 1), 3)
    })
  }

  if (!isActive) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-2 sm:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-5xl rounded-3xl overflow-hidden bg-card border border-card-border shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center p-3 sm:p-4 bg-gradient-to-b from-black/80 via-black/50 to-transparent">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm">
              <BsCamera className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs sm:text-sm text-white font-medium">
                {facingMode === 'environment' ? 'Rear' : 'Front'} Camera
              </span>
            </div>
            {torchSupported && (
              <button
                onClick={toggleFlash}
                className={`p-2 rounded-full transition-all ${
                  isFlashOn 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-black/50 text-white hover:bg-black/70'
                }`}
                aria-label="Toggle flash"
              >
                {isFlashOn ? (
                  <MdOutlineFlashOn className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <MdOutlineFlashOff className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </button>
            )}
          </div>
          
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all hover:scale-110"
            aria-label="Close camera"
          >
            <BsXLg className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Camera View */}
        <div 
          className="relative bg-black"
          style={{ aspectRatio }}
        >
          {!capturedImage ? (
            <>
              {/* Live Video */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                onCanPlay={handleVideoReady}
                className="w-full h-full object-cover"
                style={{ transform: facingMode === 'user' ? 'scaleX(-1)' : 'none' }}
              />

              {/* Grid Overlay */}
              {gridOverlay && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="w-full h-full grid grid-cols-3 grid-rows-3">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="border border-white/20" />
                    ))}
                  </div>
                </div>
              )}

              {/* Focus Indicator */}
              {isCameraReady && (
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                           w-16 h-16 sm:w-20 sm:h-20 border-2 border-primary rounded-2xl"
                />
              )}

              {/* Countdown Overlay */}
              <AnimatePresence>
                {countdown !== null && countdown > 0 && (
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.5, opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                  >
                    <span className="text-8xl sm:text-9xl font-bold text-primary">
                      {countdown}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Zoom Indicator */}
              {zoomLevel > 1 && (
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 
                              px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm">
                  <span className="text-white text-sm">
                    {zoomLevel.toFixed(1)}x
                  </span>
                </div>
              )}
            </>
          ) : (
            /* Captured Image Preview */
            <>
              <img 
                src={capturedImage} 
                alt="Captured preview" 
                className="w-full h-full object-contain"
              />
              
              {/* Preview Controls */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                <div className="flex justify-center gap-3">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={retakePhoto}
                    icon={BsArrowRepeat}
                    className="bg-black/50 backdrop-blur-sm border-white/20 hover:bg-black/70"
                  >
                    Retake
                  </Button>
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={confirmPhoto}
                    icon={BsCheckLg}
                  >
                    Use Photo
                  </Button>
                </div>
              </div>
            </>
          )}

          {/* Hidden canvas for capture */}
          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Bottom Controls */}
        {!capturedImage && (
          <div className="p-4 sm:p-6 bg-card/95 backdrop-blur-sm border-t border-card-border">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Left Controls - Zoom & Grid */}
              <div className="flex items-center gap-2 order-2 sm:order-1">
                <button
                  onClick={() => handleZoom('out')}
                  disabled={zoomLevel <= 1}
                  className="p-2 sm:p-3 rounded-full bg-card-hover hover:bg-primary/20 
                           disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  aria-label="Zoom out"
                >
                  <BsBrightnessAltHigh className="w-4 h-4 sm:w-5 sm:h-5 rotate-180" />
                </button>
                
                <span className="text-sm font-mono w-12 text-center">
                  {zoomLevel.toFixed(1)}x
                </span>
                
                <button
                  onClick={() => handleZoom('in')}
                  disabled={zoomLevel >= 3}
                  className="p-2 sm:p-3 rounded-full bg-card-hover hover:bg-primary/20 
                           disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  aria-label="Zoom in"
                >
                  <BsBrightnessAltHigh className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <button
                  onClick={() => setGridOverlay(!gridOverlay)}
                  className={`p-2 sm:p-3 rounded-full transition-all ${
                    gridOverlay 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-card-hover hover:bg-primary/20'
                  }`}
                  aria-label="Toggle grid"
                >
                  <BsGrid3X3GapFill className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Center - Capture Button */}
              <div className="order-1 sm:order-2">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={startCapture}
                  disabled={!isCameraReady}
                  className="relative group"
                >
                  {/* Outer ring */}
                  <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse" />
                  
                  {/* Button */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full 
                                bg-gradient-to-br from-primary to-secondary
                                shadow-lg shadow-primary/30
                                flex items-center justify-center
                                border-4 border-white/20
                                group-hover:scale-110 transition-transform
                                disabled:opacity-50 disabled:cursor-not-allowed">
                    <FiCamera className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground" />
                  </div>

                  {/* Inner glow */}
                  <div className="absolute inset-2 rounded-full bg-white/20 
                                group-hover:bg-white/30 transition-colors" />
                </motion.button>
              </div>

              {/* Right Controls - Flip & Settings */}
              <div className="flex items-center gap-2 order-3">
                <button
                  onClick={onFlip}
                  className="p-2 sm:p-3 rounded-full bg-card-hover hover:bg-primary/20 transition-all"
                  aria-label="Flip camera"
                >
                  <MdFlipCameraIos className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <button
                  onClick={() => {/* Additional settings */}}
                  className="p-2 sm:p-3 rounded-full bg-card-hover hover:bg-primary/20 transition-all"
                  aria-label="Settings"
                >
                  <FiRotateCw className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <div className="hidden sm:block w-20" /> {/* Spacer for balance */}
              </div>
            </div>

            {/* Instructions */}
            <div className="text-center mt-4 text-xs sm:text-sm text-foreground/50">
              <p className="inline-block px-3 py-1 rounded-full bg-black/20">
                Position cards clearly in frame • Tap to capture
              </p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {!isCameraReady && !capturedImage && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-muted border-t-primary rounded-full animate-spin mx-auto mb-4" />
              <p className="text-foreground/70">Initializing camera...</p>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default CameraPreview