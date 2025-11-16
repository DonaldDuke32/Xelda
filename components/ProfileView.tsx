import React from 'react';
import { UI_TEXT, STYLES } from '../constants';

interface ProfileViewProps {
  styleProfile: Record<string, number>;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ styleProfile }) => {
  const sortedStyles = Object.entries(styleProfile).sort(([, a], [, b]) => b - a);
  const totalCreations = sortedStyles.reduce((sum, [, count]) => sum + count, 0);

  const getStyleIcon = (styleName: string) => {
    const style = STYLES.find(s => s.name === styleName);
    return style ? <style.icon className="w-6 h-6 text-orange-400" /> : null;
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-transparent bg-clip-text mb-2">
          {UI_TEXT.profileTitle}
        </h1>
        <p className="text-lg text-gray-300">{UI_TEXT.profileSubtitle}</p>
      </div>

      <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4">{UI_TEXT.profileStyleDistribution}</h2>
        {sortedStyles.length > 0 ? (
          <div className="space-y-4">
            {sortedStyles.map(([name, count]) => {
              const percentage = totalCreations > 0 ? (count / totalCreations) * 100 : 0;
              return (
                <div key={name} className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center">
                    {getStyleIcon(name)}
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold">{name}</span>
                        <span className="text-sm text-gray-400">{count} création{count > 1 ? 's' : ''}</span>
                    </div>
                    <div className="w-full bg-zinc-800 rounded-full h-4">
                      <div
                        className="bg-gradient-to-r from-yellow-400 to-orange-500 h-4 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-400 py-8">{UI_TEXT.profileNoData}</p>
        )}
      </div>
    </div>
  );
};