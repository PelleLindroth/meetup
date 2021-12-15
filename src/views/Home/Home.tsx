import { useState } from 'react'
import SearchArea from '../../components/SearchArea/SearchArea'
import MeetupList from '../../components/MeetupList'
import { HomeProps } from './types'

const Home = (props: HomeProps) => {
  const { meetups } = props
  const [searchPhrase, setSearchPhrase] = useState<string>('')
  const [searchFilter, setSearchFilter] = useState<string>('all')

  return (
    <>
      <SearchArea
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        searchFilter={searchFilter}
        setSearchFilter={setSearchFilter}
      />
      <section>
        <h2>UPCOMING EVENTS</h2>
        <MeetupList
          meetups={meetups.filter(
            (meetup) =>
              meetup.date.getTime() > Date.now() &&
              meetup.title.toLowerCase().includes(searchPhrase.toLowerCase()) &&
              (searchFilter === 'upcoming' || searchFilter === 'all')
          )}
          upcoming
        />
        <h2>PAST EVENTS</h2>
        <MeetupList
          meetups={meetups.filter(
            (meetup) =>
              meetup.date.getTime() < Date.now() &&
              meetup.title.toLowerCase().includes(searchPhrase.toLowerCase()) &&
              (searchFilter === 'past' || searchFilter === 'all')
          )}
        />
      </section>
    </>
  )
}

export default Home
