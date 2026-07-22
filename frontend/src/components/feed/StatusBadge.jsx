import React from 'react';
import { ShieldCheck, AlertTriangle, Clock } from 'lucide-react';

/**
 * StatusBadge Component
 * Displays post verification status: VERIFIED, SUSPICIOUS, IN_PROGRESS
 */
export const STATUS_TYPES = {
  VERIFIED: 'VERIFIED',
  SUSPICIOUS: 'SUSPICIOUS',
  IN_PROGRESS: 'IN_PROGRESS',
};

const StatusBadge = ({ status, showIcon = true, size = 'md' }) => {
  const configs = {
    [STATUS_TYPES.VERIFIED]: {
      label: '데이터 검증완료',
      sublabel: 'Verified Data',
      bg: 'bg-emerald-500/10 hover:bg-emerald-500/15',
      text: 'text-emerald-400',
      border: 'border-emerald-500/30',
      glow: 'glow-verified',
      icon: ShieldCheck,
    },
    [STATUS_TYPES.SUSPICIOUS]: {
      label: '편향/오류 의심',
      sublabel: 'Suspicious Bias',
      bg: 'bg-rose-500/10 hover:bg-rose-500/15',
      text: 'text-rose-400',
      border: 'border-rose-500/30',
      glow: 'glow-suspicious',
      icon: AlertTriangle,
    },
    [STATUS_TYPES.IN_PROGRESS]: {
      label: '교차검증 진행중',
      sublabel: 'In Progress',
      bg: 'bg-amber-500/10 hover:bg-amber-500/15',
      text: 'text-amber-400',
      border: 'border-amber-500/30',
      glow: 'glow-in-progress',
      icon: Clock,
    },
  };

  const config = configs[status] || configs[STATUS_TYPES.IN_PROGRESS];
  const IconComponent = config.icon;

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-2.5 py-1 text-xs gap-1.5 font-medium',
    lg: 'px-3.5 py-1.5 text-sm gap-2 font-semibold',
  }[size];

  return (
    <span
      className={`inline-flex items-center rounded-full border ${config.bg} ${config.text} ${config.border} ${config.glow} ${sizeClasses} transition-all duration-200`}
    >
      {showIcon && <IconComponent className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />}
      <span>{config.label}</span>
    </span>
  );
};

export default StatusBadge;
