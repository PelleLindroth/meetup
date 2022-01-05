import { ListType } from '../../../../utils'

export type SearchAreaProps = {
  searchPhrase: string
  setSearchPhrase: React.Dispatch<React.SetStateAction<string>>
  searchFilter: string
  setSearchFilter: React.Dispatch<React.SetStateAction<ListType>>
}
