import React from 'react';
import {
  LocalOffer as LocalOfferIcon,
  Link as LinkIcon,
  AccountTreeRounded as TreeIcon,
  List as ListIcon,
  Person as PersonIcon,
  Home as HomeIcon,
  Loyalty as LoyaltyIcon,
} from '@material-ui/icons'
import {
  formatDate, formatWebsiteLink, formatDateTime
} from '../../common/utils';
import ReferenceChip from '../common/ReferenceChip';
import OwnerChip from '../common/OwnerChip';
import ToConceptLabel from '../mappings/ToConceptLabel';
import FromConceptLabel from '../mappings/FromConceptLabel';

export const ALL_COLUMNS = {
  concepts: [
    {id: 'owner', label: 'Owner', value: 'owner', sortOn: 'owner', renderer: concept => <OwnerChip ownerType={concept.owner_type} owner={concept.owner} />, essential: false},
    {id: 'parent', label: 'Source', value: 'source', sortOn: 'source', essential: false},
    {id: 'id', label: 'ID', value: 'id', sortOn: 'id', className: 'small'},
    {id: 'name', label: 'Name', value: 'display_name', sortOn: 'name', renderer: concept => (concept.retired ? <span className='retired'>{concept.display_name}</span> : <span>{concept.display_name}</span>), className: 'medium', sortBy: 'asc'},
    {id: 'class', label: 'Class', value: 'concept_class', sortOn: 'concept_class'},
    {id: 'datatype', label: 'Datatype', value: 'datatype', sortOn: 'datatype'},
    {id: 'updatedOn', label: 'UpdatedOn', value: 'version_created_on', formatter: formatDate, sortOn: 'last_update'},
  ],
  mappings: [
    {id: 'owner', label: 'Owner', value: 'owner', sortOn: 'owner', renderer: mapping => <OwnerChip ownerType={mapping.owner_type} owner={mapping.owner} />, essential: false},
    {id: 'parent', label: 'Source', value: 'source', sortOn: 'source', essential: false, className: 'xsmall'},
    {id: 'id', label: 'ID', value: 'id', sortOn: 'id', className: 'small'},
    {id: 'from', label: 'From Concept', renderer: mapping => <FromConceptLabel {...mapping} noRedirect />, className: 'medium'},
    {id: 'mapType', label: 'Type', value: 'map_type', sortOn: 'map_type', className: 'xxsmall'},
    {id: 'to', label: 'To Concept', renderer: mapping => <ToConceptLabel {...mapping} noRedirect />, className: 'medium'},
    {id: 'updatedOn', label: 'UpdatedOn', value: 'version_created_on', formatter: formatDate, sortOn: 'last_update', className: 'xxsmall'},
  ],
  sources: [
    {id: 'owner', label: 'Owner', value: 'owner', sortOn: 'owner', renderer: source => <OwnerChip ownerType={source.owner_type} owner={source.owner} />},
    {id: 'id', label: 'ID', value: 'short_code', sortOn: 'mnemonic'},
    {id: 'name', label: 'Name', value: 'name', sortOn: 'name', sortBy: 'asc'},
    {id: 'sourceType', label: 'Type', value: 'source_type', sortOn: 'source_type'},
    {id: 'uuid', label: 'UUID', value: 'uuid', sortable: false},
    {id: 'full_name', label: 'Full Name', value: 'full_name', sortOn: 'full_name', sortBy: 'asc'},
    {id: 'description', label: 'Description', value: 'description', sortable: false},
    {id: 'public_access', label: 'Public Access', value: 'public_access', sortable: false},
    {id: 'default_locale', label: 'Default Locale', value: 'default_locale', sortable: false},
    {id: 'website', label: 'Website', value: 'website', sortable: false, formatter: formatWebsiteLink},
    {id: 'external_id', label: 'External ID', value: 'external_id', sortable: false},
    {id: 'canonical_url', label: 'Canonical URL', value: 'canonical_url', sortable: false, formatter: formatWebsiteLink},
    {id: 'publisher', label: 'Publisher', value: 'publisher', sortable: false},
    {id: 'purpose', label: 'Purpose', value: 'purpose', sortable: false},
    {id: 'copyright', label: 'Copyright', value: 'copyright', sortable: false},
    {id: 'content_type', label: 'Content Type', value: 'content_type', sortable: false},
    {id: 'revision_date', label: 'Revision Date', value: 'revision_date', sortable: false, formatter: formatDate},
  ],
  collections: [
    {id: 'owner', label: 'Owner', value: 'owner', sortOn: 'owner', renderer: coll => <OwnerChip ownerType={coll.owner_type} owner={coll.owner} />},
    {id: 'id', label: 'ID', value: 'short_code', sortOn: 'mnemonic'},
    {id: 'name', label: 'Name', value: 'name', sortOn: 'name', sortBy: 'asc'},
    {id: 'collectionType', label: 'Type', value: 'collection_type', sortOn: 'collection_type'},
    {id: 'full_name', label: 'Full Name', value: 'full_name', sortOn: 'full_name', sortBy: 'asc'},
    {id: 'uuid', label: 'UUID', value: 'uuid', sortable: false},
    {id: 'description', label: 'Description', value: 'description', sortable: false},
    {id: 'public_access', label: 'Public Access', value: 'public_access', sortable: false},
    {id: 'default_locale', label: 'Default Locale', value: 'default_locale', sortable: false},
    {id: 'website', label: 'Website', value: 'website', sortable: false, formatter: formatWebsiteLink},
    {id: 'external_id', label: 'External ID', value: 'external_id', sortable: false},
    {id: 'canonical_url', label: 'Canonical URL', value: 'canonical_url', sortable: false, formatter: formatWebsiteLink},
    {id: 'publisher', label: 'Publisher', value: 'publisher', sortable: false},
    {id: 'purpose', label: 'Purpose', value: 'purpose', sortable: false},
    {id: 'copyright', label: 'Copyright', value: 'copyright', sortable: false},
    {id: 'revision_date', label: 'Revision Date', value: 'revision_date', sortable: false, formatter: formatDate},
  ],
  organizations: [
    {id: 'id', label: 'ID', value: 'id', sortOn: 'mnemonic', renderer: org => <OwnerChip ownerType='Organization' owner={org.id} />},
    {id: 'name', label: 'Name', value: 'name', sortOn: 'name', sortBy: 'asc'},
    {id: 'createdOn', label: 'Created On', value: 'created_on', formatter: formatDate, sortOn: 'created_on'},
  ],
  users: [
    {id: 'username', label: 'Username', value: 'username', sortOn: 'username', renderer: user => <OwnerChip ownerType='user' owner={user.username} />, sortBy: 'asc'},
    {id: 'name', label: 'Name', value: 'name', sortOn: 'name', sortBy: 'asc'},
    {id: 'date_joined', label: 'Joined On', value: 'date_joined', formatter: formatDate, sortOn: 'date_joined'},
    {id: 'email', label: 'Email', value: 'email', sortable: false},
    {id: 'company', label: 'Company', value: 'company'},
    {id: 'location', label: 'Location', value: 'location'},
    {id: 'website', label: 'Website', value: 'website', sortable: false, formatter: formatWebsiteLink},
    {id: 'last_login', label: 'Last Login', value: 'last_login', sortable: false, formatter: formatDateTime},
  ],
  references: [
    {id: 'expression', label: 'Reference', value: 'expression', sortable: false, renderer: reference => <ReferenceChip {...reference} />},
  ],
  CodeSystem: [
    {id: 'id', label: 'ID', value: 'resource.id', sortable: false},
    {id: 'url', label: 'Canonical URL', value: 'resource.url', sortable: false},
    {id: 'name', label: 'Name', value: 'resource.name', sortable: false},
    {id: 'version', label: 'Latest Version', value: 'resource.version', sortable: false},
    {id: 'status', label: 'Status', value: 'resource.status', sortable: false},
    {id: 'content', label: 'Content', value: 'resource.content', sortable: false},
    {id: 'date', label: 'Release Date', value: 'resource.date', sortable: false},
    {id: 'publisher', label: 'Publisher', value: 'resource.publisher', sortable: false},
  ]
};

