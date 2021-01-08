import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'

import { awardVar } from '@src/config/apolloClient'
import AwardList from './component/AwardList'
import AwardContext from './AwardContext'
import routePath from '@src/constants/routes'
import { AwardData } from '@src/__generated__/AwardData'

function Award() {
  const history = useHistory()

  const handleGetWinner = useCallback(
    (award: AwardData) => {
      awardVar(award)
      history.push(routePath.drawer)
    },
    [history]
  )

  return (
    <AwardContext.Provider
      value={{
        handleGetWinner: handleGetWinner
      }}
    >
      <AwardList />
    </AwardContext.Provider>
  )
}
export default Award
