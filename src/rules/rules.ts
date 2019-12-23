import { Rules } from '../types/Rules';

// tslint:disable: no-var-requires
const rules: Rules[] = [
  require('./warning.text_sizes_should_be_equal.rule'),
  require('./warning.invalid_button_size.rule'),
  require('./warning.invalid_button_position.rule'),
  require('./warning.invalid_placeholder_size.rule'),
  require('./text.several_h1'),
  require('./text.invalid_h2_position.rule'),
];

export default rules;
