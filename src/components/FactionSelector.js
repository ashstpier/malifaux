import React, { Component, PropTypes } from 'react'
import { map } from 'lodash'
import Select from 'react-select'

class CrewOptions extends Component {
  render () {

    var modelData = this.props.modelData;
    var crewOptions = this.props.crewOptions;

    var factions = map(modelData.factions, function(faction, f) {
      return (
        {value: f, label: faction.name}
      );
    });

    return (
      <div className="faction-options">
        <label>Faction</label>
        <Select
          name="faction-select"
          value={crewOptions.selectedFaction}
          options={factions}
          onChange={e => this.handleChangeFaction(e)}
          clearable={false} />
      </div>
    )
  }

  handleChangeFaction (e) {
    this.props.switchFaction(e);
  }
}

CrewOptions.propTypes = {
  switchFaction: PropTypes.func.isRequired,
  modelData: PropTypes.object.isRequired,
  crewOptions: PropTypes.object.isRequired
}

export default CrewOptions
