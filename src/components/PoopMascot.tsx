
import React from 'react';

interface PoopMascotProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animate?: boolean;
  useImage?: boolean;
}

const PoopMascot: React.FC<PoopMascotProps> = ({ 
  size = 'lg', 
  animate = false, 
  useImage = false 
}) => {
  const sizeClasses = {
    sm: useImage ? 'w-16 h-16' : 'text-4xl',
    md: useImage ? 'w-24 h-24' : 'text-6xl',
    lg: useImage ? 'w-32 h-32' : 'text-8xl',
    xl: useImage ? 'w-40 h-40' : 'text-9xl'
  };

  if (useImage) {
    return (
      <div className={`${sizeClasses[size]} ${animate ? 'animate-bounce' : ''} select-none`}>
        <img 
          src="/lovable-uploads/0c57f8cb-1f68-4a3c-a389-84ba4e5a8046.png" 
          alt="Poop Mascot" 
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  return (
    <div className={`${sizeClasses[size]} ${animate ? 'animate-bounce' : ''} select-none`}>
      💩
    </div>
  );
};

export default PoopMascot;
