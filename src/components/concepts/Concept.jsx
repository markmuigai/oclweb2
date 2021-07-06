import React from 'react';
import { LocalOffer as LocalOfferIcon } from '@material-ui/icons'
import { merge, get, isArray, reject, keys, isEmpty, includes, map } from 'lodash'
import { DARKGRAY } from '../../common/constants';
import ResourceLabel from '../common/ResourceLabel';
import LastUpdatedOnLabel from '../common/LastUpdatedOnLabel';

const DEFAULT_FIELDS = [{concept_class: 'Class'}, {datatype: 'Datatype'}]
const LABEL_FIELDS = ['id', 'display_name', 'name', 'owner', 'source']

const Concept = props => {
  const { viewFields, history, currentLayoutURL, url, hideAttributes } = props;
  const customFields = isArray(viewFields) ? reject(viewFields, fieldConfig => includes(LABEL_FIELDS, keys(fieldConfig)[0])) : [];
  const fields = isEmpty(customFields) ? DEFAULT_FIELDS : customFields;

  const navigateTo = () => {
    if(currentLayoutURL)
      history.replace(currentLayoutURL)
    history.push(url)
  }

  return (
    <div className='col-sm-12' style={merge({paddingTop: '10px', paddingLeft: 0, paddingRight: 0}, get(props, 'style', {}))}>
      <span onClick={navigateTo} style={{display: 'inline-block', cursor: 'pointer'}}>
        <ResourceLabel
          id={props.display_name} name={props.id} noSeparator
          icon={<LocalOfferIcon fontSize='small' style={{width: '10pt', color: DARKGRAY}}/>}
        />
      </span>
      {
        !hideAttributes &&
        <React.Fragment>
        <div className='col-sm-11 no-side-padding resource-attributes'>
          {
            map(fields, (field, i) => {
              const attr = keys(field)[0]
              const label = field[attr];
              return (
                <React.Fragment key={attr}>
                  <span className='resource-attr'>
                    {label}:
                  </span>
                  <span className='resource-value' style={{marginRight: '0px'}}>
                    {get(props, attr, '')}
                  </span>
                  {i < fields.length - 1 && <span style={{marginRight: '5px'}}>, </span>}
                </React.Fragment>
              )
            })
          }
        </div>
        <LastUpdatedOnLabel date={props.version_created_on} />
        </React.Fragment>
      }
    </div>
  )
}

export default Concept;
