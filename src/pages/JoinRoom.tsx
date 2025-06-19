
import React, { useState } from 'react';
import { useRoom } from '../contexts/RoomContext';
import { useNavigate } from 'react-router-dom';
import PoopMascot from '../components/PoopMascot';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const JoinRoom = () => {
  const { joinRoom } = useRoom();
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState('');
  const [isJoining, setIsJoining] = useState(false);

  const handleJoinRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!roomCode || roomCode.length !== 6) {
      toast.error('Please enter a valid 6-character room code');
      return;
    }

    setIsJoining(true);
    try {
      await joinRoom(roomCode);
      toast.success('Successfully joined room!');
      navigate(`/room/${roomCode.toUpperCase()}`);
    } catch (error) {
      toast.error('Failed to join room. Check your room code.');
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div className="min-h-screen poop-gradient p-4">
      <div className="max-w-md mx-auto">
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
            The one & only poop master!
          </h1>
        </div>

        <div className="poop-card">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-amber-900 mb-2">Join a Room</h2>
            <p className="text-amber-700">
              Enter the 6-character room code to join your friends!
            </p>
          </div>

          <form onSubmit={handleJoinRoom} className="space-y-6">
            <div>
              <Input
                type="text"
                placeholder="Room Code (e.g., ABC123)"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                maxLength={6}
                className="w-full text-center text-2xl font-bold tracking-widest"
                disabled={isJoining}
              />
              <p className="text-sm text-amber-600 mt-2 text-center">
                Enter exactly 6 characters
              </p>
            </div>

            <Button
              type="submit"
              className="poop-button w-full"
              disabled={isJoining || roomCode.length !== 6}
            >
              {isJoining ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin">💩</div>
                  Joining Room...
                </div>
              ) : (
                '🔑 Join Room'
              )}
            </Button>

            <Button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="poop-button-secondary w-full"
            >
              🏠 Back to Home
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JoinRoom;
