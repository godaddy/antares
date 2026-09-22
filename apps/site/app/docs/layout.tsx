import { getDocsPageTree } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';

/**
 * Shares documentation navigation, including the Blocks catalog, across docs pages.
 *
 * @param props - {@link LayoutProps} for the documentation route.
 */
export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <DocsLayout tree={getDocsPageTree()} {...baseOptions}>
      {children}
    </DocsLayout>
  );
}
