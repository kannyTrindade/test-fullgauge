import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Logo  from  '../logo';
import { useUserStore } from '../../store/user';
import { usePaginationStore } from "../../store/pagination";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginLeft: 0,
  width: '100%'
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  right: 0
}));

const LogoContainer = styled('div')(({ theme }) => ({
  height: '40px',
  display: 'flex',
  padding: '0 10px'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 6, 1, 2),
    transition: theme.transitions.create('width'),
  },
}));

const SearchBar = () => {
  const { genericSearch, users } = useUserStore();
  const { setTotalPages } = usePaginationStore();
  const [ searchFilter, setSearchFilter ] = useState('');

  function handleFilterText(text: string){
    setSearchFilter(text);
    genericSearch(text);
    text !== '' ? setTotalPages(0) : setTotalPages(users.length)
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" color='primary'>
        <Toolbar>
          <LogoContainer>
            <Logo />
          </LogoContainer>
            
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Buscar..."
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={e => handleFilterText(e.target.value)}
                    value={searchFilter}
                />
            </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default SearchBar