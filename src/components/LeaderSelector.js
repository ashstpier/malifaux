import React, { Component, PropTypes } from 'react'
import { map } from 'lodash'
import Select from 'react-select'

class LeaderSelect extends Component {
  render () {

    var modelData = this.props.modelData;
    var crew = this.props.crew;
    var faction = modelData.factions[crew.selectedFaction];

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
          value={crew.selectedLeader}
          options={leaders}
          onChange={e => this.handleChangeLeader(e)}
          clearable={false} />
      </div>
    )
  }

  handleChangeLeader (e) {
    this.props.switchLeader(e);
  }
}

LeaderSelect.propTypes = {
  switchLeader: PropTypes.func.isRequired,
  modelData: PropTypes.object.isRequired,
  crew: PropTypes.object.isRequired
}

export default LeaderSelect
