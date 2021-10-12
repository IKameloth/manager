import { makeStyles } from '@material-ui/core';

export const useRolesStyle = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxWidth: 900,
    borderRadius: '10px',
    boxShadow: '0px 9px 18px rgba(0, 0, 0, 0.18), 0px 5.5px 5px rgba(0, 0, 0, 0.24)',
  },
  container: {
    alignItems: 'center',
    margin: '9px 25px 8px 25px'
  },
  table: {
    border: 'none',
    height: 420,
    '& .MuiDataGrid-columnsContainer': {
      padding: '10px',
      color: 'rgba(0, 0, 0, 0.55)',
    },
    '& .MuiDataGrid-iconSeparator': {
      display: 'none',
    },
    '& .MuiFormControl-root': {
      width: 180,
      height: 36,
      padding: '6px 9px 6px 8px',
      borderRadius: 10,
      marginTop: theme.spacing(1),
      color: '#1A75FF',
    },
    '& .MuiDataGrid-footerContainer': {
      justifyContent: 'center',
    },
    '& .MuiTablePagination-root': {
      color: 'rgba(0, 0, 0, 0.55)',
    },
    '& .MuiDataGrid-columnHeaderDraggableContainer': {
      width: 'auto',
    },
    '& .MuiDataGrid-columnSeparator': {
      display: 'none',
    },
    '& .MuiDataGrid-main': {
      marginTop: theme.spacing(1),
    },
  },
  avatarContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    '& label': {
      marginLeft: 20
    }
  },
  avatarName: {
    marginLeft: 10,
    backgroundColor: theme.palette.primary.main,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  statusActive: {
    color: "#209E25", 
    backgroundColor: '#C2FFCC'
  },
  statusInactive: {
    color: "#FFA31A", 
    backgroundColor: '#FFF6E8'
  },
  actionContent: {
    cursor: 'pointer',
  }
}));
