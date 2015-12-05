import React, { Component, PropTypes } from 'react'
import { map } from 'lodash'

class CrewOptions extends Component {
  render () {

    var modelData = this.props.modelData;
    var crewOptions = this.props.crewOptions;
    var faction = modelData.factions[crewOptions.selectedFaction];
    var leader = modelData.leaders[crewOptions.selectedLeader];

    var totems = map(leader.totems, function(t) {
      let totem = modelData.totems[t];
      let isLeader = totem.factions.indexOf(parseInt(crewOptions.selectedFaction)) > -1 || totem.merc;
      if(isLeader){
        let merc = totem.merc && totem.factions.indexOf(parseInt(crewOptions.selectedFaction)) == -1;
        let cost = merc ? totem.cost + 1 : totem.cost
        return (
          <option key={t} value={t}>{totem.name} - {cost}ss</option>
        );
      }
    });

    return (
      <div className="totem-options">
        <label>Totem</label>
        <select onChange={e => this.handleChangeTotem(e)} value={crewOptions.selectedTotem}>
          <option value="">Choose totem</option>
          {totems}
        </select>
      </div>
    )
  }

  handleChangeTotem (e) {
    this.props.switchTotem(e.target.value);
  }
}

CrewOptions.propTypes = {
  switchTotem: PropTypes.func.isRequired,
  modelData: PropTypes.object.isRequired,
  crewOptions: PropTypes.object.isRequired
}

export default CrewOptions
