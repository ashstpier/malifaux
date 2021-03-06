import React, { Component, PropTypes } from 'react'
import { map, reduce } from 'lodash'
import classNames from 'classnames'

class CrewList extends Component {
  render () {
    const { modelData, crewList, crewOptions } = this.props

    var faction = crewList.faction;
    var leader = crewList.leader;
    var totem = crewList.totem;

    if(totem.name){
      var totem_el = <li className='totem'>
        {totem.name} - {totem.cost}ss
        <span className="float-right delete-icon" onClick={this.deleteTotem.bind(this, totem.cost)}>
          <i className="fa fa-times"></i>
        </span>
      </li>
    }

    var members = map(crewList.members, function(member, id) {
      return (
        <li key={id}>
          {member.name} - {member.cost}ss
          <span className="float-right delete-icon" onClick={this.deleteMember.bind(this, id, member.cost)}>
            <i className="fa fa-times"></i>
          </span>
        </li>
      );
    }, this);

    var negativeClass = classNames({red: crewList.soulstonesRemaining < 0});

    return (
      <div id='crew'>
        <h1 className='faction' style={{color: faction.color}}>{faction.name}</h1>
        <div className='soulstone-amount'>
          <span className={negativeClass}>{crewList.soulstonesRemaining}</span>/{crewList.soulstoneAmount}
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
    this.props.onTotemDelete(cost);
  }
}

CrewList.propTypes = {
  onMemberDelete: PropTypes.func.isRequired,
  onTotemDelete: PropTypes.func.isRequired,
  modelData: PropTypes.object.isRequired,
  crewList: PropTypes.object.isRequired
}

export default CrewList
