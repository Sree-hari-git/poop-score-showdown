
import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRoom } from '../contexts/RoomContext';
import PoopMascot from '../components/PoopMascot';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const Upload = () => {
  const { code } = useParams<{ code: string }>();
  const { uploadImage } = useRoom();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be smaller than 5MB');
      return;
    }

    setSelectedFile(file);
    
    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleUpload = async () => {
    if (!selectedFile || !code) return;

    setIsAnalyzing(true);
    try {
      const result = await uploadImage(selectedFile, code);
      setAnalysis(result);
      toast.success('Poop analyzed successfully!');
    } catch (error) {
      toast.error('Failed to analyze image');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetUpload = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setAnalysis(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen poop-gradient p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(`/room/${code}`)}
            className="mb-4 text-amber-900"
          >
            ← Back to Room
          </Button>
          <PoopMascot size="lg" />
          <h1 className="text-3xl font-bold text-amber-900 mt-4">
            The one & only poop master!
          </h1>
        </div>

        {!analysis ? (
          <div className="poop-card">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-amber-900 mb-2">Upload Your Poop</h2>
              <p className="text-amber-700">
                Take a photo of your masterpiece for AI analysis!
              </p>
            </div>

            {!selectedFile ? (
              <div className="space-y-6">
                <div 
                  className="border-2 border-dashed border-amber-300 rounded-2xl p-8 text-center cursor-pointer hover:border-amber-400 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="text-6xl mb-4">📸</div>
                  <p className="text-amber-700 font-semibold mb-2">Click to upload or drag & drop</p>
                  <p className="text-sm text-amber-600">JPEG or PNG, max 5MB</p>
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="space-y-6">
                {previewUrl && (
                  <div className="text-center">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="max-w-full h-64 object-contain mx-auto rounded-lg"
                    />
                  </div>
                )}

                {isAnalyzing ? (
                  <Card className="bg-amber-50">
                    <CardContent className="text-center py-8">
                      <div className="animate-bounce text-6xl mb-4">🤖</div>
                      <p className="text-amber-900 font-semibold text-lg mb-2">
                        AI is analyzing your poop...
                      </p>
                      <p className="text-amber-700">This may take 30-60 seconds</p>
                      <div className="w-full bg-amber-200 rounded-full h-2 mt-4">
                        <div className="bg-amber-600 h-2 rounded-full animate-pulse w-3/4"></div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="flex gap-4">
                    <Button
                      onClick={handleUpload}
                      className="poop-button flex-1"
                    >
                      🔍 Analyze Poop
                    </Button>
                    <Button
                      onClick={resetUpload}
                      className="poop-button-secondary flex-1"
                    >
                      🗑️ Remove
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Results */}
            <Card className="poop-card">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl text-amber-900 mb-2">
                  Analysis Complete!
                </CardTitle>
                <div className="text-6xl font-bold text-amber-900">
                  {analysis.score}/150
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Score Breakdown */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl">📏</div>
                    <div className="font-semibold text-amber-900">Size</div>
                    <div className="text-lg font-bold">{analysis.sizeScore}/50</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl">🎨</div>
                    <div className="font-semibold text-amber-900">Color</div>
                    <div className="text-lg font-bold">{analysis.colorScore}/50</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl">🧪</div>
                    <div className="font-semibold text-amber-900">Texture</div>
                    <div className="text-lg font-bold">{analysis.textureScore}/50</div>
                  </div>
                </div>

                {/* AI Analysis */}
                <div className="bg-amber-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-amber-900 mb-2">AI Analysis:</h3>
                  <p className="text-amber-800">{analysis.analysis}</p>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-4">
              <Button
                onClick={() => navigate(`/room/${code}`)}
                className="poop-button flex-1"
              >
                🏆 View Leaderboard
              </Button>
              <Button
                onClick={resetUpload}
                className="poop-button-secondary flex-1"
              >
                📸 Upload Another
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
