import React, { useContext, useState } from 'react'
import { uid } from 'uid'
import { useNavigate } from 'react-router'
import { DateContext } from '../../contexts/DateContext'
import { addMeetup } from '../../db'
import { IAddress, IMeetup, Meetup } from '../../db/models/Meetup'
import { CreateMeetupProps } from './types'
import DateTimePicker from 'react-datetime-picker'
import styles from './CreateMeetup.module.scss'
import './create-meetup.scss'
import KeywordSection from './components/KeywordSection'

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

  const emptyFields = () => {
    const noLocationFields = () => {
      return !url.length && (!address.street.length || !address.city.length)
    }

    return !title.length || !description.length || noLocationFields() || !date
  }

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

  const handleCancel = () => {
    navigate(`/profile/${user.id}`)
  }

  return (
    <main className={styles.createMeetup}>
      <h1>CREATE A NEW MEETUP</h1>
      <form onSubmit={handleCreateMeetup} aria-label="create-form">
        <div className={styles.detailsArea}>
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
              minDate={customDate || realDate}
              onChange={setDate}
              value={date!}
              nativeInputAriaLabel="Date"
            />
          </div>
        </div>
        <div className={styles.addressArea}>
          <h4>Address</h4>
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
                type="url"
              />
            </div>
          ) : (
            <div>
              <div className={styles.inputRow}>
                <label htmlFor="street">Street</label>
                <input
                  value={address.street}
                  onChange={(e) =>
                    setAddress({ ...address, street: e.currentTarget.value })
                  }
                  id="street"
                  type="text"
                />
              </div>
              <div className={styles.inputRow}>
                <label htmlFor="city">City</label>
                <input
                  value={address.city}
                  onChange={(e) =>
                    setAddress({ ...address, city: e.currentTarget.value })
                  }
                  id="city"
                  type="text"
                />
              </div>
            </div>
          )}
        </div>
        <div className={styles.capacityArea}>
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
          {hasMaxCapacity ? (
            <div className={styles.inputRow}>
              <label htmlFor="max-capacity">Maximum number of attendants</label>
              <input
                value={maxCapacity}
                onChange={(e) => setMaxCapacity(+e.currentTarget.value)}
                aria-label="capacity-input"
                id="max-capacity"
                type="number"
                pattern="[0-9]*"
                min={0}
              />
            </div>
          ) : (
            <p>
              <strong>This meetup has unlimited capacity</strong>
            </p>
          )}
        </div>
        <KeywordSection keywords={keywords} setKeywords={setKeywords} />
        <div className={styles.buttons}>
          <button
            className={styles.cancelButton}
            onClick={handleCancel}
            type="button"
          >
            Cancel
          </button>
          <button className={styles.mainButton} disabled={emptyFields()}>
            Create
          </button>
        </div>
      </form>
    </main>
  )
}

export default CreateMeetup
