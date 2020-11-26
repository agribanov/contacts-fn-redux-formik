import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar';
import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import makeStyles from '@material-ui/core/styles/makeStyles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 10,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
}));

function Header({ sidebarOpened, toggleSidebar }) {
    const classes = useStyles();

    return (
        <AppBar
            position="absolute"
            classes={{
                root: clsx(
                    classes.appBar,
                    sidebarOpened && classes.appBarShift
                ),
            }}
        >
            <Toolbar className={classes.toolbar}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleSidebar}
                    className={clsx(
                        classes.menuButton,
                        sidebarOpened && classes.menuButtonHidden
                    )}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    className={classes.title}
                >
                    Contacts
                </Typography>
                <Button
                    color="inherit"
                    variant="outlined"
                    startIcon={<AddIcon />}
                    component={Link}
                    to="/form/new"
                >
                    New Contact
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
