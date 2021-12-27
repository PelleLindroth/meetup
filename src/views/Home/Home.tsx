import { useContext, useState } from 'react'
import { createMeetupList, list } from '../../utils'
import { DateContext } from '../../contexts/DateContext'
import SearchArea from './components/SearchArea/SearchArea'
import MeetupList from './components/MeetupList'
import { HomeProps } from './types'

const Home = (props: HomeProps) => {
  const { meetups } = props
  const { customDate } = useContext(DateContext)!
  const [searchPhrase, setSearchPhrase] = useState<string>('')
  const [searchFilter, setSearchFilter] = useState<list>('all')

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
            searchFilter,
            customDate
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
            searchFilter,
            customDate
          )}
        />
      </section>
    </>
  )
}

export default Home
