import { Paper } from '@material-ui/core';
import { styled } from '@material-ui/core';

export const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    width: '100%',
    maxWidth: 900,
    color: theme.palette.text.secondary,
    borderRadius: 10,
    boxShadow: '0px 9px 18px rgba(0, 0, 0, 0.18), 0px 5.5px 5px rgba(0, 0, 0, 0.24)'
}));