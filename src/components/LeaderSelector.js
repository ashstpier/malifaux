import React, { Component, PropTypes } from 'react'
import { map } from 'lodash'
import Select from 'react-select'

class LeaderSelect extends Component {
  render () {

    var modelData = this.props.modelData;
    var crewOptions = this.props.crewOptions;
    var faction = modelData.factions[crewOptions.selectedFaction];

    var leaders = map(faction.leaders, function(l) {
      let leader = modelData.leaders[l];
      return (
        {value: l, label: leader.name}
      );
    });

    return (
      <div className="leader-options">
        <label>Leader</label>
        <Select
          name="leader-select"
          value={crewOptions.selectedLeader}
          options={leaders}
          onChange={e => this.handleChangeLeader(e)}
          clearable={false} />
      </div>
    )
  }

  handleChangeLeader (e) {
    let leader = this.props.modelData.leaders[e];
    this.props.switchLeader({
      id: e,
      name: leader.name,
      cache: leader.cache
    });
  }
}

LeaderSelect.propTypes = {
  switchLeader: PropTypes.func.isRequired,
  modelData: PropTypes.object.isRequired,
  crewOptions: PropTypes.object.isRequired
}

export default LeaderSelect
