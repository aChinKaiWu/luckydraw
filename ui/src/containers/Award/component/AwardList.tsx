import React, { useMemo, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import style from './AwardListStyle.scss'
import logo from '../../../assets/access-logo.png'
import AwardItem from './AwardItem'
import AwardItemCompact from './AwardItemCompact'
import { ADD_AWARD, AWARD_LIST_QUERY } from '../../../query/award'
import { CANDIDATE_LIST_QUERY } from '../../../query/candidates'
import { AwardsList } from '../../../__generated__/AwardsList'
import { CandidatesList } from '../../../__generated__/CandidatesList'
import AwardDerived from './AwardDerived'
import AwardCreation from './AwardCreation'
import Loading from '@src/components/Loading'
import { AwardCreationBody } from './AwardCreation'
import CatImg from '@src/assets/lovely-cat.png'

function AwardList() {
  const [fullView, setFullView] = useState(true)
  const { data: awardsListData, loading, refetch } = useQuery<AwardsList>(AWARD_LIST_QUERY, {
    fetchPolicy: 'network-only'
  })
  const { data: candidatesListData } = useQuery<CandidatesList>(CANDIDATE_LIST_QUERY)
  const [AddAward, { loading: addLoading }] = useMutation(ADD_AWARD, {
    onCompleted: () => {
      refetch()
      document.documentElement.scrollTop = document.documentElement.scrollHeight
    }
  })
  const onViewModeChange = () => {
    setFullView((previous) => !previous)
  }

  const awardsData: AwardDerived[] = useMemo(
    () =>
      awardsListData?.awards
        ?.map((award: any) => {
          const candidateName =
            candidatesListData?.candidates?.find((candidateToCheck: any) => candidateToCheck.id === award.winner)
              ?.name ?? 'unknown'
          return {
            ...award,
            winnerName: candidateName
          }
        })
        .sort((award1, award2) => Number(award1?.id) - Number(award2?.id)) ?? [],
    [awardsListData, candidatesListData]
  )
  const AwardComponent = (awardProps: any) => {
    return fullView ? <AwardItem {...awardProps} /> : <AwardItemCompact {...awardProps} />
  }

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h1>
          <img src={logo} className={style.logo} />
          <span>&nbsp;賞品一覧 PRIZE LIST</span>
        </h1>
      </div>
      <div className={style.content}>
        {loading || addLoading ? (
          <Loading />
        ) : (
          <>
            <AwardCreation
              onCreatAward={(data: AwardCreationBody) => {
                AddAward({
                  variables: {
                    ...data
                  }
                })
              }}
            />
            {awardsData?.map((e) => e && <AwardComponent key={e.id} award={e} />)}
          </>
        )}
      </div>
      <img src={CatImg} className={style.decoration} alt='fortunate cat' />
      <div className={style.viewChange} onClick={onViewModeChange} />
    </div>
  )
}
export default AwardList
