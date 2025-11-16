import React from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Users, 
  Zap, 
  Heart, 
  Download,
  Eye,
  Calendar,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Progress } from '../ui/progress'

interface AnalyticsDashboardProps {
  userStats?: {
    totalDesigns: number
    totalLikes: number
    totalViews: number
    totalDownloads: number
    popularStyle: string
    createdAt: string
  }
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ 
  userStats = {
    totalDesigns: 12,
    totalLikes: 84,
    totalViews: 256,
    totalDownloads: 45,
    popularStyle: 'Minimalist',
    createdAt: '2024-01-15'
  }
}) => {
  const stats = [
    {
      label: 'Designs Created',
      value: userStats.totalDesigns,
      icon: Zap,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      change: '+12%'
    },
    {
      label: 'Total Likes',
      value: userStats.totalLikes,
      icon: Heart,
      color: 'from-pink-500 to-red-500',
      bgColor: 'bg-pink-50',
      change: '+8%'
    },
    {
      label: 'Profile Views',
      value: userStats.totalViews,
      icon: Eye,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      change: '+15%'
    },
    {
      label: 'Downloads',
      value: userStats.totalDownloads,
      icon: Download,
      color: 'from-orange-500 to-yellow-500',
      bgColor: 'bg-orange-50',
      change: '+6%'
    }
  ]

  const styleBreakdown = [
    { style: 'Minimalist', count: 4, percentage: 33, color: 'bg-blue-500' },
    { style: 'Modern', count: 3, percentage: 25, color: 'bg-purple-500' },
    { style: 'Scandinavian', count: 3, percentage: 25, color: 'bg-green-500' },
    { style: 'Cozy', count: 2, percentage: 17, color: 'bg-orange-500' }
  ]

  const weeklyActivity = [
    { day: 'Mon', designs: 2 },
    { day: 'Tue', designs: 1 },
    { day: 'Wed', designs: 3 },
    { day: 'Thu', designs: 0 },
    { day: 'Fri', designs: 2 },
    { day: 'Sat', designs: 3 },
    { day: 'Sun', designs: 1 }
  ]

  const maxActivity = Math.max(...weeklyActivity.map(d => d.designs))

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
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Design Analytics</h2>
        <p className="text-gray-600">Track your creative journey and see your impact</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div key={stat.label} variants={itemVariants}>
              <Card className={`${stat.bgColor} border-0 overflow-hidden relative group hover:shadow-lg transition-all duration-300`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-green-600 font-medium mt-2">{stat.change} this week</p>
                    </div>
                    <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Style Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5 text-purple-500" />
                Style Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {styleBreakdown.map((item, index) => (
                <motion.div
                  key={item.style}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                    <span className="font-medium text-gray-700">{item.style}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.percentage}%` }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                        className={`h-2 rounded-full ${item.color}`}
                      />
                    </div>
                    <span className="text-sm text-gray-500 w-12 text-right">{item.count}</span>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Weekly Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-500" />
                Weekly Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between h-40 gap-2">
                {weeklyActivity.map((day, index) => (
                  <div key={day.day} className="flex-1 flex flex-col items-center">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(day.designs / maxActivity) * 120}px` }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                      className="w-full bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-md min-h-1"
                    />
                    <div className="mt-2 text-center">
                      <div className="text-sm font-medium text-gray-700">{day.designs}</div>
                      <div className="text-xs text-gray-500">{day.day}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-500" />
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 border border-purple-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">🎨</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Creative Starter</h4>
                    <p className="text-sm text-gray-600">Created your first design</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 border border-purple-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">⚡</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Style Explorer</h4>
                    <p className="text-sm text-gray-600">Tried 5+ different styles</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 border border-purple-200 opacity-60">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">🌟</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Community Star</h4>
                    <p className="text-sm text-gray-600">Get 100+ likes (84/100)</p>
                    <Progress value={84} className="w-full mt-2 h-1" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-center"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Keep Creating!</h3>
        <p className="text-gray-600 mb-6">Your next masterpiece is just one click away</p>
        
        <div className="flex justify-center gap-4">
          <Card className="p-4 hover:shadow-lg transition-all cursor-pointer group">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">New Design</h4>
              <p className="text-sm text-gray-600">Start fresh project</p>
            </div>
          </Card>
          
          <Card className="p-4 hover:shadow-lg transition-all cursor-pointer group">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Explore Gallery</h4>
              <p className="text-sm text-gray-600">Get inspired</p>
            </div>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}