import React, { useState, ChangeEvent } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';

type SearchCallback = (searchTerm: string) => void;

interface SearchBarProps {
  onSearch: SearchCallback;
  options: string[];
}

const StyledTextField = styled(TextField)({
  backgroundColor: 'white',
  width: '30%', // Set the desired width
});

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, options }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <Autocomplete
      freeSolo
      options={options}
      renderInput={(params) => (
        <StyledTextField
          {...params}
          label="Søg"
          value={searchTerm}
          onChange={handleChange}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <IconButton onClick={handleSearch} edge="start">
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
      )}
    />
  );
};

export default SearchBar;
