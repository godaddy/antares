import { config } from '../../../configs/tsdown.config.mts';
import { mergeConfig } from 'tsdown';

export default mergeConfig(config, {
  entry: ['src/index.ts']
});
