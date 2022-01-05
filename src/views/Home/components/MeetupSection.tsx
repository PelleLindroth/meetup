import MeetupList from '../../components/MeetupList'
import { MeetupSectionProps } from '../types'

const MeetupSection = (props: MeetupSectionProps) => {
  const { meetups, filter, searchFilter, searchPhrase } = props

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

export default MeetupSection
