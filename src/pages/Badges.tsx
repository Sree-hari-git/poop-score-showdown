
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import PoopMascot from '../components/PoopMascot';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Badges = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/auth');
    return null;
  }

  const allBadges = [
    {
      type: 'Triple Drop',
      description: 'Upload 3 times in one day',
      icon: '🔥',
      earned: user.badges.includes('Triple Drop')
    },
    {
      type: 'Weekly Master',
      description: '7-day upload streak',
      icon: '👑',
      earned: user.badges.includes('Weekly Master')
    },
    {
      type: 'Perfect Score',
      description: 'Score 150/150',
      icon: '🎯',
      earned: user.bestScore >= 150
    },
    {
      type: 'Century Club',
      description: '100 total uploads',
      icon: '🏆',
      earned: user.totalSubmissions >= 100
    },
    {
      type: 'Early Bird',
      description: 'Upload before 6 AM',
      icon: '🌅',
      earned: false
    },
    {
      type: 'Night Owl',
      description: 'Upload after 11 PM',
      icon: '🦉',
      earned: false
    }
  ];

  return (
    <div className="min-h-screen poop-gradient p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="mb-4 text-amber-900"
          >
            ← Back to Home
          </Button>
          <PoopMascot size="lg" />
          <h1 className="text-3xl font-bold text-amber-900 mt-4">
            Badge Collection
          </h1>
          <p className="text-amber-700 mt-2">
            Earned {user.badges.length} of {allBadges.length} badges
          </p>
        </div>

        {/* Progress */}
        <div className="poop-card mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-amber-900 font-semibold">Progress</span>
            <span className="text-amber-700">{user.badges.length}/{allBadges.length}</span>
          </div>
          <div className="w-full bg-amber-200 rounded-full h-3">
            <div 
              className="bg-amber-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${(user.badges.length / allBadges.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Badge Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {allBadges.map((badge, index) => (
            <Card 
              key={index} 
              className={`poop-card transition-all duration-200 ${
                badge.earned 
                  ? 'ring-2 ring-amber-400 shadow-lg' 
                  : 'opacity-60 grayscale'
              }`}
            >
              <CardHeader className="text-center">
                <div className="text-6xl mb-2">{badge.icon}</div>
                <CardTitle className={`text-lg ${badge.earned ? 'text-amber-900' : 'text-gray-500'}`}>
                  {badge.type}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className={`${badge.earned ? 'text-amber-700' : 'text-gray-400'}`}>
                  {badge.description}
                </p>
                {badge.earned && (
                  <div className="mt-3 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-semibold">
                    ✅ Earned
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Motivational Message */}
        <div className="poop-card text-center">
          <h3 className="text-xl font-bold text-amber-900 mb-4">
            Keep Going, Poop Master! 🚀
          </h3>
          <p className="text-amber-700 mb-6">
            {user.badges.length === 0 
              ? "Upload your first poop to earn your first badge!"
              : user.badges.length === allBadges.length
              ? "Congratulations! You've earned all badges! 🎉"
              : `${allBadges.length - user.badges.length} more badges to collect!`
            }
          </p>
          <Button
            onClick={() => navigate('/dashboard')}
            className="poop-button"
          >
            🏠 Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Badges;
