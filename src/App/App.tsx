import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { getAllMeetups, getStoredUser } from '../db'
import { Meetup } from '../db/models/Meetup'
import { User } from '../db/models/User'
import DateContextProvider from '../contexts/DateContext'
import Header from '../Header'
import { Home, Login, SingleMeetup, CreateMeetup, Profile } from '../views'
import styles from './App.module.scss'

function App() {
  const [meetups, setMeetups] = useState<Meetup[]>([])
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    setMeetups(getAllMeetups())
    setUser(getStoredUser())
  }, [])

  return (
    <div className={styles.wrapper}>
      <DateContextProvider>
        <Header user={user} setUser={setUser} />
        <Routes>
          <Route
            path="/"
            element={<Home meetups={meetups} setMeetups={setMeetups} />}
          />
          <Route
            path="/meetup/:id"
            element={<SingleMeetup meetups={meetups} user={user} />}
          />
          {!user && (
            <Route path="/login" element={<Login setUser={setUser} />} />
          )}
          {user && (
            <Route
              path="/profile/:id"
              element={<Profile meetups={meetups} />}
            />
          )}
          {user && (
            <Route
              path="/create"
              element={
                <CreateMeetup
                  user={user}
                  meetups={meetups}
                  setMeetups={setMeetups}
                />
              }
            />
          )}
        </Routes>
      </DateContextProvider>
    </div>
  )
}

export default App
