import React, { Fragment, useEffect } from 'react'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import LeaderboardItem from './LeaderboardItem'

export default function Leaderboard() {
  let leaderboard = useSelector(state => {
    let users = state.users
    for (const user of Object.values(users)) {
      users[user.id].answered = Object.keys(user.answers).length
      users[user.id].created = user.questions.length
      users[user.id].score = users[user.id].answered + users[user.id].created
    }
    return Object.values(users)
  })

  const latestLeaderboard = useRef(leaderboard)
  useEffect(() => {
    latestLeaderboard.current = leaderboard
    latestLeaderboard.current.sort((a, b) => b.score - a.score)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Fragment>
      {latestLeaderboard.current.map((leader, i) => (
        <LeaderboardItem
          rank={i+1}
          key={leader.id}
          id={leader.id}
          name={leader.name}
          answered={leader.answered}
          created={leader.created}
          score={leader.score}
          avatarURL={leader.avatarURL}
        />
      ))}
    </Fragment>
  )
}