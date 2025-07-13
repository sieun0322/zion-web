import AndroidIcon from './AndroidIcon';
import AppleIcon from './AppleIcon';
import GitHubIcon from './GitHubIcon';

type IconName = 'github' | 'external' | 'android' | 'apple';

type IconProps = {
  name: IconName;
  className?: string;
};

export function Icon({ name, className }: IconProps) {
  const icons: Record<IconName, JSX.Element> = {
    github: <GitHubIcon className={className} />,
    android: <AndroidIcon className={className} />,
    apple: <AppleIcon className={className} />,
  };

  return icons[name] ?? null;
}
