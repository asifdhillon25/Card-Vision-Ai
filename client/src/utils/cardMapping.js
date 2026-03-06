// src/utils/cardMapping.js
/**
 * Maps a card code (e.g., "AS", "10C", "QH") to the correct image path
 * based on the folder structure: /cards/{suit}/{rank}.svg
 */

export const isValidCardCode = (code) => {
  if (!code || typeof code !== 'string') return false
  
  // Handle 2-character codes (e.g., "AS", "2C", "QH")
  if (code.length === 2) {
    const rank = code[0]
    const suit = code[1]
    return /^[2-9JQKA]$/.test(rank) && /^[CDHS]$/.test(suit)
  }
  
  // Handle 3-character codes (e.g., "10C", "10D")
  if (code.length === 3) {
    const rank = code.substring(0, 2)
    const suit = code[2]
    return rank === '10' && /^[CDHS]$/.test(suit)
  }
  
  return false
}

export const getSuitFolder = (suitCode) => {
  const suitMap = {
    'C': 'clubs',
    'D': 'diamonds',
    'H': 'hearts',
    'S': 'spades'
  }
  return suitMap[suitCode] || 'backs'
}

export const getRankFile = (cardCode) => {
  if (cardCode.length === 3) {
    return '10' // 10C, 10D, etc.
  }
  return cardCode[0] // A, 2, 3, 4, 5, 6, 7, 8, 9, J, Q, K
}

export const getCardImagePath = (cardCode) => {
  // Return card back for invalid codes
  if (!isValidCardCode(cardCode)) {
    console.warn(`Invalid card code: ${cardCode}, using card back`)
    return '/cards/backs/card-back.svg'
  }
  
  // Parse the card code
  let rank, suit
  
  if (cardCode.length === 3) {
    // Handle 10 (e.g., "10C")
    rank = '10'
    suit = cardCode[2]
  } else {
    // Handle 2-character codes (e.g., "AS", "2C", "QH")
    rank = cardCode[0]
    suit = cardCode[1]
  }
  
  // Get the correct folder name
  const suitFolder = getSuitFolder(suit)
  
  // Construct the path: /cards/{suit}/{rank}.svg
  const imagePath = `/cards/${suitFolder}/${rank}.svg`
  
  console.log(`Card ${cardCode} -> ${imagePath}`) // For debugging
  
  return imagePath
}

export const getCardDisplayName = (cardCode) => {
  const rankMap = {
    'A': 'Ace',
    '2': 'Two',
    '3': 'Three',
    '4': 'Four',
    '5': 'Five',
    '6': 'Six',
    '7': 'Seven',
    '8': 'Eight',
    '9': 'Nine',
    '10': 'Ten',
    'J': 'Jack',
    'Q': 'Queen',
    'K': 'King'
  }
  
  const suitMap = {
    'C': 'Clubs',
    'D': 'Diamonds',
    'H': 'Hearts',
    'S': 'Spades'
  }
  
  if (!isValidCardCode(cardCode)) return 'Unknown Card'
  
  let rank, suit
  if (cardCode.length === 3) {
    rank = '10'
    suit = cardCode[2]
  } else {
    rank = cardCode[0]
    suit = cardCode[1]
  }
  
  return `${rankMap[rank]} of ${suitMap[suit]}`
}