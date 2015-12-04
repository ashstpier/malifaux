import React, { Component, PropTypes } from 'react'
import { map } from 'lodash'

class CrewOptions extends Component {
  render () {

    var modelData = this.props.modelData;
    var crewOptions = this.props.crewOptions;
    var faction = modelData.factions[crewOptions.selectedFaction];
    var leader = faction.leaders[crewOptions.selectedLeader];

    var factions = map(modelData.factions, function(faction, id) {
      return (
        <option key={id} value={id}>{faction.name}</option>
      );
    }, this);

    var leaders = map(modelData.factions[crewOptions.selectedFaction].leaders, function(leader, id) {
      return (
        <option key={id} value={id}>{leader.name}</option>
      );
    }, this);

    var totems = map(modelData.factions[crewOptions.selectedFaction].leaders[crewOptions.selectedLeader].totems, function(totem, id) {
      return (
        <option key={id} value={id}>{totem.name}</option>
      );
    }, this);

    return (
      <div id='crew-options'>
        <div className="faction-options">
          <form>
            <label>Faction</label>
            <select onChange={e => this.handleChangeFaction(e)} value={crewOptions.selectedFaction}>
              {factions}
            </select>
            <label>Leader</label>
            <select onChange={e => this.handleChangeLeader(e)} value={crewOptions.selectedLeader}>
              {leaders}
            </select>
            <label>Totem</label>
            <select onChange={e => this.handleChangeTotem(e)} value={crewOptions.selectedTotem}>
              <option value="">Choose totem</option>
              {totems}
            </select>
          </form>
        </div>
      </div>
    )
  }

  handleChangeFaction (e) {
    this.props.onFactionChange(e.target.value);

    var leaders = this.props.modelData.factions[e.target.value].leaders;
    this.props.onLeaderChange(Object.keys(leaders)[0]);
    this.props.onTotemChange("");
  }

  handleChangeLeader (e) {
    this.props.onLeaderChange(e.target.value);
    this.props.onTotemChange("");
  }

  handleChangeTotem (e) {
    this.props.onTotemChange(e.target.value);
  }
}

CrewOptions.propTypes = {
  onFactionChange: PropTypes.func.isRequired,
  onLeaderChange: PropTypes.func.isRequired,
  onTotemChange: PropTypes.func.isRequired,
  modelData: PropTypes.object.isRequired,
  crewOptions: PropTypes.object.isRequired
}

export default CrewOptions
