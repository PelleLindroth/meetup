import React, { useContext, useState } from 'react'
import { uid } from 'uid'
import { useNavigate } from 'react-router'
import { DateContext } from '../../contexts/DateContext'
import { addMeetup } from '../../db'
import { Meetup } from '../../db/meetups'
import { CreateMeetupProps } from './types'
import DateTimePicker from 'react-datetime-picker'
import styles from './CreateMeetup.module.scss'
import './create-meetup.scss'

const CreateMeetup = (props: CreateMeetupProps) => {
  const { user, meetups, setMeetups } = props
  const navigate = useNavigate()
  const { customDate } = useContext(DateContext)!
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [date, setDate] = useState<Date>(customDate)
  const [url, setUrl] = useState<string>('')
  const [street, setStreet] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [isOnlineEvent, setIsOnlineEvent] = useState<boolean>(false)
  const [hasMaxCapacity, setHasMaxCapacity] = useState<boolean>(true)
  const [maxCapacity, setMaxCapacity] = useState<number>(100)

  const emptyFields = () => {
    const noLocationFields = () => {
      return !url.length && (!street.length || !city.length)
    }

    return !title.length || !description.length || noLocationFields() || !date
  }

  const handleCreateMeetup = (e: React.SyntheticEvent) => {
    e.preventDefault()

    const meetup: Meetup = {
      id: uid(),
      title,
      description,
      date,
      online: isOnlineEvent,
      capacity: hasMaxCapacity ? maxCapacity : null,
      attending: 0,
      arranger: user,
      reviews: [],
      comments: [],
    }

    // if (!meetup.date) {
    //   meetup.date = customDate
    // }

    if (isOnlineEvent) {
      meetup.url = url
    } else {
      meetup.location = {
        street,
        city,
      }
    }

    setMeetups([...meetups, meetup])
    addMeetup(meetup)
    navigate(`/profile/${user.id}`)
  }

  const handleCancel = () => {
    navigate(`/profile/${user.id}`)
  }

  return (
    <main className={styles.createMeetup}>
      <h1>CREATE A NEW MEETUP</h1>
      <form onSubmit={handleCreateMeetup} aria-label="create-form">
        <div className={styles.inputRow}>
          <label htmlFor="title">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
            maxLength={30}
            className={`${styles.textInput} ${styles.titleInput}`}
            id="title"
            type="text"
          />
        </div>
        <div className={styles.inputRow}>
          <label htmlFor="description">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.currentTarget.value)}
            maxLength={75}
            className={styles.textInput}
            id="description"
          />
        </div>
        <div className={styles.inputRow}>
          <label>Date</label>
          <DateTimePicker
            disableClock={true}
            minDate={customDate}
            onChange={setDate}
            value={date!}
            nativeInputAriaLabel="Date"
          />
        </div>
        <div className={styles.checkboxRow}>
          <label>
            <input
              name="online"
              type="checkbox"
              onChange={() => setIsOnlineEvent(!isOnlineEvent)}
              checked={isOnlineEvent}
            />
            Online event
          </label>
        </div>
        {isOnlineEvent ? (
          <div className={styles.inputRow}>
            <label htmlFor="url">
              Meetup url (will be shown to attendants when they sign up))
            </label>
            <input
              value={url}
              onChange={(e) => setUrl(e.currentTarget.value)}
              id="url"
              type="text"
            />
          </div>
        ) : (
          <div>
            <h4>Address</h4>
            <div className={styles.inputRow}>
              <label htmlFor="street">Street</label>
              <input
                value={street}
                onChange={(e) => setStreet(e.currentTarget.value)}
                id="street"
                type="text"
              />
            </div>
            <div className={styles.inputRow}>
              <label htmlFor="city">City</label>
              <input
                value={city}
                onChange={(e) => setCity(e.currentTarget.value)}
                id="city"
                type="text"
              />
            </div>
          </div>
        )}
        <div className={styles.checkboxRow}>
          <label>
            <input
              checked={hasMaxCapacity}
              onChange={() => setHasMaxCapacity(!hasMaxCapacity)}
              name="capacity-true"
              type="checkbox"
            />
            Max capacity
          </label>
        </div>
        {hasMaxCapacity && (
          <div className={styles.inputRow}>
            <label htmlFor="max-capacity">Maximum number of attendants</label>
            <input
              value={maxCapacity}
              onChange={(e) => setMaxCapacity(+e.currentTarget.value)}
              aria-label="capacity-input"
              id="max-capacity"
              type="number"
              pattern="[0-9]*"
              step={10}
              min={0}
            />
          </div>
        )}
        <div className={styles.buttons}>
          <button onClick={handleCancel} type="button">
            Cancel
          </button>
          <button disabled={emptyFields()}>Create</button>
        </div>
      </form>
    </main>
  )
}

export default CreateMeetup
