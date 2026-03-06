// src/components/ui/Button.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { ClipLoader } from 'react-spinners'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading = false,
  disabled = false,
  onClick,
  className = '',
  type = 'button',
  icon: Icon,
  ...props 
}) => {
  const baseClasses = "inline-flex items-center justify-center font-display font-semibold rounded-xl transition-all duration-200 ease-bounce-soft focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
  
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg hover:shadow-xl",
    outline: "border-2 border-primary text-primary hover:bg-primary/10",
    ghost: "text-foreground/70 hover:text-foreground hover:bg-card-hover",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  }
  
  const sizes = {
    sm: "px-4 py-2 text-sm gap-2",
    md: "px-6 py-3 text-base gap-2.5",
    lg: "px-8 py-4 text-lg gap-3",
  }

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={!disabled && !isLoading ? { scale: 1.02 } : {}}
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${sizes[size]}
        ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      {...props}
    >
      {isLoading && (
        <ClipLoader size={size === 'sm' ? 16 : size === 'md' ? 20 : 24} color="currentColor" />
      )}
      {Icon && !isLoading && <Icon className={size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-6 h-6'} />}
      {children}
    </motion.button>
  )
}

export default Button