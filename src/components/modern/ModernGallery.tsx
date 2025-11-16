import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Filter, 
  Heart, 
  Download, 
  Eye, 
  Sparkles,
  TrendingUp,
  Grid3x3,
  List,
  Star,
  Users
} from 'lucide-react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { useDesignStore } from '../../stores/designStore'
import { useAuthStore } from '../../stores/authStore'
import { cn } from '../../lib/utils'

interface FilterOptions {
  style: string
  roomType: string
  sortBy: 'recent' | 'popular' | 'trending'
}

export const ModernGallery: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState<FilterOptions>({
    style: 'all',
    roomType: 'all',
    sortBy: 'recent'
  })
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  
  const { publicGallery, loadPublicGallery, likeDesign } = useDesignStore()
  const { user } = useAuthStore()

  useEffect(() => {
    loadPublicGallery()
  }, [loadPublicGallery])

  const filteredDesigns = publicGallery.filter(design => {
    const matchesSearch = design.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         design.style.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStyle = filters.style === 'all' || design.style === filters.style
    const matchesRoom = filters.roomType === 'all' || design.room_type === filters.roomType
    
    return matchesSearch && matchesStyle && matchesRoom
  })

  const sortedDesigns = [...filteredDesigns].sort((a, b) => {
    switch (filters.sortBy) {
      case 'popular':
        return b.like_count - a.like_count
      case 'trending':
        return b.view_count - a.view_count
      case 'recent':
      default:
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    }
  })

  const handleLike = async (designId: string) => {
    if (!user) return
    await likeDesign(designId)
  }

  const handleDownload = (imageUrl: string, designName: string) => {
    const link = document.createElement('a')
    link.href = imageUrl
    link.download = `${designName}.jpg`
    link.click()
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-medium text-gray-700">Community Gallery</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gray-900">Discover Amazing</span>
            <br />
            <span className="gradient-text">Design Inspiration</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore thousands of AI-generated designs from our creative community
          </p>
          
          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{sortedDesigns.length}+</div>
              <div className="text-sm text-gray-600">Designs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">50K+</div>
              <div className="text-sm text-gray-600">Downloads</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">10K+</div>
              <div className="text-sm text-gray-600">Creators</div>
            </div>
          </div>
        </motion.div>

        {/* Search and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm border p-6 mb-8"
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search designs, styles, or creators..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Filter Toggle */}
            <Button
              variant={showFilters ? "default" : "outline"}
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters
            </Button>

            {/* Sort Options */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({...filters, sortBy: e.target.value as FilterOptions['sortBy']})}
                className="bg-gray-50 border-0 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="recent">Most Recent</option>
                <option value="popular">Most Liked</option>
                <option value="trending">Trending</option>
              </select>
            </div>

            {/* View Mode */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3x3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Expanded Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mt-6 pt-6 border-t"
              >
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Style</label>
                    <select
                      value={filters.style}
                      onChange={(e) => setFilters({...filters, style: e.target.value})}
                      className="w-full bg-gray-50 border-0 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="all">All Styles</option>
                      <option value="minimalist">Minimalist</option>
                      <option value="scandinavian">Scandinavian</option>
                      <option value="modern">Modern</option>
                      <option value="bohemian">Bohemian</option>
                      <option value="luxury">Luxury</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Room Type</label>
                    <select
                      value={filters.roomType}
                      onChange={(e) => setFilters({...filters, roomType: e.target.value})}
                      className="w-full bg-gray-50 border-0 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="all">All Rooms</option>
                      <option value="bedroom">Bedroom</option>
                      <option value="livingroom">Living Room</option>
                      <option value="kitchen">Kitchen</option>
                      <option value="office">Office</option>
                    </select>
                  </div>

                  <div className="flex items-end">
                    <Button 
                      variant="outline" 
                      onClick={() => setFilters({ style: 'all', roomType: 'all', sortBy: 'recent' })}
                      className="w-full"
                    >
                      Reset Filters
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <p className="text-gray-600">
            Showing <span className="font-semibold">{sortedDesigns.length}</span> design{sortedDesigns.length !== 1 ? 's' : ''}
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={cn(
            "gap-6 mb-12",
            viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
              : "space-y-6"
          )}
        >
          {sortedDesigns.map((design, index) => (
            <motion.div
              key={design.id}
              variants={itemVariants}
              custom={index}
              className="group"
            >
              <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
                <CardContent className="p-0">
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={design.generated_image_url}
                      alt={design.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-white font-semibold text-lg mb-1">{design.name}</h3>
                            <p className="text-white/80 text-sm capitalize">{design.style}</p>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => handleLike(design.id)}
                              disabled={!user}
                              className="h-8 w-8 p-0"
                            >
                              <Heart className="w-4 h-4" />
                            </Button>
                            
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => handleDownload(design.generated_image_url, design.name)}
                              className="h-8 w-8 p-0"
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Style Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-medium px-2 py-1 rounded-full">
                        {design.style}
                      </span>
                    </div>

                    {/* Trending Badge */}
                    {index < 3 && (
                      <div className="absolute top-3 right-3">
                        <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          Hot
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {design.like_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {design.view_count}
                      </span>
                      <span className="text-xs">
                        {new Date(design.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="text-sm text-gray-600 capitalize">
                      {design.room_type} • Created by AI
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {sortedDesigns.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No designs found</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              Try adjusting your search terms or filters to discover more amazing designs.
            </p>
            
            <Button
              onClick={() => {
                setSearchTerm('')
                setFilters({ style: 'all', roomType: 'all', sortBy: 'recent' })
              }}
              variant="outline"
            >
              Reset Search
            </Button>
          </motion.div>
        )}

        {/* Load More */}
        {sortedDesigns.length > 0 && sortedDesigns.length % 12 === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Button size="lg" variant="gradient">
              Load More Designs
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}