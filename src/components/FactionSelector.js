import React, { Component, PropTypes } from 'react'
import { map } from 'lodash'

class CrewOptions extends Component {
  render () {

    var modelData = this.props.modelData;
    var crewOptions = this.props.crewOptions;

    var factions = map(modelData.factions, function(faction, id) {
      return (
        <option key={id} value={id}>{faction.name}</option>
      );
    });

    return (
      <div className="faction-options">
        <label>Faction</label>
        <select onChange={e => this.handleChangeFaction(e)} value={crewOptions.selectedFaction}>
          {factions}
        </select>
      </div>
    )
  }

  handleChangeFaction (e) {
    this.props.switchFaction(e.target.value);
  }
}

CrewOptions.propTypes = {
  switchFaction: PropTypes.func.isRequired,
  modelData: PropTypes.object.isRequired,
  crewOptions: PropTypes.object.isRequired
}

export default CrewOptions
