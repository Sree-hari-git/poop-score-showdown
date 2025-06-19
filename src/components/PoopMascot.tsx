
import React from 'react';

interface PoopMascotProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animate?: boolean;
}

const PoopMascot: React.FC<PoopMascotProps> = ({ size = 'lg', animate = false }) => {
  const sizeClasses = {
    sm: 'text-4xl',
    md: 'text-6xl',
    lg: 'text-8xl',
    xl: 'text-9xl'
  };

  return (
    <div className={`${sizeClasses[size]} ${animate ? 'animate-bounce' : ''} select-none`}>
      💩
    </div>
  );
};

export default PoopMascot;
