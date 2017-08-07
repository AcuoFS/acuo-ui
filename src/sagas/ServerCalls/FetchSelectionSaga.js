/**
 * Created by Rui on 7/8/17.
 */

import { MARGIN_SELECTION_URL } from '../../constants/APIcalls'

export const FetchSelectionSaga = () => (
  fetch(MARGIN_SELECTION_URL).then((response) => {
    return response.json()
  }).then((obj) => {
    return obj
  })
)