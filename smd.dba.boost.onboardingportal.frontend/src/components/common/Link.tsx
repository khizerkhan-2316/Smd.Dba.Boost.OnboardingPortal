import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { LinkProps } from '../../types/componentProps';

const StyledLink = styled(RouterLink)(({ theme }) => ({
  color: '#3269c8',
  textDecoration: 'none',
  padding: '10px 10px',
  '&:hover': {
    backgroundColor: '#F1F3F7',
    borderRadius: '4px',
  },
}));

const Link = ({ to, children }: LinkProps) => {
  return <StyledLink to={to}>{children}</StyledLink>;
};

export default Link;
