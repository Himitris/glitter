import React from 'react';
import { LucideIcon } from 'lucide-react';
import Card from '../ui/Card';
import { typography } from '../../utils/theme';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  iconColor
}) => {
  return (
    <Card hover className="p-8 text-center">
      <div className="mb-6 flex justify-center">
        <Icon className={`w-12 h-12 ${iconColor}`} />
      </div>
      <h3 className={typography.heading.h3}>{title}</h3>
      <p className={`${typography.body.base} mt-4`}>{description}</p>
    </Card>
  );
};