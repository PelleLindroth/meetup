import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Meetup } from './db/meetups'
import { getAllMeetups } from './db'
import Home from './views/Home'
import SingleMeetup from './views/SingleMeetup'
import Login from './views/Login'
import Header from './components/Header'
import { User } from './db/users'

function App() {
  const [meetups, setMeetups] = useState<Meetup[]>([])
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const dbMeetups = getAllMeetups()

    setMeetups(dbMeetups)
  }, [])

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Home meetups={meetups} setMeetups={setMeetups} />}
        />
        <Route
          path="/meetup/:id"
          element={<SingleMeetup setMeetups={setMeetups} />}
        />
        {!user && <Route path="/login" element={<Login setUser={setUser} />} />}
      </Routes>
    </>
  )
}

export default App
