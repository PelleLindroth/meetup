import Search from '../../assets/icons/search.png'
import styles from './SearchArea.module.scss'
import { SearchAreaProps } from './types'

const SearchArea = (props: SearchAreaProps) => {
  const { searchPhrase, setSearchPhrase, searchFilter, setSearchFilter } = props

  return (
    <section className={styles.searchArea}>
      <div className={styles.searchBox}>
        <div className={styles.imageWrapper}>
          <img src={Search} alt="Search icon" />
        </div>
        <input
          type="search"
          placeholder="What do you want to do?"
          value={searchPhrase}
          onChange={(e) => setSearchPhrase(e.currentTarget.value)}
        />
      </div>
      <select
        value={searchFilter}
        onChange={(e) => setSearchFilter(e.target.value)}
        name="search-filter"
        id="search-filter"
      >
        <option value="all">Search all events</option>
        <option value="upcoming">Search upcoming events</option>
        <option value="past">Search past events</option>
      </select>
    </section>
  )
}

export default SearchArea
