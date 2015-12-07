import React, { Component, PropTypes } from 'react'
import { map, reduce } from 'lodash'
import classNames from 'classnames'

class CrewList extends Component {
  render () {
    const { modelData, crewOptions, crew } = this.props

    var faction = modelData.factions[crewOptions.selectedFaction];
    var leader = modelData.leaders[crewOptions.selectedLeader];
    var totem = modelData.totems[crewOptions.selectedTotem];

    if(totem){
       var totem_el = <p className='totem'>{totem.name} - {totem.cost}ss</p>
    }

    var members = map(crew.members, function(member, id) {
      return (
        <li key={id}>{member.name} <button onClick={this.deleteMember.bind(this, id)}>Delete</button></li>
      );
    }, this);

    var negativeClass = classNames({red: crew.soulstonesRemaining < 0});

    return (
      <div id='crew'>
        <h1 className='faction' style={{color: faction.color}}>{faction.name}</h1>
        <p><span className={negativeClass}>{crew.soulstonesRemaining}</span> / {crew.soulstoneAmount}</p>
        <p className='leader'>{leader.name} - {leader.cache}ss</p>
        {totem_el}
        <div className='member-list'>
          <ul>
            {members}
          </ul>
        </div>
      </div>
    )
  }

  deleteMember (index){
    this.props.onMemberDelete(index);
  }
}

CrewList.propTypes = {
  onMemberDelete: PropTypes.func.isRequired,
  modelData: PropTypes.object.isRequired,
  crewOptions: PropTypes.object.isRequired,
  crew: PropTypes.object.isRequired
}

export default CrewList
