'use client';

import { useCallback } from 'react';
import { Detail, Flex, Icon, Text } from '@godaddy/antares';
import styles from './index.module.css';

const benefits = [
  {
    title: 'Website Design Services',
    description: 'We’ll build your website so you can get back to focusing on your business.'
  },
  {
    title: 'Marketing Services',
    description: 'Our team of experts will create and manage your social media presence.'
  },
  {
    title: 'SEO Services',
    description: 'We’ll use Google’s best practices to help your site get the traffic it deserves.'
  }
] as const;

/** Lists the services that can support the visitor alongside the inquiry form. */
export function Benefits() {
  const renderBenefit = useCallback(function renderBenefit(benefit: (typeof benefits)[number]) {
    return (
      <Flex as="li" key={benefit.title} gap="sm" alignItems="start">
        <Icon icon="checkmark" width={18} height={18} aria-hidden="true" />
        <Flex direction="column" gap="xs">
          <Text as="strong">{benefit.title}</Text>
          <Detail size="sm">{benefit.description}</Detail>
        </Flex>
      </Flex>
    );
  }, []);

  return (
    <Flex as="ul" direction="column" gap="lg" aria-label="Services we can help with" className={styles.list}>
      {benefits.map(renderBenefit)}
    </Flex>
  );
}
