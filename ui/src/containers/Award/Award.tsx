import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'

import AwardList from './component/AwardList'
import AwardContext from './AwardContext'
import { routePath } from '../App'

function Award() {
  const history = useHistory()
  const handleGetWinner = useCallback(() => history.push(routePath.drawer), [history])

  return (
    <AwardContext.Provider
      value={{
        mockData: [true, false, false, false, true],
        handleGetWinner: handleGetWinner
      }}
    >
      <AwardList />
    </AwardContext.Provider>
  )
}
export default Award
