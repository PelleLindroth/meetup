import React, { useState } from 'react'

export interface DateContextInterface {
  customDate: Date
  setCustomDate: React.Dispatch<React.SetStateAction<Date>>
}

export const DateContext = React.createContext<DateContextInterface | null>(
  null
)

const DateContextProvider: React.FC = (props) => {
  const [customDate, setCustomDate] = useState<Date>(new Date())

  const dateContext: DateContextInterface = {
    customDate,
    setCustomDate,
  }

  return (
    <DateContext.Provider value={dateContext}>
      {props.children}
    </DateContext.Provider>
  )
}

export default DateContextProvider