const TAG_ICON_STYLES = {width: '12px', marginRight: '2px', marginTop: '2px'}
const CONCEPT_CONTAINER_TAGS = [
  {
    id: 'activeConcepts',
    value: 'summary.active_concepts',
    label: 'Concepts',
    icon: <LocalOfferIcon fontSize='small' style={TAG_ICON_STYLES} />,
    hrefAttr: 'concepts_url'
  },
  {
    id: 'activeMappings',
    value: 'summary.active_mappings',
    label: 'Mappings',
    icon: <LinkIcon fontSize='small' style={TAG_ICON_STYLES} />,
    hrefAttr: 'mappings_url'
  },
  {
    id: 'versions',
    value: 'summary.versions',
    label: 'Versions',
    icon: <TreeIcon fontSize='small' style={TAG_ICON_STYLES} />,
    hrefAttr: 'versions_url'
  },
]
const CODE_SYSTEM_TAGS = [
  {
    id: 'count',
    value: 'resource.count',
    label: 'Concepts',
    icon: <LocalOfferIcon fontSize='small' style={TAG_ICON_STYLES} />,
    text: true
  },
]
const SOURCE_TAG = {
  id: 'sources',
  value: 'public_sources',
  label: 'Public Sources',
  icon: <ListIcon fontSize='small' style={TAG_ICON_STYLES} />,
  hrefAttr: 'sources_url'
}
const COLLECTION_TAG = {
  id: 'collections',
  value: 'public_collections',
  label: 'Public Collections',
  icon: <LoyaltyIcon fontSize='small' style={TAG_ICON_STYLES} />,
  hrefAttr: 'collections_url'
}
export const TAGS = {
  sources: [...CONCEPT_CONTAINER_TAGS],
  collections: [...CONCEPT_CONTAINER_TAGS],
  organizations: [
    {
      id: 'members',
      value: 'members',
      label: 'Members',
      icon: <PersonIcon fontSize='small' style={TAG_ICON_STYLES} />,
      hrefAttr: 'url'
    },
    SOURCE_TAG,
    COLLECTION_TAG,
  ],
  users: [
    {
      id: 'orgs',
      value: 'orgs',
      label: 'Organizations',
      icon: <HomeIcon fontSize='small' style={TAG_ICON_STYLES} />,
      hrefAttr: 'organizations_url'
    },
    SOURCE_TAG,
    COLLECTION_TAG,
  ],
  CodeSystem: [...CODE_SYSTEM_TAGS],
}
export const FACET_ORDER = {
  concepts: ['owner', 'ownerType', 'source', 'conceptClass', 'datatype', 'locale', 'retired', 'collection_membership'],
  mappings: [
    'owner', 'ownerType', 'source', 'mapType',
    'fromConceptOwner', 'fromConceptOwnerType', 'fromConceptSource', 'fromConcept',
    'toConceptOwner', 'toConceptOwnerType', 'toConceptSource', 'toConcept',
    'retired', 'collection_membership',
  ]
}

export const SORT_ATTRS = {
  concepts: ['score', 'last_update', 'id', 'name', 'concept_class', 'datatype', 'source', 'owner'],
  mappings: ['score', 'last_update', 'id', 'map_type', 'source', 'owner'],
  users: ['score', 'username', 'date_joined', 'company', 'location'],
  organizations: ['score', 'last_update', 'name', 'mnemonic'],
  sources: ['score', 'last_update', 'mnemonic', 'source_type', 'name', 'owner', 'canonical_url'],
  collections: ['score', 'last_update', 'mnemonic', 'collection_type', 'name', 'owner', 'canonical_url'],
}
