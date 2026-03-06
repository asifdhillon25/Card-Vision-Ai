// src/components/cards/CardItem.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { getCardImagePath } from '../../utils/cardMapping'

const CardItem = ({ cardCode, index, totalCards, isRevealed = true }) => {
  // Calculate fan effect rotation
  const fanAngle = totalCards > 1 
    ? ((index / (totalCards - 1)) * 2 - 1) * 5 // -5deg to 5deg
    : 0

  // Get the correct image path based on card code
  const imagePath = getCardImagePath(cardCode)

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, rotate: -10 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        rotate: fanAngle,
        transition: { 
          delay: index * 0.1,
          type: "spring",
          stiffness: 200,
          damping: 20
        }
      }}
      whileHover={{ 
        y: -20, 
        scale: 1.1,
        rotate: fanAngle * 0.5,
        transition: { type: "spring", stiffness: 400, damping: 10 }
      }}
      className="relative group"
      style={{ 
        zIndex: index,
        marginLeft: index > 0 ? '-40px' : '0',
        '@media (max-width: 640px)': {
          marginLeft: index > 0 ? '-20px' : '0'
        }
      }}
    >
      {/* Card glow effect */}
      <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Card image with correct path */}
      <motion.img
        src={imagePath}
        alt={`${cardCode} playing card`}
        className="relative w-card-width-sm md:w-card-width h-auto object-contain drop-shadow-2xl 
                   rounded-2xl border-2 border-transparent group-hover:border-primary/50 
                   transition-all duration-300"
        whileTap={{ scale: 0.95 }}
        onError={(e) => {
          console.error(`Failed to load image: ${imagePath}`)
          // Fallback to card back if image fails to load
          e.target.src = '/cards/backs/card-back.svg'
        }}
      />

      {/* Card label for mobile fallback */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/70 text-white text-xs 
                      px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity
                      md:hidden">
        {cardCode}
      </div>
    </motion.div>
  )
}

export default CardItem