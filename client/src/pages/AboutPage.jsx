// src/pages/AboutPage.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { 
  GiArtificialIntelligence, 
  GiBrain, 
  GiSpeedometer,
  GiCardPick,
  GiSpades,
  GiHearts,
  GiClubs,
  GiDiamonds
} from 'react-icons/gi'
import { FiCpu, FiCamera, FiUploadCloud } from 'react-icons/fi'

const AboutPage = () => {
  const features = [
    {
      icon: GiArtificialIntelligence,
      title: 'Advanced AI',
      description: 'Powered by state-of-the-art deep learning models for accurate card detection',
      color: 'text-primary'
    },
    {
      icon: FiCamera,
      title: 'Multiple Inputs',
      description: 'Upload images or use your camera for real-time detection',
      color: 'text-secondary'
    },
    {
      icon: GiSpeedometer,
      title: 'Fast Processing',
      description: 'Get results in seconds with our optimized pipeline',
      color: 'text-success'
    },
    {
      icon: GiCardPick,
      title: '52 Card Support',
      description: 'Detects all standard playing cards with high accuracy',
      color: 'text-info'
    }
  ]

  const suits = [
    { Icon: GiSpades, name: 'Spades', color: 'text-suit-spades' },
    { Icon: GiHearts, name: 'Hearts', color: 'text-suit-hearts' },
    { Icon: GiClubs, name: 'Clubs', color: 'text-suit-clubs' },
    { Icon: GiDiamonds, name: 'Diamonds', color: 'text-suit-diamonds' }
  ]

  const stats = [
    { label: 'Cards Detected', value: '10K+', suffix: 'monthly' },
    { label: 'Accuracy Rate', value: '98.5', suffix: '%' },
    { label: 'Response Time', value: '2.3', suffix: 'seconds' },
    { label: 'Happy Users', value: '5K+', suffix: 'worldwide' }
  ]

  return (
    <div className="min-h-[calc(100vh-200px)] py-12">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
          About{' '}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            CardVision
          </span>
        </h1>
        <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
          Revolutionizing the way you identify playing cards with cutting-edge computer vision technology
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="bg-card/50 backdrop-blur-sm border border-card-border rounded-2xl p-6 text-center"
          >
            <div className="font-display text-3xl md:text-4xl font-bold text-primary mb-2">
              {stat.value}
            </div>
            <div className="text-sm text-foreground/60 mb-1">{stat.label}</div>
            <div className="text-xs text-foreground/40">{stat.suffix}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-card/30 backdrop-blur-sm border border-card-border rounded-2xl p-8"
          >
            <feature.icon className={`w-12 h-12 ${feature.color} mb-4`} />
            <h3 className="font-display text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-foreground/70">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* How it Works */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mb-16"
      >
        <h2 className="font-display text-3xl font-bold text-center mb-12">
          How It Works
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: 1, title: 'Upload', icon: FiUploadCloud, description: 'Upload an image or take a photo of your cards' },
            { step: 2, title: 'Process', icon: FiCpu, description: 'Our AI analyzes the image and detects each card' },
            { step: 3, title: 'Results', icon: GiCardPick, description: 'View your detected cards beautifully rendered' }
          ].map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="relative text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                <item.icon className="w-8 h-8" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center">
                {item.step}
              </div>
              <h3 className="font-display text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-foreground/70">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Suits Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-center"
      >
        <h2 className="font-display text-2xl font-bold mb-8">
          Supports All Four Suits
        </h2>
        <div className="flex justify-center space-x-8">
          {suits.map(({ Icon, name, color }) => (
            <motion.div
              key={name}
              whileHover={{ y: -5 }}
              className="text-center"
            >
              <Icon className={`w-12 h-12 ${color} mb-2 mx-auto`} />
              <span className="text-sm text-foreground/60">{name}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center mt-16"
      >
        <button
          onClick={() => navigate('/')}
          className="btn-primary text-lg px-12 py-4"
        >
          Try It Now
        </button>
      </motion.div>
    </div>
  )
}

export default AboutPage