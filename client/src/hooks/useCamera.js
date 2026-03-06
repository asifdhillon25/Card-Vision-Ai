// src/hooks/useCamera.js
import { useState, useRef, useCallback } from 'react'

export const useCamera = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [stream, setStream] = useState(null)
  const videoRef = useRef(null)

  const openCamera = useCallback(() => {
    setIsOpen(true)
  }, [])

  const closeCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
    }
    setIsOpen(false)
  }, [stream])

  const captureImage = useCallback(async () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas')
      canvas.width = videoRef.current.videoWidth
      canvas.height = videoRef.current.videoHeight
      canvas.getContext('2d').drawImage(videoRef.current, 0, 0)
      
      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' })
          resolve(file)
        }, 'image/jpeg', 0.9)
      })
    }
  }, [])

  return {
    isOpen,
    videoRef,
    openCamera,
    closeCamera,
    captureImage
  }
}