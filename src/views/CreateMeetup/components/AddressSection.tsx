import { AddressSectionProps } from '../types'
import styles from '../CreateMeetup.module.scss'

const AddressSection = (props: AddressSectionProps) => {
  const { isOnlineEvent, setIsOnlineEvent, url, setUrl, address, setAddress } =
    props
  return (
    <section className={styles.addressArea}>
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
    </section>
  )
}

export default AddressSection
