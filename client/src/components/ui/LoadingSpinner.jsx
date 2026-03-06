// src/components/ui/LoadingSpinner.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { GiSpades, GiHearts, GiClubs, GiDiamonds } from 'react-icons/gi'

const LoadingSpinner = ({ size = 'md', text = 'Processing...' }) => {
  const sizes = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  }

  const suits = [
    { Icon: GiSpades, color: 'text-suit-spades', delay: 0 },
    { Icon: GiHearts, color: 'text-suit-hearts', delay: 0.2 },
    { Icon: GiClubs, color: 'text-suit-clubs', delay: 0.4 },
    { Icon: GiDiamonds, color: 'text-suit-diamonds', delay: 0.6 }
  ]

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <div className={`relative ${sizes[size]}`}>
        {/* Rotating circle */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-muted border-t-primary"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Suit icons */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="grid grid-cols-2 gap-1">
            {suits.map(({ Icon, color, delay }) => (
              <motion.div
                key={color}
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  duration: 2,
                  delay,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Icon className={`w-6 h-6 ${color}`} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-foreground/70 font-medium"
      >
        {text}
      </motion.p>

      {/* Progress dots */}
      <div className="flex space-x-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-primary"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 1,
              delay: i * 0.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default LoadingSpinner