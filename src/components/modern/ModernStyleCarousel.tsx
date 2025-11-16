import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, 
  Crown, 
  Lock, 
  ArrowRight, 
  Zap,
  TrendingUp,
  Heart
} from 'lucide-react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { STYLES } from '../../constants'
import { useAuthStore } from '../../stores/authStore'
import type { Style } from '../../types'
import { cn } from '../../lib/utils'

interface ModernStyleCarouselProps {
  onStyleSelect: (style: Style) => void
  onSurpriseMe: () => void
}

const styleDescriptions = {
  minimalist: {
    description: "Clean lines, open spaces, neutral palettes",
    features: ["Clutter-free spaces", "Natural materials", "Functional furniture"],
    popularity: 95,
    trending: true
  },
  scandinavian: {
    description: "Cozy textures, light woods, hygge vibes",
    features: ["Light oak furniture", "Wool textiles", "Warm lighting"],
    popularity: 88,
    trending: true
  },
  modern: {
    description: "Bold geometry, sleek materials, tech integration",
    features: ["Glass surfaces", "Metal accents", "Smart lighting"],
    popularity: 92,
    trending: false
  },
  bohemian: {
    description: "Rich textures, vibrant colors, eclectic mix",
    features: ["Layered rugs", "Plants everywhere", "Vintage finds"],
    popularity: 85,
    trending: false
  },
  luxury: {
    description: "Premium materials, elegant details, sophistication",
    features: ["Marble surfaces", "Gold accents", "Designer pieces"],
    popularity: 78,
    isPremium: true
  },
  industrial: {
    description: "Raw materials, urban edge, exposed elements",
    features: ["Exposed brick", "Metal fixtures", "Edison bulbs"],
    popularity: 82,
    trending: false
  },
  vintage: {
    description: "Nostalgic charm, retro patterns, timeless appeal",
    features: ["Antique pieces", "Classic patterns", "Warm colors"],
    popularity: 75,
    trending: false
  },
  gamer_setup: {
    description: "RGB lighting, high-tech aesthetic, gaming focus",
    features: ["LED strips", "Gaming stations", "Tech integration"],
    popularity: 68,
    isPremium: true
  },
  futuristic: {
    description: "Sci-fi inspired, cutting-edge, tomorrow's design",
    features: ["Holographic elements", "Smart surfaces", "Neon accents"],
    popularity: 71,
    isPremium: true
  },
  cozy: {
    description: "Warm atmosphere, soft textures, comfort first",
    features: ["Soft lighting", "Plush fabrics", "Reading nooks"],
    popularity: 90,
    trending: false
  }
}

export const ModernStyleCarousel: React.FC<ModernStyleCarouselProps> = ({ 
  onStyleSelect, 
  onSurpriseMe 
}) => {
  const { user } = useAuthStore()
  const [hoveredStyle, setHoveredStyle] = useState<string | null>(null)
  const [surpriseAnimation, setSurpriseAnimation] = useState(false)

  const canAccessStyle = (styleId: string) => {
    const styleInfo = styleDescriptions[styleId as keyof typeof styleDescriptions]
    if (!styleInfo?.isPremium) return true
    return user?.plan !== 'free'
  }

  const handleSurpriseMe = () => {
    setSurpriseAnimation(true)
    setTimeout(() => {
      onSurpriseMe()
      setSurpriseAnimation(false)
    }, 1000)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="w-full space-y-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-orange-200 rounded-full px-4 py-2">
          <Sparkles className="w-4 h-4 text-orange-500" />
          <span className="text-sm font-medium text-gray-700">Choose Your Style</span>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Transform Your Space with
          <span className="gradient-text"> AI Magic</span>
        </h2>
        
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Select from our curated collection of design styles, each crafted by interior design experts 
          and powered by advanced AI technology.
        </p>
      </motion.div>

      {/* Style Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
      >
        {STYLES.map((style) => {
          const styleInfo = styleDescriptions[style.id as keyof typeof styleDescriptions]
          const canAccess = canAccessStyle(style.id)
          const isHovered = hoveredStyle === style.id
          const Icon = style.icon

          return (
            <motion.div
              key={style.id}
              variants={itemVariants}
              onHoverStart={() => setHoveredStyle(style.id)}
              onHoverEnd={() => setHoveredStyle(null)}
              className="relative"
            >
              <Card
                className={cn(
                  "group cursor-pointer transition-all duration-300 overflow-hidden h-full",
                  canAccess 
                    ? "hover:shadow-xl hover:scale-105 hover:border-orange-300" 
                    : "opacity-60 cursor-not-allowed"
                )}
                onClick={() => canAccess && onStyleSelect(style)}
              >
                {/* Premium Badge */}
                {styleInfo?.isPremium && (
                  <div className="absolute top-3 right-3 z-10">
                    {canAccess ? (
                      <Crown className="w-5 h-5 text-yellow-500" />
                    ) : (
                      <div className="bg-gray-900/80 backdrop-blur-sm rounded-full p-1">
                        <Lock className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                )}

                {/* Trending Badge */}
                {styleInfo?.trending && (
                  <div className="absolute top-3 left-3 z-10">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full px-2 py-1 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-white" />
                      <span className="text-xs font-medium text-white">Trending</span>
                    </div>
                  </div>
                )}

                <CardContent className="p-6 h-full flex flex-col">
                  {/* Icon */}
                  <div className="mb-4">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300",
                      canAccess 
                        ? "bg-gradient-to-br from-orange-400 to-pink-500 group-hover:scale-110" 
                        : "bg-gray-400"
                    )}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg mb-1">
                        {style.name}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {styleInfo?.description || style.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-1">
                      {styleInfo?.features?.slice(0, 3).map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs text-gray-500">
                          <div className="w-1 h-1 bg-orange-400 rounded-full"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 text-gray-500">
                        <Heart className="w-3 h-3" />
                        <span>{styleInfo?.popularity}% love this</span>
                      </div>
                    </div>
                  </div>

                  {/* Hover Action */}
                  <AnimatePresence>
                    {isHovered && canAccess && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="mt-4 pt-4 border-t"
                      >
                        <Button size="sm" variant="gradient" className="w-full">
                          <span>Try {style.name}</span>
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>

                {/* Lock Overlay */}
                {!canAccess && (
                  <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-center text-white">
                      <Lock className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm font-medium">Pro Feature</p>
                      <p className="text-xs opacity-80">Upgrade to unlock</p>
                    </div>
                  </div>
                )}
              </Card>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Surprise Me Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center space-y-6"
      >
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">
            Can't decide? Let AI surprise you!
          </h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Our AI will analyze trends and create a unique style fusion just for you.
          </p>
        </div>

        <motion.div
          animate={surpriseAnimation ? { rotate: 360, scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <Button
            onClick={handleSurpriseMe}
            size="xl"
            variant="glow"
            disabled={surpriseAnimation}
            className="relative group overflow-hidden"
          >
            <motion.div
              animate={surpriseAnimation ? { rotate: 360 } : {}}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <Zap className="w-6 h-6 mr-3" />
            </motion.div>
            {surpriseAnimation ? 'Creating Magic...' : 'Surprise Me!'}
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          </Button>
        </motion.div>

        {/* User preference hint */}
        {user && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6"
          >
            <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200 max-w-md mx-auto">
              <CardContent className="p-4 text-center">
                <Sparkles className="w-5 h-5 text-purple-500 mx-auto mb-2" />
                <p className="text-sm text-purple-700">
                  Based on your design history, we'll recommend styles that match your taste
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}