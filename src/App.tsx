import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Meetup } from './db/models/Meetup'
import { getAllMeetups, getStoredUser } from './db'
import DateContextProvider from './contexts/DateContext'
import Header from './Header'
import Home from './views/Home'
import Login from './views/Login'
import SingleMeetup from './views/SingleMeetup'
import CreateMeetup from './views/CreateMeetup'
import Profile from './views/Profile'
import { UserImpl } from './db/models/User'
import styles from './App/App.module.scss'

function App() {
  const [meetups, setMeetups] = useState<Meetup[]>([])
  const [user, setUser] = useState<UserImpl | null>(null)

  useEffect(() => {
    const dbMeetups = getAllMeetups()

    setMeetups(dbMeetups)

    const user = getStoredUser()

    setUser(user)
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
