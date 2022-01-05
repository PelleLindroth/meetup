import { useContext, useEffect, useState } from 'react'
import { createMeetupList, ListType } from '../../utils'
import { DateContext } from '../../contexts/DateContext'
import { Meetup } from '../../db/models/Meetup'
import SearchArea from './components/SearchArea'
import MeetupSection from './components/MeetupSection'
import { HomeProps } from './types'

const Home = (props: HomeProps) => {
  const { meetups } = props
  const { customDate } = useContext(DateContext)!
  const [searchPhrase, setSearchPhrase] = useState<string>('')
  const [searchFilter, setSearchFilter] = useState<ListType>('all')
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
      <MeetupSection
        meetups={upcomingMeetups}
        filter="upcoming"
        searchFilter={searchFilter}
        searchPhrase={searchPhrase}
      />
      <MeetupSection
        meetups={pastMeetups}
        filter="past"
        searchFilter={searchFilter}
        searchPhrase={searchPhrase}
      />
    </>
  )
}

export default Home
