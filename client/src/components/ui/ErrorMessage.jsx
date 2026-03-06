// src/components/ui/ErrorMessage.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { FiAlertCircle, FiXCircle } from 'react-icons/fi'
import Button from './Button'

const ErrorMessage = ({ 
  message, 
  onRetry, 
  onDismiss,
  variant = 'error' 
}) => {
  const variants = {
    error: {
      icon: FiXCircle,
      bg: 'bg-destructive/10',
      border: 'border-destructive/30',
      text: 'text-destructive',
      button: 'destructive'
    },
    warning: {
      icon: FiAlertCircle,
      bg: 'bg-warning/10',
      border: 'border-warning/30',
      text: 'text-warning',
      button: 'warning'
    }
  }

  const { icon: Icon, bg, border, text, button } = variants[variant]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      className={`rounded-2xl ${bg} border ${border} p-6 max-w-md mx-auto`}
    >
      <div className="flex items-start space-x-4">
        <div className={`flex-shrink-0 ${text}`}>
          <Icon className="w-6 h-6" />
        </div>
        
        <div className="flex-1">
          <h3 className={`font-display font-semibold ${text} mb-2`}>
            {variant === 'error' ? 'Oops! Something went wrong' : 'Warning'}
          </h3>
          <p className="text-foreground/70 text-sm mb-4">
            {message}
          </p>
          
          <div className="flex space-x-3">
            {onRetry && (
              <Button
                variant={button}
                size="sm"
                onClick={onRetry}
              >
                Try Again
              </Button>
            )}
            {onDismiss && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onDismiss}
              >
                Dismiss
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-destructive/5 to-transparent rounded-full blur-2xl" />
    </motion.div>
  )
}

export default ErrorMessage