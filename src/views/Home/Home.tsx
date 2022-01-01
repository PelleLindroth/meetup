import { useContext, useEffect, useState } from 'react'
import { createMeetupList, list } from '../../utils'
import { DateContext } from '../../contexts/DateContext'
import { Meetup } from '../../db/models/Meetup'
import SearchArea from './components/SearchArea/SearchArea'
import MeetupList from './components/MeetupList'
import { HomeProps } from './types'

const Home = (props: HomeProps) => {
  const { meetups } = props
  const { customDate } = useContext(DateContext)!
  const [searchPhrase, setSearchPhrase] = useState<string>('')
  const [searchFilter, setSearchFilter] = useState<list>('all')
  const [upcomingMeetups, setUpcomingMeetups] = useState<Meetup[]>([])
  const [pastMeetups, setPastMeetups] = useState<Meetup[]>([])

  useEffect(() => {
    setUpcomingMeetups(
      createMeetupList(
        meetups,
        'upcoming',
        searchPhrase,
        searchFilter,
        customDate || new Date()
      )
    )
    setPastMeetups(
      createMeetupList(
        meetups,
        'past',
        searchPhrase,
        searchFilter,
        customDate || new Date()
      )
    )
  }, [customDate, meetups, searchFilter, searchPhrase])

  return (
    <>
      <SearchArea
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        searchFilter={searchFilter}
        setSearchFilter={setSearchFilter}
      />
      <section>
        {(searchFilter === 'upcoming' || searchFilter === 'all') && (
          <h2>UPCOMING EVENTS</h2>
        )}
        {upcomingMeetups.length ? (
          <MeetupList meetups={upcomingMeetups} upcoming />
        ) : (
          <p>There are no upcoming events</p>
        )}
        {(searchFilter === 'past' || searchFilter === 'all') && (
          <h2>PAST EVENTS</h2>
        )}
        {pastMeetups.length ? (
          <MeetupList meetups={pastMeetups} />
        ) : (
          <p>There are no past events</p>
        )}
      </section>
    </>
  )
}

export default Home
