import React from 'react';

interface RegistryLogoProps {
  registry: string;
  className?: string;
}

export function RegistryLogo({ registry, className = "h-8 w-8" }: RegistryLogoProps) {
  const logoUrls: Record<string, string> = {
    'CER': 'https://images.unsplash.com/photo-1584036553516-bf83210aa16c?auto=format&fit=crop&w=32&h=32&q=80',
    'Verra': 'https://images.unsplash.com/photo-1584036553516-bf83210aa16c?auto=format&fit=crop&w=32&h=32&q=80',
    'Gold Standard': 'https://images.unsplash.com/photo-1584036553516-bf83210aa16c?auto=format&fit=crop&w=32&h=32&q=80',
    'ACR': 'https://images.unsplash.com/photo-1584036553516-bf83210aa16c?auto=format&fit=crop&w=32&h=32&q=80'
  };

  const logoUrl = logoUrls[registry];

  if (!logoUrl) {
    return (
      <div className={`bg-gray-200 rounded-full ${className} flex items-center justify-center`}>
        <span className="text-gray-500 text-xs">{registry.substring(0, 2)}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center">
      <img 
        src={logoUrl}
        alt={`${registry} logo`}
        className={`${className} rounded-full object-contain bg-white`}
      />
    </div>
  );
}