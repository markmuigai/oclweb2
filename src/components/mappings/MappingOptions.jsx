import React from 'react';
import { Menu, MenuItem, MenuList, IconButton } from '@mui/material';
import { MoreVert as MenuIcon } from '@mui/icons-material';
import { map } from 'lodash';

const MappingOptions = ({ mapping }) => {
  const anchorRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const onMenuToggle = event => {
    event.preventDefault()
    event.stopPropagation()
    setOpen(!open)
    return false;
  }

  const onOptionClick = (event, option) => {
    event.preventDefault()
    event.stopPropagation()
    if(option)
      window.location.hash = option.href

    return false
  }

  const compareConceptHref = `/concepts/compare?lhs=${mapping.from_concept_url}&rhs=${mapping.to_concept_url}`
  const getOptions = () => {
    const options = [{label: 'Open Mapping Details', href: mapping.url},]
    const currentURL = window.location.hash.split('?')[0].split('#')[1]

    if(mapping.from_concept_url && mapping.from_concept_url !== currentURL)
      options.push({label: 'Open From Concept', href: mapping.from_concept_url})
    if(mapping.to_concept_url && mapping.to_concept_url !== currentURL)
      options.push({label: 'Open To Concept', href: mapping.to_concept_url})
    if(mapping.to_concept_url && mapping.from_concept_url)
      options.push({label: 'Compare Concepts', href: compareConceptHref})

    return options
  }

  return (
    <React.Fragment>
      <IconButton size='small' color='primary' ref={anchorRef} onClick={onMenuToggle}>
        <MenuIcon fontSize='inherit' />
      </IconButton>
      <Menu open={open} anchorEl={anchorRef.current} onClose={onMenuToggle}>
        <MenuList>
          {
            map(getOptions(), (option, index) => (
              <MenuItem key={index} component='a' href={`/#${option.href}`} onClick={event => onOptionClick(event, option)}>
                {option.label}
              </MenuItem>
            ))
          }
        </MenuList>
      </Menu>
    </React.Fragment>
  )
}

export default MappingOptions;
