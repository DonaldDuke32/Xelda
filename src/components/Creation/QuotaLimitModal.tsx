import React from 'react';
import { useAuthStore } from '../../stores/authStore';
import { CloseIcon, CrownIcon } from '../icons';

interface QuotaLimitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

export const QuotaLimitModal: React.FC<QuotaLimitModalProps> = ({ 
  isOpen, 
  onClose, 
  onUpgrade 
}) => {
  const { user } = useAuthStore();

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-zinc-900/90 rounded-2xl border border-white/10 p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center hover:bg-zinc-700 transition-colors"
        >
          <CloseIcon className="w-4 h-4 text-gray-400" />
        </button>

        <div className="text-center">
          {/* Icon */}
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CrownIcon className="w-8 h-8 text-white" />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold mb-4">
            Quota épuisé ! 🎨
          </h2>

          {/* Description */}
          <div className="mb-6 space-y-3">
            <p className="text-gray-400">
              Vous avez utilisé {user.monthly_generations_used} générations sur {user.monthly_generations_limit} ce mois.
            </p>
            <p className="text-white font-medium">
              Passez au plan <span className="text-orange-400 font-bold">Pro</span> pour des générations illimitées !
            </p>
          </div>

          {/* Benefits */}
          <div className="bg-zinc-800/50 rounded-xl p-4 mb-6 text-left">
            <h3 className="font-bold text-orange-400 mb-3">🚀 Plan Pro (4.99€/mois)</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                Générations illimitées
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                1 GB de stockage
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                Chat illimité
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                Support prioritaire
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                Accès complet à la galerie
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={onUpgrade}
              className="w-full py-3 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white font-bold rounded-xl hover:scale-105 transition-all"
            >
              Passer au Pro - 4.99€/mois
            </button>
            
            <button
              onClick={onClose}
              className="w-full py-3 text-gray-400 hover:text-white transition-colors"
            >
              Peut-être plus tard
            </button>
          </div>

          {/* Reset Info */}
          <div className="mt-6 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <p className="text-sm text-blue-400">
              💡 Vos générations gratuites se rechargent le 1er de chaque mois
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};