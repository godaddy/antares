'use client';

import { Box, type BoxProps } from '@godaddy/antares';
import type { ReactNode } from 'react';
import styles from './index.module.css';

interface DashboardCardProps {
  /** Content rendered inside the raised card surface. */
  children: ReactNode;

  /** Semantic Antares spacing used inside the card surface. */
  padding?: BoxProps['padding'];

  /** Optional class name used for a card-specific responsive treatment. */
  className?: string;
}

/** Provides the shared Antares card surface used by the dashboard cards. */
export function DashboardCard({ children, className, padding = 'lg' }: DashboardCardProps) {
  const cardClassName = className ? `${styles.card} ${className}` : styles.card;

  return (
    <Box padding={padding} rounding="lg" elevation="card" className={cardClassName}>
      {children}
    </Box>
  );
}
