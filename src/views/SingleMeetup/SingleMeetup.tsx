import { useParams } from 'react-router'
import { getMeetupById } from '../../db'
import { SingleMeetupProps } from './types'

const SingleMeetup = (props: SingleMeetupProps) => {
  const { id } = useParams()
  const meetup = getMeetupById(id!)

  if (!meetup) {
    return <h2>Meetup not found</h2>
  }

  return <h1>{meetup.title}</h1>
}

export default SingleMeetup