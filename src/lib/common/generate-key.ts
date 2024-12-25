'use strict'

import hyperid from 'hyperid'

export const getRandomKey = hyperid({ urlSafe: true })
