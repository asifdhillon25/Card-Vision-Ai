// src/components/layout/Footer.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { 
  GiSpades, 
  GiHearts, 
  GiClubs, 
  GiDiamonds,
  GiCardPick 
} from 'react-icons/gi'
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  const suits = [
    { Icon: GiSpades, color: 'text-suit-spades' },
    { Icon: GiHearts, color: 'text-suit-hearts' },
    { Icon: GiClubs, color: 'text-suit-clubs' },
    { Icon: GiDiamonds, color: 'text-suit-diamonds' },
  ]

  return (
    <footer className="bg-card border-t border-card-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <GiCardPick className="w-6 h-6 text-primary" />
              <span className="font-display font-bold text-lg">CardVision</span>
            </div>
            <p className="text-foreground/60 text-sm max-w-md">
              Advanced playing card detection powered by cutting-edge machine learning. 
              Upload or capture images to instantly identify cards in your hand.
            </p>
            
            {/* Suit decoration */}
            <div className="flex space-x-2 mt-4">
              {suits.map(({ Icon, color }, index) => (
                <Icon 
                  key={index} 
                  className={`w-4 h-4 ${color} opacity-50 hover:opacity-100 transition-opacity`} 
                />
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-foreground/60 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-foreground/70 hover:text-primary text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-foreground/70 hover:text-primary text-sm transition-colors">
                  About
                </Link>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary text-sm transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary text-sm transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-foreground/60 mb-4">
              Connect
            </h3>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="p-2 rounded-lg bg-card-hover hover:bg-primary/10 text-foreground/70 hover:text-primary transition-all hover:scale-110"
                aria-label="GitHub"
              >
                <FaGithub className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="p-2 rounded-lg bg-card-hover hover:bg-primary/10 text-foreground/70 hover:text-primary transition-all hover:scale-110"
                aria-label="Twitter"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="p-2 rounded-lg bg-card-hover hover:bg-primary/10 text-foreground/70 hover:text-primary transition-all hover:scale-110"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-card-border text-center">
          <p className="text-foreground/50 text-sm">
            © {currentYear} CardVision. All rights reserved. 
            <span className="mx-2">|</span>
            Made with 
            <span className="mx-1 text-suit-hearts">♥</span>
            for card enthusiasts
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer