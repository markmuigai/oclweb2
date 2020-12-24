import React from 'react';
import { Link } from 'react-router-dom';
import {
  TableContainer, Table, TableHead, TableBody, TableCell, TableRow,
  CircularProgress, Drawer, Checkbox, IconButton, Tooltip
} from '@material-ui/core';
import {
  ArrowDropDown as ArrowDownIcon, ArrowDropUp as ArrowUpIcon,
  Settings as SettingsIcon,
} from '@material-ui/icons';
import {
  get, startCase, map, isEmpty, includes, isEqual, size, filter, reject, keys, values,
  sortBy, findIndex, uniqBy, has, maxBy, cloneDeep, pickBy
} from 'lodash';
import APIService from '../../services/APIService';
import { formatDate, toObjectArray, toParentURI } from '../../common/utils';
import {
  DIFF_BG_RED,
} from '../../common/constants';
import ReactDiffViewer from 'react-diff-viewer';

const getLocaleLabelExpanded = (locale, formatted=false) => {
  if(!locale)
    return '';

  const nameAttr = has(locale, 'name') ? 'Name' : 'Description';
  const typeValue = get(locale, 'name_type') || get(locale, 'description_type') || '';
  const nameValue = get(locale, 'name') || get(locale, 'description');
  const preferredText = locale.locale_preferred ? 'True' : 'False';

  const label = [
    `Type: ${typeValue}`,
    `${nameAttr}: ${nameValue}`,
    `Locale: ${locale.locale}`,
    `Preferred: ${preferredText}`,
  ].join('\n')

  if(formatted)
    return <div key={label} style={{whiteSpace: 'pre'}}>{label}</div>;

  return label;
}

const getMappingLabel = (mapping, formatted=false) => {
  if(!mapping)
    return '';

  const label = [
    `UID: ${mapping.id}`,
    `Relationship: ${mapping.map_type}`,
    `Source: ${mapping.owner} / ${mapping.source}`,
    `From Concept Code: ${mapping.from_concept_code}`,
    `From Concept Name: ${mapping.from_concept_name}`,
    `To Concept Code: ${mapping.to_concept_code}`,
    `To Concept Name: ${mapping.to_concept_name}`,
  ].join('\n')

  if(formatted)
    return <div key={label} style={{whiteSpace: 'pre'}}>{label}</div>;

  return label
}


class ConceptsComparison extends React.Component {
  constructor(props) {
    super(props);
    const attributeState = {show: true, type: 'text'}
    this.state = {
      isLoadingLHS: true,
      isLoadingRHS: true,
      lhs: {},
      rhs: {},
      drawer: false,
      attributes: {
        datatype: cloneDeep(attributeState),
        display_locale: cloneDeep(attributeState),
        external_id: cloneDeep(attributeState),
        owner: {...cloneDeep(attributeState), type: 'textFormatted'},
        names: {...cloneDeep(attributeState), collapsed: true, type: 'list'},
        descriptions: {...cloneDeep(attributeState), collapsed: true, type: 'list'},
        mappings: {...cloneDeep(attributeState), collapsed: true, type: 'list'},
        extras: {...cloneDeep(attributeState), collapsed: true, type: 'list'},
        retired: {...cloneDeep(attributeState), type: 'bool'},
        created_by: cloneDeep(attributeState),
        updated_by: cloneDeep(attributeState),
        created_on: {...cloneDeep(attributeState), type: 'date'},
        updated_on: {...cloneDeep(attributeState), type: 'date'},
      },
    }
  }

  componentDidMount() {
    this.setObjectsForComparison()
  }

  componentDidUpdate(prevProps) {
    if(prevProps.location.search !== this.props.location.search)
      this.setObjectsForComparison()
  }

  onDrawerClick = () => {
    this.setState({drawer: !this.state.drawer})
  }

  onToggleAttributeClick = attr => {
    this.setState({
      attributes: {
        ...this.state.attributes,
        [attr]: {
          ...this.state.attributes[attr],
          show: !this.state.attributes[attr].show
        }
      }
    })
  }

  onCollapseIconClick(attr) {
    this.setState({
      attributes: {
        ...this.state.attributes,
        [attr]: {
          ...this.state.attributes[attr],
          collapsed: !this.state.attributes[attr].collapsed
        }
      }
    })
  }

  setObjectsForComparison() {
    const queryParams = new URLSearchParams(this.props.location.search)
    this.fetchConcept(queryParams.get('lhs'), 'lhs', 'isLoadingLHS')
    this.fetchConcept(queryParams.get('rhs'), 'rhs', 'isLoadingRHS')
  }

  fetchConcept(uri, attr, loadingAttr) {
    if(uri && attr && loadingAttr) {
      APIService.new().overrideURL(uri).get(null, null, {includeInverseMappings: true}).then(response => {
        if(get(response, 'status') === 200)
          this.setState({[attr]: this.formatConcept(response.data), [loadingAttr]: false}, this.sortMappings)
      })
    }
  }

  formatConcept(concept) {
    concept.names = this.sortLocales(concept.names)
    concept.descriptions = this.sortLocales(concept.descriptions)
    concept.extras = toObjectArray(concept.extras)
    return concept
  }

