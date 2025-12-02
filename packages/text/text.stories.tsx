import { getMeta, getComponentDocs, getStory } from '@bento/storybook-addon-helpers';
import { Text as TextComponent } from './src/index.tsx';
import { TextExample } from './examples/text.tsx';
import { AlignExample } from './examples/align.tsx';
import { AsExample } from './examples/as.tsx';
import { MaxLinesExample } from './examples/max-lines.tsx';
import { WrapExample } from './examples/wrap.tsx';

export default getMeta({
  title: 'components/Text'
});

export const Props = getComponentDocs(TextComponent);

export const Text = getStory(TextExample);

export const Align = getStory(AlignExample);

export const As = getStory(AsExample);

export const MaxLines = getStory(MaxLinesExample);

export const Wrap = getStory(WrapExample);
