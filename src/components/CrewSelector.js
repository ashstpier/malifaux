import React, { Component, PropTypes } from 'react'
import { map } from 'lodash'

class CrewSelector extends Component {
  render () {

    var modelData = this.props.modelData;
    var crewOptions = this.props.crewOptions;
    var faction = modelData.factions[crewOptions.selectedFaction];
    var leader = modelData.leaders[crewOptions.selectedLeader];

    var members = map(faction.members, function(m) {
      let member = modelData.members[m];
      let merc = member.factions.indexOf(parseInt(crewOptions.selectedFaction)) > -1;
      let cost = merc ? member.cost : member.cost + 1
      return (
        <option key={m} value={m}>{member.name} - {cost}ss</option>
      );
    });

    var mercs = map(faction.mercs, function(m) {
      let member = modelData.members[m];
      let merc = member.factions.indexOf(parseInt(crewOptions.selectedFaction)) > -1;
      let cost = merc ? member.cost : member.cost + 1
      return (
        <option key={m} value={m}>{member.name} - {cost}ss</option>
      );
    });

    return (
      <div id='crew-selector'>
        <form onSubmit={e => this.handleAddMember(e)}>
          <label>Models</label>
          <select onChange={e => this.handleSelectMember(e)} value={this.props.crew.selectedMember}>
            {members}
          </select>
          <input value="Add crew member" type="submit" />
        </form>
        <form onSubmit={e => this.handleAddMerc(e)}>
          <label>Mercenaries</label>
          <select onChange={e => this.handleSelectMerc(e)} value={this.props.crew.selectedMerc}>
            {mercs}
          </select>
          <input value="Add crew member" type="submit" />
        </form>
      </div>
    )
  }

  handleSelectMember (e) {
    this.props.onMemberSelect(e.target.value);
  }

  handleSelectMerc (e) {
    this.props.onMercSelect(e.target.value);
  }

  handleAddMember (e) {
    e.preventDefault();
    this.props.onMemberAdd(this.props.crew.selectedMember);
  }

  handleAddMerc (e) {
    e.preventDefault();
    this.props.onMercAdd(this.props.crew.selectedMerc);
  }
}

CrewSelector.propTypes = {
  onMemberSelect: PropTypes.func.isRequired,
  onMercSelect: PropTypes.func.isRequired,
  onMemberAdd: PropTypes.func.isRequired,
  onMercAdd: PropTypes.func.isRequired,
  modelData: PropTypes.object.isRequired,
  crewOptions: PropTypes.object.isRequired,
  crew: PropTypes.object.isRequired
}

export default CrewSelector
