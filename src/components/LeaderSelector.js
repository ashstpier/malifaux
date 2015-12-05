import React, { Component, PropTypes } from 'react'
import { map } from 'lodash'

class CrewOptions extends Component {
  render () {

    var modelData = this.props.modelData;
    var crewOptions = this.props.crewOptions;
    var faction = modelData.factions[crewOptions.selectedFaction];

    var leaders = map(faction.leaders, function(l) {
      let leader = modelData.leaders[l];
      return (
        <option key={l} value={l}>{leader.name}</option>
      );
    });

    return (
      <div className="leader-options">
        <label>Leader</label>
        <select onChange={e => this.handleChangeLeader(e)} value={crewOptions.selectedLeader}>
          {leaders}
        </select>
      </div>
    )
  }

  handleChangeLeader (e) {
    this.props.switchLeader(e.target.value);
  }
}

CrewOptions.propTypes = {
  switchLeader: PropTypes.func.isRequired,
  modelData: PropTypes.object.isRequired,
  crewOptions: PropTypes.object.isRequired
}

export default CrewOptions
