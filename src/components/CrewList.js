import React, { Component, PropTypes } from 'react'
import { map } from 'lodash'

class CrewList extends Component {
  render () {
    const { modelData, crewOptions, crew } = this.props

    var faction = modelData.factions[crewOptions.selectedFaction];
    var leader = modelData.leaders[crewOptions.selectedLeader];
    var totem = modelData.totems[crewOptions.selectedTotem];

    if(totem){
       var totem_el = <p className='totem'>{totem.name} - {totem.cost}ss</p>
    }

    var members = map(crew.members, function(m, id) {
      let member = modelData.members[m]
      return (
        <li key={id}>{member.name}</li>
      );
    });

    return (
      <div id='crew-list'>
        <h2 className='faction' style={{color: faction.color}}>{faction.name}</h2>
        <p className='leader'>{leader.name} - {leader.cache}ss</p>
        {totem_el}
        <div id='crew-list'>
          <ul>
            {members}
          </ul>
        </div>
      </div>
    )
  }
}

CrewList.propTypes = {
  modelData: PropTypes.object.isRequired,
  crewOptions: PropTypes.object.isRequired,
  crew: PropTypes.object.isRequired
}

export default CrewList
