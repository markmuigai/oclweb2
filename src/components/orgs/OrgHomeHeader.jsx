import React from 'react';
import {
  Home as HomeIcon,
} from '@material-ui/icons';
import { Tooltip } from '@material-ui/core';
import { includes, isEmpty } from 'lodash';
import { toFullAPIURL, copyURL } from '../../common/utils';
import OwnerButton from '../common/OwnerButton';
import LastUpdatedOnLabel from '../common/LastUpdatedOnLabel';
import ExternalIdLabel from '../common/ExternalIdLabel';
import LocationLabel from '../common/LocationLabel';
import CustomAttributesPopup from '../common/CustomAttributesPopup';
import PublicAccessChip from '../common/PublicAccessChip';
import HeaderAttribute from '../common/HeaderAttribute';

const OrgHomeHeader = ({ org, url }) => {
  const onIconClick = () => copyURL(toFullAPIURL(url));

  return (
    <header className='home-header col-md-12'>
      <div className='col-md-12 container' style={{paddingTop: '10px'}}>
        <div className='no-side-padding col-md-1 home-icon org'>
          <Tooltip title='Copy URL'>
            <HomeIcon onClick={onIconClick} />
          </Tooltip>
        </div>
        <div className='col-md-11'>
          <div className='col-md-12 no-side-padding flex-vertical-center'>
            <OwnerButton owner={org.id} ownerType='Organization' href={url} />
          </div>
          <div className='col-md-12 no-side-padding flex-vertical-center home-resource-full-name'>
            <span style={{marginRight: '10px'}}>
              {org.name}
            </span>
            {
              includes(['view', 'edit'], org.public_access.toLowerCase()) &&
              <PublicAccessChip publicAccess={org.public_access} />
            }
          </div>
          <HeaderAttribute label="Company" value={org.company} gridClass="col-md-12" />
          <HeaderAttribute label="Website" value={org.website} gridClass="col-md-12" type="url" />
          <HeaderAttribute label="Custom Attributes" value={!isEmpty(org.extras) && <CustomAttributesPopup attributes={org.extras} />} gridClass="col-md-12" />
          <div className='col-md-12 no-side-padding flex-vertical-center' style={{paddingTop: '10px'}}>
            {
              org.location &&
              <span style={{marginRight: '10px'}}>
                <LocationLabel location={org.location} noContainerClass iconSize="medium" />
              </span>
            }
            <span>
              <LastUpdatedOnLabel
                label='Created'
                date={org.created_on}
                by={org.created_by}
                iconSize='medium'
                noContainerClass
              />
            </span>
            <span style={{marginLeft: '10px'}}>
              <LastUpdatedOnLabel
                date={org.updated_on}
                by={org.updated_by}
                iconSize='medium'
                noContainerClass
              />
            </span>
            {
              org.external_id &&
              <span style={{marginLeft: '10px', marginTop: '-8px'}}>
                <ExternalIdLabel externalId={org.external_id} iconSize='medium' />
              </span>
            }
          </div>
        </div>
      </div>
    </header>
  )
}

export default OrgHomeHeader;
