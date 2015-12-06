import React, { Component, PropTypes } from 'react'
import { map } from 'lodash'
import Select from 'react-select'

class CrewOptions extends Component {
  render () {

    var modelData = this.props.modelData;
    var crewOptions = this.props.crewOptions;
    var faction = modelData.factions[crewOptions.selectedFaction];
    var leader = modelData.leaders[crewOptions.selectedLeader];

    var totems = map(modelData.totems, function(faction, t) {
      let totem = modelData.totems[t];
      let isLeader = totem.leaders.indexOf(parseInt(crewOptions.selectedLeader)) > -1 || totem.merc;
      if(isLeader){
        let merc = totem.merc && totem.factions.indexOf(parseInt(crewOptions.selectedFaction)) == -1;
        let cost = merc ? totem.cost + 1 : totem.cost
        return (
          {value: t, label: totem.name}
        );
      }
    }).filter(function(n){ return n != undefined });

    return (
      <div className="totem-options">
        <label>Totem</label>
        <Select
          name="totem-select"
          value={crewOptions.selectedTotem}
          options={totems}
          onChange={e => this.handleChangeTotem(e)}
          placeholder="Select totem..."
          clearable={false} />
      </div>
    )
  }

  handleChangeTotem (e) {
    this.props.switchTotem(e);
  }
}

CrewOptions.propTypes = {
  switchTotem: PropTypes.func.isRequired,
  modelData: PropTypes.object.isRequired,
  crewOptions: PropTypes.object.isRequired
}

export default CrewOptions
