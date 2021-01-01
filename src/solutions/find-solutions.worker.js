import {findSolutions} from './find-solutions-v5'


self.onmessage = (message) => {
  findSolutions(message.data, self.postMessage)
}
