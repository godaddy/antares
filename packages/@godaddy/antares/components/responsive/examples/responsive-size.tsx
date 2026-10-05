import { Box, Heading, Text, TextLockup } from '@godaddy/antares';

/**
 * A `TextLockup` without `size` follows `--antares-size` from a parent, so the app's CSS can change it
 * at its own breakpoint. This dashboard greeting is `md` on small screens and `xl` from `80rem`.
 * Browsers without container style queries keep the lockup's JSX size.
 * @title Responsive size
 * @order 5
 */
export function ResponsiveSizeExample() {
  return (
    <>
      <style>{`
        .responsive-size-example {
          --antares-size: md;
        }

        @media (min-width: 80rem) {
          .responsive-size-example {
            --antares-size: xl;
          }
        }
      `}</style>
      <Box as="header" className="responsive-size-example">
        <TextLockup>
          <Text slot="eyebrow">Dashboard</Text>
          <Heading slot="title" level={1}>
            Welcome back, Ada
          </Heading>
          <Text slot="body">Two domains renew this month. Review them to keep your sites online.</Text>
        </TextLockup>
      </Box>
    </>
  );
}
