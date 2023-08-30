import MuiAutocomplete, { AutocompleteProps } from '@mui/material/Autocomplete'
import { IconSearch } from '@tabler/icons-react'

const Autocomplete = <
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
>(
  props: Omit<
    AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
    'renderInput' | 'filterOptions'
  >,
) => {
  return (
    <MuiAutocomplete
      autoSelect
      classes={{
        root: 'rounded',
        noOptions: 'bg-white/50 backdrop-filter backdrop-blur',
        loading: 'bg-white/50 backdrop-filter backdrop-blur',
        listbox: 'p-0 bg-white/50 backdrop-filter backdrop-blur max-h-64',
        option: 'hover:bg-white bg-opacity-100',
        paper: ' shadow-md border border-white mt-1 bg-transparent rounded',
      }}
      handleHomeEndKeys
      // filterOptions={(x) => x}
      renderInput={(params) => (
        <div ref={params.InputProps.ref} className="flex items-center h-full">
          <input
            type="text"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...params.inputProps}
            className="w-full py-2 pl-3 pr-8 rounded shadow-none focus:ring-0 "
            placeholder="Search"
          />
          <IconSearch className="w-4 h-4 text-gray-800 stroke-2 -ml-7" />
        </div>
      )}
      {...props}
    />
  )
}

export { Autocomplete }
