// src/components/cards/CardSkeleton.jsx
import React from 'react'
import { motion } from 'framer-motion'

const CardSkeleton = ({ index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative"
      style={{ marginLeft: index > 0 ? '-20px' : '0' }}
    >
      <div className="w-card-width-sm md:w-card-width h-[252px] md:h-[315px] 
                      bg-gradient-to-br from-card to-card-hover rounded-2xl 
                      border border-card-border overflow-hidden">
        {/* Animated shimmer effect */}
        <motion.div
          className="absolute inset-0 -translate-x-full"
          animate={{
            translateX: ['100%', '-100%']
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
            delay: index * 0.2
          }}
        >
          <div className="w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        </motion.div>

        {/* Card back pattern */}
        <div className="absolute inset-4 border-2 border-card-border/30 rounded-xl">
          <div className="absolute inset-2 grid grid-cols-2 gap-1 opacity-20">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-primary/30 rounded" />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default CardSkeleton