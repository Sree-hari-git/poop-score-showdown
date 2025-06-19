
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import PoopMascot from '../components/PoopMascot';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="min-h-screen poop-gradient p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-amber-900">
            Hello @{user.username}! 💩
          </h1>
          <Button variant="ghost" onClick={logout} className="text-amber-900">
            Logout
          </Button>
        </div>

        {/* Mascot */}
        <div className="text-center mb-8">
          <PoopMascot size="xl" />
          <h2 className="text-3xl font-bold text-amber-900 mt-4">
            The one & only poop master!
          </h2>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="poop-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-amber-900">Current Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-900">{user.streakCount}</div>
              <div className="text-sm text-amber-700">days</div>
            </CardContent>
          </Card>

          <Card className="poop-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-amber-900">Total Poops</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-900">{user.totalSubmissions}</div>
              <div className="text-sm text-amber-700">submissions</div>
            </CardContent>
          </Card>

          <Card className="poop-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-amber-900">Best Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-900">{user.bestScore}</div>
              <div className="text-sm text-amber-700">out of 150</div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 max-w-md mx-auto">
          <Button
            onClick={() => navigate('/create-room')}
            className="w-full poop-button text-lg py-4"
          >
            🏗️ Create Room
          </Button>

          <Button
            onClick={() => navigate('/join-room')}
            className="w-full poop-button text-lg py-4"
          >
            🔑 Join Room
          </Button>

          <Button
            onClick={() => navigate('/profile')}
            className="w-full poop-button-secondary text-lg py-4"
          >
            🏆 My Stats
          </Button>

          <Button
            onClick={() => navigate('/badges')}
            className="w-full poop-button-secondary text-lg py-4"
          >
            🎖️ Badges
          </Button>
        </div>

        {/* Badges Preview */}
        {user.badges.length > 0 && (
          <div className="mt-8 poop-card max-w-md mx-auto">
            <h3 className="font-bold text-amber-900 mb-4">Recent Badges</h3>
            <div className="flex flex-wrap gap-2">
              {user.badges.slice(0, 3).map((badge, index) => (
                <div key={index} className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">
                  {badge}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
