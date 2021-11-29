import React from 'react';
import { Tabs, Tab } from '@mui/material';
import ConceptHomeDetails from './ConceptHomeDetails';
import VersionList from '../common/VersionList';

const ConceptHomeTabs = props => {
  const {
    tab, concept, versions, mappings, isVersionedObject, isLoadingMappings, noRedirect,
    onTabChange, collections, isLoadingCollections, source, isLoadingParents, isLoadingChildren,
    parentConcepts, childConcepts
  } = props;
  const resourceRelativeURL = isVersionedObject ? concept.url : concept.version_url;
  const conceptWithMappings = {...concept, mappings: mappings, collections: collections}

  const detailsRedirectionProps = noRedirect ? {} : {component: "a", href: `#${resourceRelativeURL}details/`}
  const historyRedirectionProps = noRedirect ? {} : {component: "a", href: `#${resourceRelativeURL}history/`}

  return (
    <div className='col-md-12 sub-tab'>
      <Tabs className='sub-tab-header col-md-8 no-side-padding' value={tab} aria-label="concept-home-tabs"  classes={{indicator: 'hidden'}} onChange={onTabChange}>
        <Tab label="Details" {...detailsRedirectionProps} />
        <Tab label="History" {...historyRedirectionProps} />
      </Tabs>
      <div className='sub-tab-container' style={{display: 'flex', height: 'auto', width: '100%', minHeight: '100vh'}}>
        {
          tab === 0 &&
          <ConceptHomeDetails
            source={source}
            concept={conceptWithMappings}
            parentConcepts={parentConcepts}
            childConcepts={childConcepts}
            isLoadingMappings={isLoadingMappings}
            isLoadingCollections={isLoadingCollections}
            isLoadingChildren={isLoadingChildren}
            isLoadingParents={isLoadingParents}
          />
        }
        {
          tab === 1 &&
          <VersionList
            versions={versions}
            resource='concept'
          />
        }
      </div>
    </div>
  );
}

export default ConceptHomeTabs;
