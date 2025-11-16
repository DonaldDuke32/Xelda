import React from 'react'
import { motion } from 'framer-motion'
import { 
  Sparkles, 
  ArrowRight, 
  Upload,
  Palette,
  MessageSquare,
  Download,
  Users,
  Zap
} from 'lucide-react'
import { Button } from '../ui/button'
import { Card } from '../ui/card'

interface HeroSectionProps {
  onGetStarted: () => void
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => {
  const features = [
    {
      icon: Upload,
      title: "Upload & Transform",
      description: "Upload your room photo and watch AI transform it instantly"
    },
    {
      icon: Palette,
      title: "10 Design Styles",
      description: "From minimalist to luxury - find your perfect aesthetic"
    },
    {
      icon: MessageSquare,
      title: "AI Chat Refinement",
      description: "Fine-tune your design with natural language commands"
    },
    {
      icon: Download,
      title: "Download & Share",
      description: "Get high-quality results ready for implementation"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full blur-3xl opacity-10"></div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 container mx-auto px-4 text-center"
      >
        {/* Main Heading */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-orange-200 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium text-gray-700">AI-Powered Interior Design</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-gray-900">Transform Your</span>
            <br />
            <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              Dream Space
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Upload a photo of your room and watch our AI transform it into stunning designs. 
            No design experience needed - just your imagination.
          </p>
        </motion.div>

        {/* CTA Section */}
        <motion.div variants={itemVariants} className="mb-16">
          <Button
            onClick={onGetStarted}
            size="xl"
            variant="gradient"
            className="group shadow-2xl shadow-orange-500/25 hover:shadow-orange-500/40"
          >
            <Upload className="w-5 h-5 mr-3" />
            Start Designing Now
            <ArrowRight className="w-5 h-5 ml-3 transition-transform group-hover:translate-x-1" />
          </Button>
          
          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>10K+ Happy Users</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>50K+ Designs Created</span>
            </div>
          </div>
        </motion.div>

        {/* Feature Cards */}
        <motion.div 
          variants={containerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="p-6 bg-white/60 backdrop-blur-sm border-white/20 hover:bg-white/80 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Sample Design Preview */}
        <motion.div variants={itemVariants} className="mt-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">See XELDA in Action</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-6 bg-white/60 backdrop-blur-sm border-white/20">
              <h3 className="font-medium text-gray-700 mb-3">Before</h3>
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Original Room Photo</span>
              </div>
            </Card>
            <Card className="p-6 bg-white/60 backdrop-blur-sm border-white/20">
              <h3 className="font-medium text-gray-700 mb-3">After</h3>
              <div className="aspect-video bg-gradient-to-br from-orange-200 via-pink-200 to-purple-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-700">AI-Generated Design</span>
              </div>
            </Card>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}