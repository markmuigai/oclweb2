import React from 'react';
import { Icon } from '@mui/material';
import {
  List as SourceIcon, Loyalty as CollectionIcon, Person as UserIcon,
  Info as InfoIcon, Home as HomeIcon, Link as MappingIcon,
  AccountTreeRounded as VersionIcon, LocalOffer as ConceptIcon
} from '@mui/icons-material';
import { includes, snakeCase } from 'lodash';
import { GREEN, BLUE, ORANGE } from '../../common/constants';

const DynamicConfigResourceIcon = ({resource, index, style, icon, enableColor, ...rest}) => {
  const styles = style || {}
  if(icon)
    return (<Icon style={{fontSize: '20px'}} {...rest}>{snakeCase(icon)}</Icon>)
  if(includes(['source', 'sources'], resource))
    return <SourceIcon style={{...styles, color: enableColor ? GREEN : ''}} {...rest} />;
  if(includes(['collection', 'collections'], resource))
    return <CollectionIcon style={{...styles, color: enableColor ? GREEN : ''}} {...rest} />;
  if(includes(['user', 'users'], resource))
    return <UserIcon style={{...styles, color: enableColor ? ORANGE : ''}} {...rest} />;
  if(includes(['org', 'orgs', 'organizations', 'organization'], resource))
    return <HomeIcon style={{...styles, color: enableColor ? ORANGE : ''}} {...rest} />;
  if(includes(['concept', 'concepts'], resource))
    return <ConceptIcon style={{...styles, color: enableColor ? BLUE : ''}} {...rest} />;
  if(includes(['mapping', 'mappings'], resource))
    return <MappingIcon style={{...styles, color: enableColor ? BLUE : ''}} {...rest} />;
  if(includes(['versions', 'history', 'version'], resource))
    return <VersionIcon style={styles} {...rest} />;
  if(index === 0)
    return <HomeIcon style={styles} />;
  if(includes(['about', 'text'], resource))
    return <InfoIcon style={styles} {...rest} />;

  return '';
}

export default DynamicConfigResourceIcon;