  sortMappings() {
    if(!isEmpty(get(this.state.lhs, 'mappings')) && !isEmpty(get(this.state.rhs, 'mappings'))) {
      const newState = {...this.state};
      if(newState.lhs.mappings.length > newState.rhs.mappings.length) {
        newState.lhs.mappings = uniqBy([...sortBy(
          newState.rhs.mappings, m1 => findIndex(newState.lhs.mappings, m2 => m1.id === m2.id)
        ), ...newState.lhs.mappings], 'id')
      } else {
        newState.rhs.mappings = uniqBy([...sortBy(
          newState.lhs.mappings, m1 => findIndex(newState.rhs.mappings, m2 => m1.id === m2.id)
        ), ...newState.rhs.mappings], 'id')
      }

      this.setState(newState)
    }
  }

  sortLocales = locales => {
    return [
      ...filter(locales, {name_type: 'FULLY_SPECIFIED', locale_preferred: true}),
      ...filter(reject(locales, {name_type: 'FULLY_SPECIFIED'}), {locale_preferred: true}),
      ...filter(locales, {name_type: 'FULLY_SPECIFIED', locale_preferred: false}),
      ...reject(reject(locales, {name_type: 'FULLY_SPECIFIED'}), {locale_preferred: true}),
    ]
  }

  getHeaderSubAttributes(concept) {
    return (
      <React.Fragment>
        <div style={{margin: '5px 0px'}}>
          <span>
            <span className='gray-italics'>Source:</span>
            <Link to={toParentURI(concept.url)} target="_blank">
              <span>{concept.source}</span>
            </Link>
          </span>
          <span style={{marginLeft: '10px'}}>
            <span className='gray-italics'>Type:</span>
            <span>{concept.concept_class}</span>
          </span>
          <span style={{marginLeft: '10px'}}>
            <span className='gray-italics'>UID:</span>
            <span>{concept.id}</span>
          </span>
        </div>
      </React.Fragment>
    )
  }

  getValue(concept, attr, type, formatted=false) {
    let value = get(concept, attr)
    if(type === 'list') {
      if(isEmpty(value)) return '';
      if(includes(['names', 'descriptions'], attr))
        return map(value, locale => getLocaleLabelExpanded(locale, formatted))
      if (attr === 'mappings')
        return map(value, mapping => getMappingLabel(mapping, formatted));
      else
        return value
    } else if(type === 'date') {
      if(attr === 'created_on')
        value ||= get(concept, 'created_at')
      if(attr === 'updated_on')
        value ||= get(concept, 'updated_at')

      return value ? formatDate(value) : '';
    } else if (type === 'textFormatted') {
      if(attr === 'owner')
        return `${concept.owner_type}: ${concept.owner}`
    } else if (type === 'bool') {
      return value ? 'True' : 'False'
    } else {
      if(includes(['created_by', 'updated_by'], attr))
        value ||= get(concept, `version_${attr}`)
      if(attr === 'updated_by' && has(concept, 'version_created_by'))
        value ||= concept.version_created_by
      return value || '';
    }
  }

  maxArrayElement(v1, v2) {
    return maxBy([v1, v2], size)
  }

  getListAttrValue(attr, val, formatted=false) {
    if(includes(['names', 'descriptions'], attr))
      return getLocaleLabelExpanded(val, formatted)
    if(includes(['mappings'], attr))
      return getMappingLabel(val, formatted)
    if(includes(['extras'], attr))
      return this.getExtraAttributeLabel(val)
  }

  getExtraAttributeLabel(val) {
    if(!val)
      return ''
    return `${keys(val)[0]}: ${JSON.stringify(values(val)[0])}`
  }

