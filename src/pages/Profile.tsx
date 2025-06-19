
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import PoopMascot from '../components/PoopMascot';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="min-h-screen poop-gradient p-4">
      <div className="max-w-2xl mx-auto">
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
            @{user.username}'s Profile
          </h1>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="poop-card">
            <CardHeader>
              <CardTitle className="text-amber-900">🏆 Best Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-amber-900 mb-1">
                {user.bestScore}/150
              </div>
              <p className="text-amber-700">Your highest rated poop</p>
            </CardContent>
          </Card>

          <Card className="poop-card">
            <CardHeader>
              <CardTitle className="text-amber-900">📊 Average Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-amber-900 mb-1">
                {user.totalSubmissions > 0 ? Math.round((user.bestScore * 0.8)) : 0}/150
              </div>
              <p className="text-amber-700">Across all submissions</p>
            </CardContent>
          </Card>

          <Card className="poop-card">
            <CardHeader>
              <CardTitle className="text-amber-900">💩 Total Poops</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-amber-900 mb-1">
                {user.totalSubmissions}
              </div>
              <p className="text-amber-700">Lifetime submissions</p>
            </CardContent>
          </Card>

          <Card className="poop-card">
            <CardHeader>
              <CardTitle className="text-amber-900">🔥 Current Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-amber-900 mb-1">
                {user.streakCount} days
              </div>
              <p className="text-amber-700">Keep it going!</p>
            </CardContent>
          </Card>
        </div>

        {/* Badge Collection Preview */}
        <Card className="poop-card mb-8">
          <CardHeader>
            <CardTitle className="text-amber-900">🎖️ Badge Collection</CardTitle>
          </CardHeader>
          <CardContent>
            {user.badges.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {user.badges.map((badge, index) => (
                  <div key={index} className="bg-amber-100 text-amber-800 p-4 rounded-lg text-center">
                    <div className="text-2xl mb-2">
                      {badge === 'Triple Drop' ? '🔥' : '👑'}
                    </div>
                    <div className="font-semibold">{badge}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-amber-700 text-center py-8">
                No badges earned yet. Start uploading to earn your first badge!
              </p>
            )}
            <Button
              onClick={() => navigate('/badges')}
              className="poop-button-secondary w-full mt-4"
            >
              View All Badges
            </Button>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-4">
          <Button
            onClick={() => navigate('/dashboard')}
            className="poop-button w-full"
          >
            🏠 Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
