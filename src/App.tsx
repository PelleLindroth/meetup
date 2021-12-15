import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Meetup } from './db/meetups'
import { getAllMeetups } from './db'
import Home from './views/Home'
import SingleMeetup from './views/SingleMeetup'

function App() {
  const [meetups, setMeetups] = useState<Meetup[]>([])

  useEffect(() => {
    const dbMeetups = getAllMeetups()

    setMeetups(dbMeetups)
  }, [])

  return (
    <Routes>
      <Route
        path="/"
        element={<Home meetups={meetups} setMeetups={setMeetups} />}
      />
      <Route
        path="/meetup/:id"
        element={<SingleMeetup setMeetups={setMeetups} />}
      />
    </Routes>
  )
}

export default App
