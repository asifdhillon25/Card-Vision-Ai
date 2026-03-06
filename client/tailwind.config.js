// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base colors - elegant dark theme for gaming atmosphere
        border: "hsl(220 13% 18%)",
        input: "hsl(220 13% 22%)",
        ring: "hsl(45 93% 58%)", // Warm gold for focus rings
        background: "hsl(220 25% 8%)", // Deep charcoal with slight blue
        foreground: "hsl(210 20% 98%)", // Almost white
        
        // Primary - Rich gold for main actions
        primary: {
          DEFAULT: "hsl(45 93% 58%)",
          foreground: "hsl(220 25% 10%)",
          50: "hsl(45 93% 95%)",
          100: "hsl(45 93% 90%)",
          200: "hsl(45 93% 80%)",
          300: "hsl(45 93% 70%)",
          400: "hsl(45 93% 64%)",
          500: "hsl(45 93% 58%)",
          600: "hsl(45 93% 48%)",
          700: "hsl(45 93% 38%)",
          800: "hsl(45 93% 28%)",
          900: "hsl(45 93% 18%)",
        },
        
        // Secondary - Deep purple for accents
        secondary: {
          DEFAULT: "hsl(260 60% 55%)",
          foreground: "hsl(210 20% 98%)",
          50: "hsl(260 60% 95%)",
          100: "hsl(260 60% 90%)",
          200: "hsl(260 60% 80%)",
          300: "hsl(260 60% 70%)",
          400: "hsl(260 60% 62%)",
          500: "hsl(260 60% 55%)",
          600: "hsl(260 60% 45%)",
          700: "hsl(260 60% 35%)",
          800: "hsl(260 60% 25%)",
          900: "hsl(260 60% 15%)",
        },
        
        // Destructive - Vibrant red for errors
        destructive: {
          DEFAULT: "hsl(350 89% 60%)",
          foreground: "hsl(210 20% 98%)",
          50: "hsl(350 89% 95%)",
          100: "hsl(350 89% 90%)",
          200: "hsl(350 89% 80%)",
          300: "hsl(350 89% 70%)",
          400: "hsl(350 89% 65%)",
          500: "hsl(350 89% 60%)",
          600: "hsl(350 89% 50%)",
          700: "hsl(350 89% 40%)",
          800: "hsl(350 89% 30%)",
          900: "hsl(350 89% 20%)",
        },
        
        // Muted - Subtle grays for backgrounds
        muted: {
          DEFAULT: "hsl(220 13% 18%)",
          foreground: "hsl(220 10% 70%)",
          50: "hsl(220 13% 95%)",
          100: "hsl(220 13% 85%)",
          200: "hsl(220 13% 70%)",
          300: "hsl(220 13% 55%)",
          400: "hsl(220 13% 35%)",
          500: "hsl(220 13% 25%)",
          600: "hsl(220 13% 18%)",
          700: "hsl(220 13% 14%)",
          800: "hsl(220 13% 10%)",
          900: "hsl(220 13% 6%)",
        },
        
        // Accent - Emerald green for success states
        accent: {
          DEFAULT: "hsl(160 84% 55%)",
          foreground: "hsl(220 25% 10%)",
          50: "hsl(160 84% 95%)",
          100: "hsl(160 84% 90%)",
          200: "hsl(160 84% 80%)",
          300: "hsl(160 84% 70%)",
          400: "hsl(160 84% 62%)",
          500: "hsl(160 84% 55%)",
          600: "hsl(160 84% 45%)",
          700: "hsl(160 84% 35%)",
          800: "hsl(160 84% 25%)",
          900: "hsl(160 84% 15%)",
        },
        
        // Card backgrounds - Subtle gradients for cards
        card: {
          DEFAULT: "hsl(220 20% 12%)",
          foreground: "hsl(210 20% 98%)",
          hover: "hsl(220 20% 16%)",
          border: "hsl(220 13% 22%)",
        },
        
        // Popover backgrounds
        popover: {
          DEFAULT: "hsl(220 20% 10%)",
          foreground: "hsl(210 20% 98%)",
        },
        
        // Status colors
        success: {
          DEFAULT: "hsl(160 84% 55%)",
          foreground: "hsl(220 25% 10%)",
        },
        warning: {
          DEFAULT: "hsl(45 93% 58%)",
          foreground: "hsl(220 25% 10%)",
        },
        info: {
          DEFAULT: "hsl(200 98% 60%)",
          foreground: "hsl(220 25% 10%)",
        },
        
        // Game-specific card suit colors
        suit: {
          hearts: "hsl(350 89% 60%)",
          diamonds: "hsl(45 93% 58%)",
          clubs: "hsl(160 84% 55%)",
          spades: "hsl(220 10% 70%)",
        },
        
        // Table felt gradient colors (for background)
        felt: {
          green: "hsl(150 50% 12%)",
          dark: "hsl(220 25% 6%)",
        },
      },
      
      // Border radius - Slightly larger for modern look
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.375rem",
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      
      // Font families
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'], // For headings
        mono: ['JetBrains Mono', 'monospace'], // For any code if needed
      },
      
      // Spacing scale - Fine-tuned for card layouts
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
        'card-width': '225px', // Standard card width
        'card-height': '315px', // Standard card height (1.4 ratio)
        'card-width-sm': '180px',
        'card-height-sm': '252px',
        'card-width-lg': '270px',
        'card-height-lg': '378px',
      },
      
      // Box shadows - Layered for depth
      boxShadow: {
        'card': '0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 215, 0, 0.1)',
        'card-hover': '0 20px 30px -10px rgba(0, 0, 0, 0.6), 0 0 0 2px rgba(255, 215, 0, 0.3)',
        'card-selected': '0 0 0 3px hsl(45 93% 58%), 0 20px 30px -10px rgba(0, 0, 0, 0.6)',
        'elevated': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        'glow': '0 0 20px rgba(255, 215, 0, 0.3)',
        'inner-light': 'inset 0 1px 1px rgba(255, 255, 255, 0.05)',
      },
      
      // Background images - For table felt texture
      backgroundImage: {
        'felt-pattern': "radial-gradient(circle at 25% 30%, rgba(0, 100, 0, 0.1) 0%, transparent 30%), repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.02) 0px, rgba(0, 0, 0, 0.02) 2px, transparent 2px, transparent 4px)",
        'card-gradient': 'linear-gradient(135deg, hsl(220 20% 14%) 0%, hsl(220 20% 10%) 100%)',
      },
      
      // Keyframes for animations
      keyframes: {
        "accordion-down": {
          from: { height: 0, opacity: 0 },
          to: { height: "var(--radix-accordion-content-height)", opacity: 1 },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)", opacity: 1 },
          to: { height: 0, opacity: 0 },
        },
        "fade-in": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        "fade-in-up": {
          from: { opacity: 0, transform: "translateY(20px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        "fade-in-down": {
          from: { opacity: 0, transform: "translateY(-20px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        "slide-in": {
          from: { transform: "translateX(-10px)", opacity: 0 },
          to: { transform: "translateX(0)", opacity: 1 },
        },
        "scale-in": {
          from: { transform: "scale(0.95)", opacity: 0 },
          to: { transform: "scale(1)", opacity: 1 },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-5px)" },
        },
        "pulse-glow": {
          "0%, 100%": { 
            boxShadow: "0 0 0 0 rgba(255, 215, 0, 0.3)",
            borderColor: "rgba(255, 215, 0, 0.3)"
          },
          "50%": { 
            boxShadow: "0 0 20px 5px rgba(255, 215, 0, 0.5)",
            borderColor: "rgba(255, 215, 0, 0.8)"
          },
        },
        "card-deal": {
          "0%": { 
            opacity: 0,
            transform: "translateY(-100px) rotate(-10deg) scale(0.5)"
          },
          "100%": { 
            opacity: 1,
            transform: "translateY(0) rotate(0) scale(1)"
          },
        },
        "hand-fan": {
          "0%": { 
            transform: "rotate(var(--rotate-start, -5deg)) translateX(0)"
          },
          "100%": { 
            transform: "rotate(var(--rotate-end, 5deg)) translateX(0)"
          },
        },
      },
      
      // Animation utilities
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "fade-in-up": "fade-in-up 0.4s ease-out",
        "fade-in-down": "fade-in-down 0.4s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        "float": "float 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "card-deal": "card-deal 0.4s ease-out forwards",
        "hand-fan": "hand-fan 0.5s ease-out forwards",
      },
      
      // Z-index scale
      zIndex: {
        'card': '10',
        'card-hover': '20',
        'modal': '100',
        'tooltip': '50',
        'overlay': '40',
      },
      
      // Transition timing functions
      transitionTimingFunction: {
        'bounce-soft': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'card-hover': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
    },
  },
  
  // Responsive breakpoints (mobile-first)
  screens: {
    'xs': '475px',
    'sm': '640px',
    'md': '768px',
    'lg': '1024px',
    'xl': '1280px',
    '2xl': '1536px',
  },
  
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class', // Only generate classes
    }),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}