import React, { useContext, useState } from 'react'
import { uid } from 'uid'
import { useNavigate } from 'react-router'
import { addMeetup } from '../../db'
import { DateContext } from '../../contexts/DateContext'
import { IAddress, IMeetup, Meetup } from '../../db/models/Meetup'
import {
  AddressSection,
  CapacitySection,
  DetailsSection,
  KeywordSection,
  SubmitSection,
} from './components'
import { CreateMeetupProps } from './types'
import styles from './CreateMeetup.module.scss'
import './create-meetup.scss'

const CreateMeetup = (props: CreateMeetupProps) => {
  const { user, meetups, setMeetups } = props
  const navigate = useNavigate()
  const { customDate, realDate } = useContext(DateContext)!
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [date, setDate] = useState<Date>(customDate || realDate)
  const [url, setUrl] = useState<string>('')
  const [address, setAddress] = useState<IAddress>({ street: '', city: '' })
  const [isOnlineEvent, setIsOnlineEvent] = useState<boolean>(false)
  const [hasMaxCapacity, setHasMaxCapacity] = useState<boolean>(true)
  const [maxCapacity, setMaxCapacity] = useState<number>(100)
  const [keywords, setKeywords] = useState<string[]>([])

  const handleCreateMeetup = (e: React.SyntheticEvent) => {
    e.preventDefault()

    const newMeetup: IMeetup = {
      title,
      description,
      arranger: user,
      date,
      location: isOnlineEvent ? null : address,
      id: uid(),
      online: isOnlineEvent,
      url: isOnlineEvent ? url : null,
      capacity: hasMaxCapacity ? maxCapacity : null,
      attending: 0,
      keywords,
      comments: [],
      reviews: [],
    }

    const meetup = new Meetup(newMeetup)

    setMeetups([...meetups, meetup])
    addMeetup(meetup)
    navigate(`/profile/${user.id}`)
  }

  const emptyFields = () => {
    return !title.length || !description.length || noLocationFields() || !date
  }

  const noLocationFields = () => {
    return !url.length && (!address.street.length || !address.city.length)
  }

  const handleCancel = () => {
    navigate(`/profile/${user.id}`)
  }

  return (
    <main className={styles.createMeetup}>
      <h1>CREATE A NEW MEETUP</h1>
      <form onSubmit={handleCreateMeetup} aria-label="create-form">
        <DetailsSection
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          date={date}
          setDate={setDate}
        />
        <AddressSection
          isOnlineEvent={isOnlineEvent}
          setIsOnlineEvent={setIsOnlineEvent}
          url={url}
          setUrl={setUrl}
          address={address}
          setAddress={setAddress}
        />
        <CapacitySection
          maxCapacity={maxCapacity}
          setMaxCapacity={setMaxCapacity}
          hasMaxCapacity={hasMaxCapacity}
          setHasMaxCapacity={setHasMaxCapacity}
        />
        <KeywordSection keywords={keywords} setKeywords={setKeywords} />
        <SubmitSection handleCancel={handleCancel} emptyFields={emptyFields} />
      </form>
    </main>
  )
}

export default CreateMeetup
