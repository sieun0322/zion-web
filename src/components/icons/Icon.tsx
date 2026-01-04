import React from 'react';
import AndroidIcon from './AndroidIcon';
import AppleIcon from './AppleIcon';
import GitHubIcon from './GitHubIcon';

type IconName = 'github' | 'external' | 'android' | 'apple';

type IconProps = {
  name: IconName;
  className?: string;
};

export function Icon({ name, className }: IconProps) {
  const icons: Record<IconName, React.ReactElement> = {
    github: <GitHubIcon className={className} />,
    android: <AndroidIcon className={className} />,
    apple: <AppleIcon className={className} />,
    external: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M7 17L17 7"></path>
        <path d="M7 7h10v10"></path>
      </svg>
    ),
  };

  return icons[name] ?? null;
}
