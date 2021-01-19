import React, { useMemo } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import style from './AwardListStyle.scss'
import logo from '../../../assets/access-logo.png'
import AwardItem from './AwardItem'
import { ADD_AWARD, AWARD_LIST_QUERY } from '../../../query/award'
import { CANDIDATE_LIST_QUERY } from '../../../query/candidates'
import { AwardsList } from '../../../__generated__/AwardsList'
import { CandidatesList } from '../../../__generated__/CandidatesList'
import AwardDerived from './AwardDerived'
import AwardCreation from './AwardCreation'
import Loading from '@src/components/Loading'
import { AwardCreationBody } from './AwardCreation'

function AwardList() {
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
            {awardsData?.map((e) => e && <AwardItem key={e.id} award={e} />)}
          </>
        )}
      </div>
    </div>
  )
}
export default AwardList
