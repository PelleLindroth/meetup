import { useState } from 'react'
import { createMeetupList } from '../../utils'
import SearchArea from './components/SearchArea/SearchArea'
import MeetupList from './components/MeetupList'
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
        {(searchFilter === 'upcoming' || searchFilter === 'all') && (
          <h2>UPCOMING EVENTS</h2>
        )}
        <MeetupList
          meetups={createMeetupList(
            meetups,
            'upcoming',
            searchPhrase,
            searchFilter
          )}
          upcoming
        />
        {(searchFilter === 'past' || searchFilter === 'all') && (
          <h2>PAST EVENTS</h2>
        )}

        <MeetupList
          meetups={createMeetupList(
            meetups,
            'past',
            searchPhrase,
            searchFilter
          )}
        />
      </section>
    </>
  )
}

export default Home
