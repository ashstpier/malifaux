import React, { Component, PropTypes } from 'react'

class CrewList extends Component {
  render () {

    var modelData = this.props.modelData;
    var crewOptions = this.props.crewOptions;
    var faction = modelData.factions[crewOptions.selectedFaction];
    var leader = faction.leaders[crewOptions.selectedLeader];
    var totem = leader.totems[crewOptions.selectedTotem];

    if(totem) var totem_el = <p>{totem.name} - {totem.cost}ss</p>

    return (
      <div id='crew-list'>
        <p>{faction.name}</p>
        <p>{leader.name} - {leader.cache}ss</p>
        {totem_el}
      </div>
    )
  }
}

CrewList.propTypes = {
  modelData: PropTypes.object.isRequired,
  crewOptions: PropTypes.object.isRequired
}

export default CrewList
