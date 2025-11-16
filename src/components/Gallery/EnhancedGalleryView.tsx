import React, { useState, useEffect } from 'react';
import { useDesignStore } from '../../stores/designStore';
import { useAuthStore } from '../../stores/authStore';
import { HeartIcon, DownloadIcon, RemixIcon, FilterIcon, SearchIcon } from '../icons';

interface FilterOptions {
  style: string;
  roomType: string;
  sortBy: 'recent' | 'popular' | 'trending';
}

export const EnhancedGalleryView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    style: 'all',
    roomType: 'all',
    sortBy: 'recent'
  });
  const [showFilters, setShowFilters] = useState(false);
  
  const { publicGallery, loadPublicGallery, likeDesign } = useDesignStore();
  const { user } = useAuthStore();

  useEffect(() => {
    loadPublicGallery();
  }, [loadPublicGallery]);

  const filteredDesigns = publicGallery.filter(design => {
    const matchesSearch = design.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         design.style.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStyle = filters.style === 'all' || design.style === filters.style;
    const matchesRoom = filters.roomType === 'all' || design.room_type === filters.roomType;
    
    return matchesSearch && matchesStyle && matchesRoom;
  });

  const sortedDesigns = [...filteredDesigns].sort((a, b) => {
    switch (filters.sortBy) {
      case 'popular':
        return b.like_count - a.like_count;
      case 'trending':
        return b.view_count - a.view_count;
      case 'recent':
      default:
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
  });

  const handleLike = async (designId: string) => {
    if (!user) return;
    await likeDesign(designId);
  };

  const handleDownload = (imageUrl: string, designName: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${designName}.jpg`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Galerie <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-transparent bg-clip-text">d'Inspiration</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Découvrez des designs extraordinaires créés par notre communauté passionnée
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par style, nom, ou mot-clé..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-zinc-800 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
            />
          </div>

          {/* Filter Toggle */}
          <div className="text-center">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 px-6 py-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors"
            >
              <FilterIcon className="w-4 h-4" />
              Filtres
              {showFilters ? ' ▲' : ' ▼'}
            </button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="bg-zinc-900/50 rounded-xl p-6 border border-white/10">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Style Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2">Style</label>
                  <select
                    value={filters.style}
                    onChange={(e) => setFilters({...filters, style: e.target.value})}
                    className="w-full px-3 py-2 bg-zinc-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="all">Tous les styles</option>
                    <option value="minimalist">Minimaliste</option>
                    <option value="scandinavian">Scandinave</option>
                    <option value="modern">Moderne</option>
                    <option value="bohemian">Bohème</option>
                    <option value="luxury">Luxe</option>
                    <option value="industrial">Industriel</option>
                  </select>
                </div>

                {/* Room Type Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2">Type de pièce</label>
                  <select
                    value={filters.roomType}
                    onChange={(e) => setFilters({...filters, roomType: e.target.value})}
                    className="w-full px-3 py-2 bg-zinc-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="all">Toutes les pièces</option>
                    <option value="bedroom">Chambre</option>
                    <option value="livingroom">Salon</option>
                    <option value="kitchen">Cuisine</option>
                    <option value="office">Bureau</option>
                  </select>
                </div>

                {/* Sort Options */}
                <div>
                  <label className="block text-sm font-medium mb-2">Trier par</label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters({...filters, sortBy: e.target.value as FilterOptions['sortBy']})}
                    className="w-full px-3 py-2 bg-zinc-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="recent">Plus récents</option>
                    <option value="popular">Plus likés</option>
                    <option value="trending">Plus vus</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-400">
            {sortedDesigns.length} design{sortedDesigns.length !== 1 ? 's' : ''} trouvé{sortedDesigns.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedDesigns.map((design) => (
            <div key={design.id} className="group bg-zinc-900/50 rounded-xl border border-white/10 overflow-hidden hover:border-orange-500/50 transition-all duration-300 hover:scale-105">
              {/* Image */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={design.generated_image_url}
                  alt={design.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                
                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div>
                      <h3 className="text-white font-bold text-lg mb-1">{design.name}</h3>
                      <p className="text-gray-300 text-sm capitalize">{design.style}</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleLike(design.id)}
                        disabled={!user}
                        className="p-2 bg-black/50 rounded-full hover:bg-red-500 transition-colors disabled:opacity-50"
                      >
                        <HeartIcon className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => handleDownload(design.generated_image_url, design.name)}
                        className="p-2 bg-black/50 rounded-full hover:bg-blue-500 transition-colors"
                      >
                        <DownloadIcon className="w-4 h-4" />
                      </button>
                      
                      <button className="p-2 bg-black/50 rounded-full hover:bg-green-500 transition-colors">
                        <RemixIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Style Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white text-xs font-bold rounded-full">
                    {design.style.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Design Info */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-white truncate">{design.name}</h4>
                  <span className="text-xs text-gray-400">
                    {new Date(design.created_at).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <HeartIcon className="w-3 h-3" />
                      {design.like_count}
                    </span>
                    <span>{design.view_count} vues</span>
                  </div>
                  
                  <div className="text-xs">
                    <span className="capitalize">{design.room_type}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sortedDesigns.length === 0 && (
          <div className="text-center py-16">
            <div className="mb-6">
              <div className="w-24 h-24 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <SearchIcon className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Aucun design trouvé</h3>
              <p className="text-gray-400 max-w-md mx-auto">
                Essayez de modifier vos filtres ou votre terme de recherche pour découvrir plus de créations.
              </p>
            </div>
            
            <button
              onClick={() => {
                setSearchTerm('');
                setFilters({ style: 'all', roomType: 'all', sortBy: 'recent' });
              }}
              className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}

        {/* Load More Button */}
        {sortedDesigns.length > 0 && sortedDesigns.length % 12 === 0 && (
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white font-bold rounded-xl hover:scale-105 transition-all">
              Charger plus de designs
            </button>
          </div>
        )}
      </div>
    </div>
  );
};