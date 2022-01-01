import React, { useEffect, useState } from 'react'

export interface DateContextInterface {
  customDate: Date | null
  realDate: Date
  setCustomDate: React.Dispatch<React.SetStateAction<Date | null>>
}

export const DateContext = React.createContext<DateContextInterface | null>(
  null
)

const DateContextProvider: React.FC = (props) => {
  const [customDate, setCustomDate] = useState<Date | null>(null)
  const [realDate, setRealDate] = useState<Date>(new Date())
  const ONE_SECOND = 1000

  const dateContext: DateContextInterface = {
    customDate,
    setCustomDate,
    realDate,
  }

  useEffect(() => {
    setRealDate(new Date())

    const interval = setInterval(() => {
      if (!customDate) {
        setRealDate(new Date())
      }
    }, ONE_SECOND)

    return () => {
      clearInterval(interval)
    }
  }, [customDate])

  return (
    <DateContext.Provider value={dateContext}>
      {props.children}
    </DateContext.Provider>
  )
}

export default DateContextProvider
