import { registerIcon } from './register-icon'
import { composeIconList } from './compose-icon-list'

export const iconIndex = (app) => {
  registerIcon(app)
  composeIconList(app)
}
