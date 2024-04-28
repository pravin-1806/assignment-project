import React from 'react'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

const SearchBar = ({ RouteList , handleOptionSelectedSuper, selectedOption}) => {
    return (
        <div>
            <Autocomplete
                className='me-4'
                size='small'
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={RouteList.map((option) => option.title)}
                value={selectedOption}
                onChange={handleOptionSelectedSuper}
                renderInput={(params) => (
                    <TextField
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

export default SearchBar
