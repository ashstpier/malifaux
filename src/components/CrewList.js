import React, { Component, PropTypes } from 'react'
import { map, reduce } from 'lodash'
import classNames from 'classnames'

class CrewList extends Component {
  render () {
    const { modelData, crew } = this.props

    var faction = modelData.factions[crew.selectedFaction];
    var leader = modelData.leaders[crew.selectedLeader];
    var totem = modelData.totems[crew.selectedTotem];

    if(totem){
       var totem_el = <li className='totem'>{totem.name} - {totem.cost}ss <span className="float-right delete-icon" onClick={this.deleteTotem.bind(this, totem.cost)}>x</span></li>
    }

    var members = map(crew.members, function(member, id) {
      return (
        <li key={id}>{member.name} <span className="float-right delete-icon" onClick={this.deleteMember.bind(this, id, member.cost)}>x</span></li>
      );
    }, this);

    var negativeClass = classNames({red: crew.soulstonesRemaining < 0});

    return (
      <div id='crew'>
        <h1 className='faction' style={{color: faction.color}}>{faction.name}</h1>
        <div className='soulstone-amount'>
          <span className={negativeClass}>{crew.soulstonesRemaining}</span>/{crew.soulstoneAmount}
        </div>
        <div className='leader'>
          <h2>{leader.name} <span className='float-right'>cache: {leader.cache}</span></h2>
        </div>
        <div className='member-list'>
          <ul>
            {totem_el}
            {members}
          </ul>
        </div>
      </div>
    )
  }

  deleteMember (index, cost){
    this.props.onMemberDelete({
      id: index,
      cost: cost
    });
  }
  deleteTotem (cost){
    console.log(cost)
    this.props.onTotemDelete(cost);
  }
}

CrewList.propTypes = {
  onMemberDelete: PropTypes.func.isRequired,
  onTotemDelete: PropTypes.func.isRequired,
  modelData: PropTypes.object.isRequired,
  crew: PropTypes.object.isRequired
}

export default CrewList
