import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DefaultExample } from '../examples/default.tsx';
import { SizesExample } from '../examples/sizes.tsx';
import { TagEyebrowExample } from '../examples/tag-eyebrow.tsx';
import { AlignmentExample } from '../examples/alignment.tsx';
import { LegibleLinesExample } from '../examples/legible-lines.tsx';
import { WithActionsExample } from '../examples/with-actions.tsx';
import { OverridesExample } from '../examples/overrides.tsx';
import { NarrowContainerExample } from '../examples/narrow-container.tsx';
import { NestedNarrowContainerExample } from '../examples/nested-narrow-container.tsx';
import { CenteredAncestorExample } from '../examples/centered-ancestor.tsx';
import { InRowExample } from '../examples/in-row.tsx';
import { SlotOwnershipExample } from '../examples/slot-ownership.tsx';

describe('@godaddy/antares', function antares() {
  describe('#TextLockup', function textLockupTests() {
    it('renders the default example', function rendersDefault() {
      expect(renderToString(<DefaultExample />)).toMatchSnapshot();
    });

    it('renders every size', function rendersSizes() {
      expect(renderToString(<SizesExample />)).toMatchSnapshot();
    });

    it('renders a tag eyebrow sized to the lockup', function rendersTagEyebrow() {
      expect(renderToString(<TagEyebrowExample />)).toMatchSnapshot();
    });

    it('renders both alignments', function rendersAlignment() {
      expect(renderToString(<AlignmentExample />)).toMatchSnapshot();
    });

    it('renders with and without the legible-line clamp', function rendersLegibleLines() {
      expect(renderToString(<LegibleLinesExample />)).toMatchSnapshot();
    });

    it('renders alongside actions', function rendersWithActions() {
      expect(renderToString(<WithActionsExample />)).toMatchSnapshot();
    });

    it('lets explicit child props win over the injected defaults', function rendersOverrides() {
      expect(renderToString(<OverridesExample />)).toMatchSnapshot();
    });

    it('renders in a narrow container', function rendersNarrowContainer() {
      expect(renderToString(<NarrowContainerExample />)).toMatchSnapshot();
    });

    it('renders a lockup nested in a narrow container', function rendersNestedNarrowContainer() {
      expect(renderToString(<NestedNarrowContainerExample />)).toMatchSnapshot();
    });

    it('renders inside a centered ancestor', function rendersCenteredAncestor() {
      expect(renderToString(<CenteredAncestorExample />)).toMatchSnapshot();
    });

    it('renders inside a row', function rendersInRow() {
      expect(renderToString(<InRowExample />)).toMatchSnapshot();
    });

    it('renders the slot ownership fixture', function rendersSlotOwnership() {
      expect(renderToString(<SlotOwnershipExample />)).toMatchSnapshot();
    });
  });
});
