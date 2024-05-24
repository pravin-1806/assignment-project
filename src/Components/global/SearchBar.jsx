import React from 'react'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material';

const SearchBar = ({ RouteList , handleOptionSelectedSuper, selectedOption}) => {

    const ThemeMode=useSelector(store=>store.Theme.mode);

    return (
        <div>
            <Autocomplete
                className='mr-4'
                
                size='small'
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={RouteList.map((option) => option.title)}
                value={selectedOption}
                onChange={handleOptionSelectedSuper}
                renderInput={(params) => (
                    <CssTextField
                        className=' dark:border-white-900'
                        themeMode={ThemeMode}
                        placeholder='Search'
                        multiline
                        style={{width:'200px',maxHeight:'30px'}}
                        {...params}
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                            
                        }}
                    />
                )}
            />
        </div>
    )
}


const CssTextField = styled(TextField)(({ themeMode }) => ({
    '& label.Mui-focused': {
      color: '#A0AAB4',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#B2BAC2',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: themeMode === 'dark' ? 'gray' : 'black',
      },
      '&:hover fieldset': {
        borderColor: '#B2BAC2',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#6F7E8C',
      },
      '& .MuiInputBase-input::placeholder': {
        color: themeMode === 'dark' ? 'gray' : '#000000',
        opacity: 2,
      },
    },
  }));
  

export default SearchBar
