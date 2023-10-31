import { extend, localize } from 'vee-validate'

import {
    max as rule_max,
} from 'vee-validate/dist/rules'

export const max = extend('max', rule_max)