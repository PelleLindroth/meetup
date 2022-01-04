import { useState } from 'react'
import { KeywordSectionProps } from '../types'
import styles from '../CreateMeetup.module.scss'

const KeywordSection = (props: KeywordSectionProps) => {
  const { keywords, setKeywords } = props
  const [keyword, setKeyword] = useState<string>('')

  const handleAddKeyword = () => {
    let wordArray = keyword.split(' ')

    if (wordArray.length > 1) {
      wordArray = wordArray.filter((word) => {
        if (word.length) {
          return word.trim().toLowerCase()
        } else {
          return null
        }
      })

      setKeywords([...keywords, ...wordArray])
    } else {
      setKeywords([...keywords, wordArray[0].trim().toLowerCase()])
    }

    setKeyword('')
  }

  return (
    <section className={styles.keywordArea}>
      <h4>Keywords</h4>
      <ul className={styles.keywordList} aria-label="keywords">
        {keywords.map((keyword, index) => (
          <li
            className={styles.keyword}
            key={`${index}${keyword}`}
            aria-label="keyword"
          >
            <p>{keyword}</p>
          </li>
        ))}
      </ul>
      <div className={styles.inputRow}>
        <input
          aria-label="Add new keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.currentTarget.value)}
          id="keyword"
          type="text"
          placeholder="New keyword"
        />
        <button
          type="button"
          onClick={handleAddKeyword}
          disabled={!keyword.length}
        >
          Add
        </button>
      </div>
    </section>
  )
}

export default KeywordSection
