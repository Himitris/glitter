export const colors = {
  primary: {
    pink: '#ec4899',
    purple: '#a855f7',
    orange: '#f97316'
  },
  gradient: {
    primary: 'from-pink-500 via-purple-500 to-orange-500',
    secondary: 'from-pink-500 to-orange-500'
  },
  background: {
    dark: 'from-gray-900 to-black',
    darker: 'from-black to-gray-900'
  }
} as const;

export const buttonVariants = {
  primary: `bg-gradient-to-r ${colors.gradient.secondary} text-white 
    hover:opacity-90 transition-opacity px-6 py-2 rounded-full`,
  secondary: `border border-gray-700 hover:border-gray-600 
    hover:bg-gray-800/50 transition-all px-6 py-2 rounded-full`,
  outline: `border border-pink-500 text-pink-500 
    hover:bg-pink-500/10 transition-all px-6 py-2 rounded-full`
} as const;