  getAttributeDOM(attr, type, lhsValue, rhsValue, isDiff) {
    const { lhs, rhs } = this.state;
    const maxLengthAttr = type === 'list' ? this.maxArrayElement(get(lhs, attr), get(rhs, attr)) : [];
    const rowSpan = size(maxLengthAttr);
    return (
      <React.Fragment key={attr}>
        {
          type === 'list' ?
          map(maxLengthAttr, (_attr, index) => {
            const _lhsVal = get(lhs, `${attr}.${index}`, '')
            const _rhsVal = get(rhs, `${attr}.${index}`, '')
            const _lhsValCleaned = this.getListAttrValue(attr, _lhsVal)
            const _rhsValCleaned = this.getListAttrValue(attr, _rhsVal)
            const _isDiff = !isEqual(_lhsValCleaned, _rhsValCleaned);
            return (
              <TableRow key={_attr.uuid || index} colSpan='12'>
                {
                  index === 0 &&
                  <TableCell colSpan='2' rowSpan={rowSpan} style={{width: '10%', fontWeight: 'bold', verticalAlign: 'top'}}>
                    {type !== 'list' && startCase(attr)}
                  </TableCell>
                }
                {
                  _isDiff ?
                  <TableCell colSpan='10' style={{width: '90%'}} className='diff-row'>
                    <ReactDiffViewer
                      oldValue={_lhsValCleaned}
                      newValue={_rhsValCleaned}
                      showDiffOnly={false}
                      splitView
                      hideLineNumbers
                    />
                  </TableCell> :
                  <React.Fragment>
                    <TableCell colSpan='5' style={{width: '45%'}}>
                      {this.getListAttrValue(attr, _lhsVal, true)}
                    </TableCell>
                    <TableCell colSpan='5' style={{width: '45%'}}>
                      {this.getListAttrValue(attr, _rhsVal, true)}
                    </TableCell>
                  </React.Fragment>
                }
              </TableRow>
            )
          }) :
          <TableRow key={attr} colSpan='12'>
            <TableCell colSpan='2' style={{width: '10%', fontWeight: 'bold', verticalAlign: 'top'}}>
              {type !== 'list' && startCase(attr)}
            </TableCell>
            {
              isDiff ?
              <TableCell colSpan='10' style={{width: '90%'}} className='diff-row'>
                <ReactDiffViewer
                  oldValue={lhsValue}
                  newValue={rhsValue}
                  showDiffOnly={false}
                  splitView
                  hideLineNumbers
                />
              </TableCell> :
              <React.Fragment>
                <TableCell colSpan='5' style={{width: '45%'}}>
                  {this.getValue(lhs, attr, type, true)}
                </TableCell>
                <TableCell colSpan='5' style={{width: '45%'}}>
                  {this.getValue(rhs, attr, type, true)}
                </TableCell>
              </React.Fragment>
            }
          </TableRow>
        }
      </React.Fragment>
    )
  }

  getHeaderCell = concept => {
    return (
      <TableCell colSpan="5" style={{width: '45%'}} key={concept.id}>
        <div style={{fontSize: '14px'}}>
          {this.getHeaderSubAttributes(concept)}
        </div>
        <div style={{fontSize: '18px'}}>
          <Link to={concept.url} target="_blank">{concept.display_name}</Link>
        </div>
      </TableCell>
    )
  }

  render() {
    const { lhs, rhs, isLoadingLHS, isLoadingRHS, attributes, drawer } = this.state;
    const isLoading = isLoadingLHS || isLoadingRHS;
    const visibleAttributes = pickBy(attributes, {show: true})
    return (
      <React.Fragment>
        {
          isLoading ?
          <div style={{textAlign: 'center', marginTop: '30px'}}>
            <CircularProgress color='primary' />
          </div> :
          <div className='col-md-12' style={{paddingTop: '10px', paddingBottom: '10px'}}>
            <TableContainer  style={{borderRadius: '4px', border: '1px solid lightgray'}}>
              <Table size='small'>
                <TableHead>
                  <TableRow colSpan="12">
                    <TableCell colSpan="2" style={{width: '10%'}}>
                      <Tooltip title='Customize attributes' placement='top'>
                        <IconButton onClick={this.onDrawerClick}>
                          <SettingsIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    {
                      map([lhs, rhs], this.getHeaderCell)
                    }
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    map(visibleAttributes, (config, attr) => {
                      const type = config.type;
                      const lhsValue = this.getValue(lhs, attr, type);
                      const rhsValue = this.getValue(rhs, attr, type);
                      const isDiff = !isEqual(lhsValue, rhsValue);
                      const children = this.getAttributeDOM(attr, type, lhsValue, rhsValue, isDiff);
                      if(type === 'list') {
                        const lhsCount = lhs[attr].length;
                        const rhsCount = rhs[attr].length;
                        const hasKids = Boolean(lhsCount || rhsCount);
                        const styles = isDiff ? {background: DIFF_BG_RED} : {};
                        const isExpanded = !config.collapsed || !hasKids;
                        return (
                          <React.Fragment key={attr}>
                            <TableRow colSpan='12' onClick={() => this.onCollapseIconClick(attr)} style={{cursor: 'pointer'}}>
                              <TableCell colSpan='12' style={{ fontWeight: 'bold', fontSize: '0.875rem', ...styles }}>
                                <span className='flex-vertical-center'>
                                  <span style={{marginRight: '5px'}}>{`${startCase(attr)} (${lhsCount}/${rhsCount})`}</span>
                                  {
                                    isExpanded ? <ArrowUpIcon fontSize='inherit' /> : <ArrowDownIcon fontSize='inherit' />
                                  }
                                </span>
                              </TableCell>
                            </TableRow>
                            {
                              isExpanded &&
                              <React.Fragment>
                                {children}
                              </React.Fragment>
                            }
                          </React.Fragment>
                        )
                      } else {
                        return children;
                      }
                    })
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        }
        <Drawer anchor='left' open={drawer} onClose={this.onDrawerClick}>
          <div className='col-md-4' style={{width: '300px'}}>
            <h3>
              Toggle Attributes:
            </h3>
            {
              map(attributes, (config, attr) => (
                  <div className='col-md-12' key={attr}>
                  <Checkbox checked={config.show} onChange={() => this.onToggleAttributeClick(attr)} />
                {attr}
                  </div>
              ))
            }
          </div>
        </Drawer>
      </React.Fragment>
    )
  }
}

export default ConceptsComparison;
