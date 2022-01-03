import { useContext, useEffect, useState } from 'react'
import { createMeetupList, list } from '../../utils'
import { DateContext } from '../../contexts/DateContext'
import { Meetup } from '../../db/models/Meetup'
import SearchArea from './components/SearchArea'
import MeetupList from '../components/MeetupList'
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

  const MeetupSection = (props: { meetups: Meetup[]; filter: string }) => {
    const { meetups, filter } = props
    return (
      <section>
        {(searchFilter === filter || searchFilter === 'all') && (
          <h2>{`${filter.toUpperCase()} EVENTS`}</h2>
        )}
        {meetups.length ? (
          <MeetupList meetups={meetups} upcoming={filter === 'upcoming'} />
        ) : (
          (searchFilter === filter || searchFilter === 'all') && (
            <p>
              {searchPhrase.length
                ? `No ${filter} events matches your search`
                : `There are no ${filter} events`}
            </p>
          )
        )}
      </section>
    )
  }

  return (
    <>
      <SearchArea
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        searchFilter={searchFilter}
        setSearchFilter={setSearchFilter}
      />
      <MeetupSection meetups={upcomingMeetups} filter="upcoming" />
      <MeetupSection meetups={pastMeetups} filter="past" />
    </>
  )
}

export default Home
