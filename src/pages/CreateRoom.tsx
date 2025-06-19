
import React, { useState } from 'react';
import { useRoom } from '../contexts/RoomContext';
import { useNavigate } from 'react-router-dom';
import PoopMascot from '../components/PoopMascot';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Copy } from 'lucide-react';

const CreateRoom = () => {
  const { createRoom } = useRoom();
  const navigate = useNavigate();
  const [room, setRoom] = useState<any>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateRoom = async () => {
    setIsCreating(true);
    try {
      const newRoom = await createRoom();
      setRoom(newRoom);
      toast.success('Room created successfully!');
    } catch (error) {
      toast.error('Failed to create room');
    } finally {
      setIsCreating(false);
    }
  };

  const copyRoomCode = () => {
    if (room) {
      navigator.clipboard.writeText(room.code);
      toast.success('Room code copied to clipboard!');
    }
  };

  const enterRoom = () => {
    navigate(`/room/${room.code}`);
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

        <div className="poop-card text-center">
          {!room ? (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-amber-900">Create a New Room</h2>
              <p className="text-amber-700">
                Create a room to compete with friends and track your poop scores!
              </p>
              <Button
                onClick={handleCreateRoom}
                className="poop-button w-full"
                disabled={isCreating}
              >
                {isCreating ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin">💩</div>
                    Creating Room...
                  </div>
                ) : (
                  '🏗️ Create Room'
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-amber-900">Room Created!</h2>
              
              <div className="bg-amber-50 p-6 rounded-2xl border-2 border-amber-200">
                <p className="text-amber-700 mb-2">Room Code:</p>
                <div className="text-4xl font-bold text-amber-900 mb-4">
                  {room.code}
                </div>
                <Button
                  onClick={copyRoomCode}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Copy size={16} />
                  Copy Code
                </Button>
              </div>

              <div className="space-y-4">
                <Button
                  onClick={enterRoom}
                  className="poop-button w-full"
                >
                  🚪 Enter Room
                </Button>
                
                <Button
                  onClick={() => navigate('/dashboard')}
                  className="poop-button-secondary w-full"
                >
                  🏠 Back to Home
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
