import React, { Component, PropTypes } from 'react'
import { map } from 'lodash'
import Select from 'react-select'

class CrewSelector extends Component {
  render () {
    const { modelData, crewOptions, crew } = this.props

    var faction = modelData.factions[crewOptions.selectedFaction];
    var leader = modelData.leaders[crewOptions.selectedLeader];

    var members = map(faction.members, function(m) {
      return this.buildMember(m)
    }, this);

    var mercs = map(faction.mercs, function(m) {
      return this.buildMember(m)
    }, this);

    return (
      <div id='crew-selector'>
        <form onSubmit={e => this.handleAddMember(e)}>
          <label>Models</label>
          <Select
            name="member-select"
            value={crew.selectedMember}
            options={members}
            onChange={e => this.handleSelectMember(e)}
            placeholder="Select member..."
            clearable={false} />
          <input value="Add crew member" type="submit" />
        </form>
        <form onSubmit={e => this.handleAddMerc(e)}>
          <label>Mercenaries</label>
          <Select
            name="merc-select"
            value={crew.selectedMerc}
            options={mercs}
            onChange={e => this.handleSelectMerc(e)}
            placeholder="Select mercenary..."
            clearable={false} />
          <input value="Add mercenary" type="submit" />
        </form>
      </div>
    )
  }

  buildMember (m) {
    let member = this.props.modelData.members[m];
    let merc = member.factions.indexOf(parseInt(this.props.crewOptions.selectedFaction)) > -1;
    let cost = merc ? member.cost : member.cost + 1
    return (
      {value: m, label: member.name}
    );
  }

  handleSelectMember (e) {
    this.props.onMemberSelect(e);
  }

  handleSelectMerc (e) {
    this.props.onMercSelect(e);
  }

  handleAddMember (e) {
    e.preventDefault();
    let model = this.props.modelData.members[this.props.crew.selectedMember];
    if(this.props.crew.soulstonesRemaining >= parseInt(model.cost)){
      this.props.onMemberAdd(model);
    }
  }

  handleAddMerc (e) {
    e.preventDefault();
    let model = this.props.modelData.members[this.props.crew.selectedMerc];
    if(this.props.crew.soulstonesRemaining >= parseInt(model.cost)){
      let cost = model.cost;
      let merc = {
        name: this.props.modelData.members[this.props.crew.selectedMerc].name,
        cost: parseInt(cost) + 1,
        merc: true
      }
      this.props.onMercAdd(merc);
    }
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
