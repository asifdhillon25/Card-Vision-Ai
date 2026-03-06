// src/components/cards/CardHand.jsx
import React from 'react'
import { motion } from 'framer-motion'
import CardItem from './CardItem'
import CardSkeleton from './CardSkeleton'

const CardHand = ({ cards, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="flex flex-wrap justify-center items-center gap-4 p-8">
        {[...Array(5)].map((_, i) => (
          <CardSkeleton key={i} index={i} />
        ))}
      </div>
    )
  }

  if (!cards || cards.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16"
      >
        <div className="inline-block p-8 rounded-3xl bg-card/50 border border-card-border">
          <p className="text-foreground/60 text-lg">
            No cards detected. Try another image.
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="relative py-12 px-4 overflow-x-auto">
      {/* Table felt background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-felt-green/20 via-transparent to-felt-green/20" />
      
      {/* Card hand container */}
      <div className="relative flex justify-center items-end min-h-[300px] md:min-h-[400px]">
        {cards.map((card, index) => (
          <CardItem
            key={`${card}-${index}`}
            cardCode={card}
            index={index}
            totalCards={cards.length}
          />
        ))}
      </div>

      {/* Hand count badge */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute top-0 right-4 bg-card border border-card-border rounded-full px-4 py-2 shadow-lg"
      >
        <span className="text-sm font-medium">
          {cards.length} {cards.length === 1 ? 'Card' : 'Cards'}
        </span>
      </motion.div>
    </div>
  )
}

export default CardHand