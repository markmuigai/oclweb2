import React from 'react';
import {
  IconButton, Tooltip,
  List, ListItem, ListItemText, Chip, Divider, Button
} from '@mui/material';
import {
  ExitToApp as LogoutIcon, AccountCircle as AccountIcon,
} from '@mui/icons-material';
import { get } from 'lodash';
import { getCurrentUser, getUserInitials, logoutUser } from '../../common/utils';
import PopperGrow from '../common/PopperGrow';

const UserOptions = () => {
  const initials = getUserInitials()
  const user = getCurrentUser() || {}
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const handleToggle = () => setOpen((prevOpen) => !prevOpen);
  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target))
      return;

    setOpen(false);
  };
  const onHomeClick = event => {
    event.persist();
    handleClose(event);
    window.location.hash = user.url
  };
  const username = get(user, 'username');
  const displayName = get(user, 'name') || username;

  return (
    <React.Fragment>
      <Tooltip arrow title={username || ''}>
        {
          user.logo_url ?
          <IconButton touch='true' onClick={handleToggle} ref={anchorRef} size="large">
            <img src={user.logo_url} className='user-img-small' />
          </IconButton> :
          <IconButton
            ref={anchorRef}
            aria-controls={open ? 'split-button-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
            touch='true'
            className='user-info-icon'
            size="large">
            {initials}
          </IconButton>
        }
      </Tooltip>
      <PopperGrow open={open} anchorRef={anchorRef} handleClose={handleClose}>
        <List style={{paddingBottom: 0, paddingTop: 0}}>
          <ListItem>
            <ListItemText style={{textAlign: 'center'}}>
              <div className='col-md-12'>
                {
                  user.logo_url ?
                  <img src={user.logo_url} className='user-img-medium' /> :
                  <AccountIcon style={{width: '80px', height: '80px', color: 'gray'}} />
                }
              </div>
              <ListItemText className='list-item-text-bold-primary' primary={displayName} secondary={user.email} />
              <Chip className='manage-account-chip' label={<span style={{fontWeight: 'bold'}}>My Profile</span>} onClick={onHomeClick} />
            </ListItemText>
          </ListItem>
          <Divider />
          <ListItem style={{display: 'flex', justifyContent: 'center', padding: '16px'}}>
            <Button size='small' startIcon={<LogoutIcon fontSize='inherit' color='inherit' />} variant='outlined' onClick={() => logoutUser(true)}>
              Sign Out
            </Button>
          </ListItem>
        </List>
      </PopperGrow>
    </React.Fragment>
  );
}

export default UserOptions;
