// src/services/api.js
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds for ML processing
})

export const detectCards = async (imageFile) => {
  const formData = new FormData()
  formData.append('file', imageFile)

  try {
    const response = await api.post('/detect', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    console.log('API response:', response.data)
    return response.data
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Server error')
    } else if (error.request) {
      throw new Error('No response from server. Please check your connection.')
    } else {
      throw new Error('Failed to send request')
    }
  }
}

// Mock API for development (remove when backend is ready)
export const mockDetectCards = async (imageFile) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Return mock data
  return {
    cards: ['AS', 'KH', 'QD', '10C', '2H']
  }
}