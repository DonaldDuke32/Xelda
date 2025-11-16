import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { useDesignStore } from '../../stores/designStore';
import { UpgradeModal } from '../Subscription/UpgradeModal';
import { UserIcon, SettingsIcon, CrownIcon, TrendingUpIcon, PaletteIcon, StarIcon } from '../icons'
import { AnalyticsDashboard } from '../modern/AnalyticsDashboard';

interface StyleAnalysis {
  style: string;
  count: number;
  percentage: number;
  lastUsed: string;
}

export const EnhancedProfileView: React.FC = () => {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'designs' | 'settings'>('overview');
  const [styleAnalysis, setStyleAnalysis] = useState<StyleAnalysis[]>([]);
  
  const { user, updateProfile } = useAuthStore();
  const { userDesigns, loadUserDesigns } = useDesignStore();

  useEffect(() => {
    if (user) {
      loadUserDesigns();
    }
  }, [user, loadUserDesigns]);

  useEffect(() => {
    if (userDesigns.length > 0) {
      const analysis = analyzeUserStyles();
      setStyleAnalysis(analysis);
    }
  }, [userDesigns]);

  const analyzeUserStyles = (): StyleAnalysis[] => {
    const styleCount: Record<string, { count: number; lastUsed: string }> = {};
    
    userDesigns.forEach(design => {
      if (!styleCount[design.style]) {
        styleCount[design.style] = { count: 0, lastUsed: design.created_at };
      }
      styleCount[design.style].count++;
      if (new Date(design.created_at) > new Date(styleCount[design.style].lastUsed)) {
        styleCount[design.style].lastUsed = design.created_at;
      }
    });

    const total = userDesigns.length;
    return Object.entries(styleCount)
      .map(([style, data]) => ({
        style,
        count: data.count,
        percentage: Math.round((data.count / total) * 100),
        lastUsed: data.lastUsed
      }))
      .sort((a, b) => b.count - a.count);
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'expert': return 'from-purple-500 to-pink-500';
      case 'pro': return 'from-orange-500 to-red-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getPlanFeatures = (plan: string) => {
    switch (plan) {
      case 'expert':
        return ['Générations illimitées', 'Stockage illimité', 'Support 24/7', 'Fonctionnalités bêta'];
      case 'pro':
        return ['Générations illimitées', '1GB stockage', 'Support prioritaire', '3 types de pièces'];
      default:
        return ['10 générations/mois', '100MB stockage', 'Support communautaire'];
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Veuillez vous connecter pour voir votre profil.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-zinc-900/50 rounded-2xl border border-white/10 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Avatar */}
            <div className="relative">
              {user.avatar_url ? (
                <img 
                  src={user.avatar_url} 
                  alt={user.username}
                  className="w-24 h-24 rounded-full object-cover border-4 border-orange-500"
                />
              ) : (
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <UserIcon className="w-12 h-12 text-white" />
                </div>
              )}
              
              {/* Plan Badge */}
              <div className={`absolute -bottom-2 -right-2 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getPlanColor(user.plan)}`}>
                {user.plan === 'expert' && <CrownIcon className="w-3 h-3 inline mr-1" />}
                {user.plan.toUpperCase()}
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">{user.username}</h1>
              <p className="text-gray-400 mb-4">{user.email}</p>
              
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400">{userDesigns.length}</div>
                  <div className="text-sm text-gray-400">Designs créés</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">
                    {userDesigns.reduce((sum, d) => sum + d.like_count, 0)}
                  </div>
                  <div className="text-sm text-gray-400">Likes reçus</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">
                    {user.monthly_generations_used}/{user.monthly_generations_limit}
                  </div>
                  <div className="text-sm text-gray-400">Générations ce mois</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              {user.plan === 'free' && (
                <button
                  onClick={() => setShowUpgradeModal(true)}
                  className="px-6 py-3 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white font-bold rounded-xl hover:scale-105 transition-all flex items-center gap-2"
                >
                  <CrownIcon className="w-4 h-4" />
                  Upgrade Pro
                </button>
              )}
              
              <button
                onClick={() => setActiveTab('settings')}
                className="px-4 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-colors"
              >
                <SettingsIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quota Progress */}
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Quota mensuel</span>
              <span className="text-white">
                {user.monthly_generations_used} / {user.monthly_generations_limit === -1 ? '∞' : user.monthly_generations_limit}
              </span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 transition-all duration-300"
                style={{ 
                  width: user.monthly_generations_limit === -1 ? '100%' : `${Math.min((user.monthly_generations_used / user.monthly_generations_limit) * 100, 100)}%` 
                }}
              />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 mb-8">
          {[
            { key: 'overview', label: 'Vue d\'ensemble', icon: TrendingUpIcon },
            { key: 'designs', label: 'Mes Designs', icon: PaletteIcon },
            { key: 'settings', label: 'Paramètres', icon: SettingsIcon }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === tab.key
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                  : 'text-gray-300 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Analytics Dashboard */}
            <AnalyticsDashboard 
              userStats={{
                totalDesigns: userDesigns.length,
                totalLikes: userDesigns.reduce((sum, d) => sum + d.like_count, 0),
                totalViews: userDesigns.reduce((sum, d) => sum + d.view_count, 0),
                totalDownloads: Math.floor(userDesigns.reduce((sum, d) => sum + d.view_count, 0) * 0.3),
                popularStyle: styleAnalysis[0]?.style || 'minimalist',
                createdAt: user.created_at
              }}
            />
            {/* Style Analysis */}
            <div className="bg-zinc-900/50 rounded-2xl border border-white/10 p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <PaletteIcon className="w-5 h-5 text-orange-400" />
                Analyse de vos styles préférés
              </h2>
              
              {styleAnalysis.length > 0 ? (
                <div className="grid gap-4">
                  {styleAnalysis.slice(0, 5).map((style, index) => (
                    <div key={style.style} className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-8 text-center">
                        <span className="text-lg font-bold text-orange-400">#{index + 1}</span>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium capitalize">{style.style}</span>
                          <span className="text-sm text-gray-400">{style.count} designs ({style.percentage}%)</span>
                        </div>
                        
                        <div className="w-full bg-zinc-800 rounded-full h-2">
                          <div 
                            className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-500"
                            style={{ width: `${style.percentage}%` }}
                          />
                        </div>
                      </div>
                      
                      <div className="text-xs text-gray-400">
                        {new Date(style.lastUsed).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <PaletteIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Créez quelques designs pour voir votre analyse de style !</p>
                </div>
              )}
            </div>

            {/* Recent Activity */}
            <div className="bg-zinc-900/50 rounded-2xl border border-white/10 p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <TrendingUpIcon className="w-5 h-5 text-orange-400" />
                Activité récente
              </h2>
              
              <div className="space-y-4">
                {userDesigns.slice(0, 5).map(design => (
                  <div key={design.id} className="flex items-center gap-4 p-4 bg-zinc-800/30 rounded-xl">
                    <img 
                      src={design.generated_image_url} 
                      alt={design.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-medium">{design.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="capitalize">{design.style}</span>
                        <span>{design.like_count} likes</span>
                        <span>{new Date(design.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {design.is_shared_to_gallery && (
                      <StarIcon className="w-5 h-5 text-yellow-400" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Plan Benefits */}
            <div className="bg-zinc-900/50 rounded-2xl border border-white/10 p-6">
              <h2 className="text-xl font-bold mb-6">Votre plan {user.plan.toUpperCase()}</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-4">Fonctionnalités incluses</h3>
                  <ul className="space-y-2">
                    {getPlanFeatures(user.plan).map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {user.plan === 'free' && (
                  <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-4">
                    <h3 className="font-bold text-orange-400 mb-2">🚀 Passez au niveau supérieur !</h3>
                    <p className="text-sm text-gray-300 mb-4">
                      Débloquez des générations illimitées et des fonctionnalités premium.
                    </p>
                    <button
                      onClick={() => setShowUpgradeModal(true)}
                      className="w-full px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium rounded-lg hover:scale-105 transition-all"
                    >
                      Voir les plans
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'designs' && (
          <div className="bg-zinc-900/50 rounded-2xl border border-white/10 p-6">
            <h2 className="text-xl font-bold mb-6">Mes créations ({userDesigns.length})</h2>
            
            {userDesigns.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userDesigns.map(design => (
                  <div key={design.id} className="group relative bg-zinc-800/30 rounded-xl overflow-hidden hover:scale-105 transition-all">
                    <img 
                      src={design.generated_image_url}
                      alt={design.name}
                      className="w-full aspect-square object-cover"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-bold mb-1">{design.name}</h3>
                        <div className="flex justify-between text-sm text-gray-300">
                          <span className="capitalize">{design.style}</span>
                          <span>{design.like_count} ❤️</span>
                        </div>
                      </div>
                    </div>

                    {design.is_shared_to_gallery && (
                      <div className="absolute top-4 right-4">
                        <StarIcon className="w-5 h-5 text-yellow-400" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-gray-400">
                <PaletteIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-bold mb-2">Aucun design créé</h3>
                <p>Commencez à créer vos premiers designs pour les voir ici !</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-zinc-900/50 rounded-2xl border border-white/10 p-6">
              <h2 className="text-xl font-bold mb-6">Paramètres du compte</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Nom d'utilisateur</label>
                  <input
                    type="text"
                    value={user.username}
                    className="w-full px-4 py-3 bg-zinc-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={user.email}
                    className="w-full px-4 py-3 bg-zinc-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Plan actuel</label>
                  <div className="flex items-center gap-3">
                    <span className={`px-4 py-2 rounded-lg bg-gradient-to-r ${getPlanColor(user.plan)} text-white font-bold`}>
                      {user.plan.toUpperCase()}
                    </span>
                    {user.plan === 'free' && (
                      <button
                        onClick={() => setShowUpgradeModal(true)}
                        className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                      >
                        Mettre à niveau
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Upgrade Modal */}
        <UpgradeModal 
          isOpen={showUpgradeModal} 
          onClose={() => setShowUpgradeModal(false)} 
        />
      </div>
    </div>
  );
};