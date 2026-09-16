import { Link } from '@godaddy/antares';

export interface PlaygroundExampleProps {
  /** Destination URL. */
  href?: string;
  /** Link label. */
  children?: string;
}

export function PlaygroundExample({ href = '/about', children = 'About' }: PlaygroundExampleProps) {
  return <Link href={href}>{children}</Link>;
}
