import { channels } from './channels'
import { auth } from './auth'
import { games } from './games'
import { player } from './player'

export default {
  ...channels,
  ...auth,
  ...games,
  ...player
};
