import Divider from '@material-ui/core/Divider';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';
import ContactsList from './ContactsList';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: 0,
    },
    searchBox: {
        margin: 5,
    },
}));

function Sidebar({ sidebarOpened, toggleSidebar }) {
    const classes = useStyles();
    return (
        <Drawer
            variant="permanent"
            classes={{
                paper: `${classes.drawerPaper} ${
                    !sidebarOpened ? classes.drawerPaperClose : ''
                }`,
            }}
            open={sidebarOpened}
        >
            <div className={classes.toolbarIcon}>
                <IconButton onClick={toggleSidebar}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />

            <TextField
                id="standard-basic"
                placeholder="Search for Contact"
                className={classes.searchBox}
                InputProps={{
                    endAdornment: <SearchIcon />,
                }}
            />
            <Divider />
            <ContactsList />
        </Drawer>
    );
}

export default Sidebar;
