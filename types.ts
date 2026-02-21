import React from 'react';

export interface NavItem {
  label: string;
  href: string;
}

export interface IconProps {
  size?: number | string;
  strokeWidth?: number | string;
  className?: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ComponentType<IconProps>;
}

export interface PlanDetail {
  ageGroup: string;
  features: string[];
}