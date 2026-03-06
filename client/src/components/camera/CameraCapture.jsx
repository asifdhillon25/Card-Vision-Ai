// src/components/camera/CameraCapture.jsx
import React, { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BsFillCameraFill, 
  BsArrowRepeat, 
  BsCheckLg,
  BsXLg 
} from 'react-icons/bs'
import { FiCamera, FiVideo, FiVideoOff } from 'react-icons/fi'
import Button from '../ui/Button'

const CameraCapture = ({ onCapture, onClose, isOpen }) => {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [stream, setStream] = useState(null)
  const [error, setError] = useState(null)
  const [isCameraReady, setIsCameraReady] = useState(false)
  const [capturedImage, setCapturedImage] = useState(null)
  const [facingMode, setFacingMode] = useState('environment')
  const [isFlashOn, setIsFlashOn] = useState(false)

  useEffect(() => {
    if (isOpen) {
      startCamera()
    }
    return () => {
      stopCamera()
    }
  }, [isOpen, facingMode])

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      })
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
      setError(null)
    } catch (err) {
      setError('Unable to access camera. Please check permissions.')
      console.error('Camera error:', err)
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
    }
    setIsCameraReady(false)
    setCapturedImage(null)
  }

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')
      
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      context.drawImage(video, 0, 0, canvas.width, canvas.height)
      
      // Simulate flash effect
      if (isFlashOn) {
        context.fillStyle = 'white'
        context.globalCompositeOperation = 'lighter'
        context.fillRect(0, 0, canvas.width, canvas.height)
      }
      
      const imageData = canvas.toDataURL('image/jpeg', 0.9)
      setCapturedImage(imageData)
    }
  }

  const retakePhoto = () => {
    setCapturedImage(null)
  }

  const confirmPhoto = () => {
    if (capturedImage) {
      // Convert base64 to file
      fetch(capturedImage)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' })
          onCapture(file)
        })
    }
  }

  const toggleCamera = () => {
    setFacingMode(prev => prev === 'environment' ? 'user' : 'environment')
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-3xl rounded-3xl overflow-hidden bg-card border border-card-border shadow-2xl"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-4 bg-gradient-to-b from-black/50 to-transparent">
            <h3 className="font-display font-semibold text-white">
              {capturedImage ? 'Preview' : 'Take a Photo'}
            </h3>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
            >
              <BsXLg className="w-5 h-5" />
            </button>
          </div>

          {/* Camera View */}
          <div className="relative aspect-video bg-black">
            {!capturedImage ? (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  onCanPlay={() => setIsCameraReady(true)}
                  className="w-full h-full object-cover"
                />
                
                {/* Camera overlay grid */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="w-full h-full grid grid-cols-3 grid-rows-3">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="border border-white/10" />
                    ))}
                  </div>
                </div>

                {/* Focus indicator */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-2 border-primary rounded-full"
                />

                {error && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                    <p className="text-destructive text-center px-4">{error}</p>
                  </div>
                )}
              </>
            ) : (
              <img 
                src={capturedImage} 
                alt="Captured" 
                className="w-full h-full object-contain"
              />
            )}

            {/* Hidden canvas for capture */}
            <canvas ref={canvasRef} className="hidden" />
          </div>

          {/* Controls */}
          <div className="p-6">
            {!capturedImage ? (
              <div className="flex justify-center items-center space-x-4">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={toggleCamera}
                  icon={BsArrowRepeat}
                  disabled={!isCameraReady}
                >
                  Flip
                </Button>
                
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={captureImage}
                  disabled={!isCameraReady || error}
                  className="relative w-16 h-16 rounded-full bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors group"
                >
                  <div className="absolute inset-2 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors" />
                  <FiCamera className="w-8 h-8 mx-auto text-white" />
                </motion.button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsFlashOn(!isFlashOn)}
                  icon={isFlashOn ? FiVideo : FiVideoOff}
                >
                  Flash
                </Button>
              </div>
            ) : (
              <div className="flex justify-center space-x-4">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={retakePhoto}
                  icon={BsArrowRepeat}
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
            )}
          </div>

          {/* Instructions */}
          <div className="absolute bottom-20 left-0 right-0 text-center text-white/60 text-sm">
            {!capturedImage && !error && (
              <p className="bg-black/50 px-4 py-2 rounded-full inline-block">
                Position cards clearly in frame
              </p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default CameraCapture