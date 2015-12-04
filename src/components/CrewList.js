import React, { Component, PropTypes } from 'react'

class CrewList extends Component {
  render () {

    var modelData = this.props.modelData;
    var crewOptions = this.props.crewOptions;
    var faction = modelData.factions[crewOptions.selectedFaction];

    return (
      <div id='crew-list'>
        <p>{faction.name}</p>
      </div>
    )
  }
}

CrewList.propTypes = {
  modelData: PropTypes.object.isRequired,
  crewOptions: PropTypes.object.isRequired
}

export default CrewList
