import React from 'react';
import {
  LocalOfferOutlined as LocalOfferIcon
} from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import { toFullAPIURL, copyURL } from '../../common/utils';

const ConceptIcon = ({ url, shrink }) => {
  const onIconClick = () => copyURL(toFullAPIURL(url))
  const classes = 'no-side-padding col-xs-1 home-icon concept flex-vertical-center' + (shrink ? ' small' : '')

  return (
    <div className={classes} style={{width: '5%', cursor: 'auto'}}>
      {
        url ?
        <Tooltip arrow title='Copy URL'>
          <LocalOfferIcon onClick={onIconClick} className='default-svg' />
        </Tooltip> :
        <LocalOfferIcon className='default-svg' />
      }
    </div>
  );
}

export default ConceptIcon;
