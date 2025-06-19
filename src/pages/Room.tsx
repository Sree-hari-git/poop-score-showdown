
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRoom } from '../contexts/RoomContext';
import { useAuth } from '../contexts/AuthContext';
import PoopMascot from '../components/PoopMascot';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

const Room = () => {
  const { code } = useParams<{ code: string }>();
  const { getLeaderboard, currentRoom } = useRoom();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (code) {
      loadLeaderboard();
      // Refresh every 30 seconds
      const interval = setInterval(loadLeaderboard, 30000);
      return () => clearInterval(interval);
    }
  }, [code]);

  const loadLeaderboard = async () => {
    if (!code) return;
    
    try {
      const data = await getLeaderboard(code);
      setLeaderboard(data);
    } catch (error) {
      toast.error('Failed to load leaderboard');
    } finally {
      setIsLoading(false);
    }
  };

  const copyRoomCode = () => {
    if (code) {
      navigator.clipboard.writeText(code);
      toast.success('Room code copied to clipboard!');
    }
  };

  if (!user) {
    navigate('/auth');
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center poop-gradient">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin text-6xl">💩</div>
          <p className="text-amber-900 font-semibold">Loading room...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen poop-gradient p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="text-amber-900 self-start"
          >
            ← Back to Home
          </Button>
          
          <div className="flex items-center gap-2">
            <span className="text-amber-900 font-semibold">Room:</span>
            <code className="bg-amber-100 px-3 py-1 rounded text-amber-900 font-bold">
              {code}
            </code>
            <Button variant="ghost" size="sm" onClick={copyRoomCode}>
              <Copy size={16} />
            </Button>
          </div>
        </div>

        {/* Mascot */}
        <div className="text-center mb-8">
          <PoopMascot size="lg" />
          <h1 className="text-3xl font-bold text-amber-900 mt-4">
            The one & only poop master!
          </h1>
        </div>

        {/* Upload Button */}
        <div className="text-center mb-8">
          <Button
            onClick={() => navigate(`/upload/${code}`)}
            className="poop-button text-xl py-4 px-8"
          >
            📸 Upload Poop
          </Button>
        </div>

        {/* Leaderboard */}
        <div className="poop-card">
          <Tabs defaultValue="daily" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="daily">📊 Today's Leaders</TabsTrigger>
              <TabsTrigger value="allTime">🏅 All-Time Leaders</TabsTrigger>
            </TabsList>

            <TabsContent value="daily">
              <div className="space-y-3">
                {leaderboard?.daily?.map((entry: any, index: number) => (
                  <Card key={index} className={`${entry.username === user.username ? 'ring-2 ring-amber-400' : ''}`}>
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-4">
                        <div className="text-2xl font-bold text-amber-900">
                          #{entry.rank}
                        </div>
                        <div>
                          <div className="font-semibold text-amber-900">
                            {entry.username}
                            {entry.username === user.username && (
                              <span className="text-xs ml-2 bg-amber-200 text-amber-800 px-2 py-1 rounded">
                                You
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-amber-700">
                            {entry.submissions} submissions today
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-amber-900">
                          {entry.score}
                        </div>
                        <div className="text-sm text-amber-700">points</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="allTime">
              <div className="space-y-3">
                {leaderboard?.allTime?.map((entry: any, index: number) => (
                  <Card key={index} className={`${entry.username === user.username ? 'ring-2 ring-amber-400' : ''}`}>
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-4">
                        <div className="text-2xl font-bold text-amber-900">
                          #{entry.rank}
                        </div>
                        <div>
                          <div className="font-semibold text-amber-900">
                            {entry.username}
                            {entry.username === user.username && (
                              <span className="text-xs ml-2 bg-amber-200 text-amber-800 px-2 py-1 rounded">
                                You
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-amber-700">
                            {entry.submissions} total submissions
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-amber-900">
                          {entry.score}
                        </div>
                        <div className="text-sm text-amber-700">total points</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Room;
