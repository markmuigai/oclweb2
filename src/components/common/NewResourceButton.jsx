import React from 'react';
import { startCase, map } from 'lodash';
import { Button, ButtonGroup, Menu, MenuItem, Tooltip } from '@material-ui/core';
import {
  Settings as SettingsIcon,
  ArrowDropDown as DropDownIcon
} from '@material-ui/icons'

const NewResourceButton = ({resources, onClick}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const toggleAnchorEl = event => setAnchorEl(prev => prev ? null : event.currentTarget)

  const onItemClick = resource => {
    onClick(resource)
    toggleAnchorEl()
  }

  const formatResourceName = resource => resource.startsWith('edit') ? startCase(resource) : `Add ${startCase(resource)}`

  return (
    <React.Fragment>
      <Tooltip title='Manage Org Content'>
      <ButtonGroup color='primary' size='small' onClick={toggleAnchorEl}>
        <Button><SettingsIcon /></Button>
        <Button><DropDownIcon /></Button>
      </ButtonGroup>
      </Tooltip>
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={toggleAnchorEl}>
        {
          map(resources, resource => (
            <MenuItem key={resource} onClick={() => onItemClick(resource)}>
              {formatResourceName(resource)}
            </MenuItem>
          ))
        }
      </Menu>
    </React.Fragment>
  )
}

export default NewResourceButton;
