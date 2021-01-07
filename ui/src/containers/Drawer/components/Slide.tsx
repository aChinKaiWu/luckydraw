import React from 'react'
import styles from '../DrawerStyle.scss'

export default function Slide({ memberList }: { memberList: string[] }) {
  return (
    <div className={styles.slide}>
      <div className={styles.slide_inner}>
        {memberList.map((member, idx) => (
          <div key={idx} className={styles.slide_item}>
            {member}
          </div>
        ))}
      </div>
    </div>
  )
}
