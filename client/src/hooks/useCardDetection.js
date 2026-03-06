// src/hooks/useCardDetection.js - MODIFIED
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { detectCards } from '../services/api'
import toast from 'react-hot-toast'

export const useCardDetection = () => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [cards, setCards] = useState([])
  const [error, setError] = useState(null)
  const [uploadedImage, setUploadedImage] = useState(null)
  const navigate = useNavigate()

  const processImage = async (imageFile) => {
    setIsProcessing(true)
    setError(null)
    
    // Create preview URL
    const previewUrl = URL.createObjectURL(imageFile)
    setUploadedImage(previewUrl)

    try {
      const result = await detectCards(imageFile)
      console.log('Detection result:', result)
      
      if (result.cards && result.cards.length > 0) {
        setCards(result.cards)
        toast.success(`Detected ${result.cards.length} cards!`)
        
        // Navigate to results with the cards data
        navigate('/results', { 
          state: { 
            cards: result.cards,
            uploadedImage: previewUrl,
            fromUpload: true 
          }
        })
      } else {
        setError('No cards detected in the image')
        toast.error('No cards detected')
        // Still navigate but with empty cards
        navigate('/results', { 
          state: { 
            cards: [],
            uploadedImage: previewUrl,
            error: 'No cards detected in the image'
          }
        })
      }
    } catch (err) {
      setError(err.message || 'Failed to process image')
      toast.error('Detection failed')
      navigate('/results', { 
        state: { 
          error: err.message || 'Failed to process image',
          uploadedImage: previewUrl 
        }
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const reset = () => {
    setCards([])
    setError(null)
    setUploadedImage(null)
    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage)
    }
  }

  return {
    isProcessing,
    cards,
    error,
    uploadedImage,
    processImage,
    reset
  }
}