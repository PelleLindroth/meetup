import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Meetup } from './db/meetups'
import { getAllMeetups } from './db'
import Header from './Header'
import Home from './views/Home'
import Login from './views/Login'
import SingleMeetup from './views/SingleMeetup'
import CreateMeetup from './views/CreateMeetup'
import Profile from './views/Profile'
import { User } from './db/users'
import styles from './App/App.module.scss'

function App() {
  const [meetups, setMeetups] = useState<Meetup[]>([])
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const dbMeetups = getAllMeetups()

    setMeetups(dbMeetups)
  }, [])

  return (
    <div className={styles.wrapper}>
      <Header user={user} setUser={setUser} />
      <Routes>
        <Route
          path="/"
          element={<Home meetups={meetups} setMeetups={setMeetups} />}
        />
        <Route path="/meetup/:id" element={<SingleMeetup user={user} />} />
        {!user && <Route path="/login" element={<Login setUser={setUser} />} />}
        {user && (
          <Route path="/profile/:id" element={<Profile meetups={meetups} />} />
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
    </div>
  )
}

export default App
