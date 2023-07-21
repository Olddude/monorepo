import { logger } from 'mylib'

import server from './server'

server.listen(8000, () => {
  logger.log('listening on http://localhost:8000')
})
