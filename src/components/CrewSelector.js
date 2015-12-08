import React, { Component, PropTypes } from 'react'
import { map } from 'lodash'
import Select from 'react-select'

class CrewSelector extends Component {
  render () {
    const { modelData, crew } = this.props

    var faction = modelData.factions[crew.selectedFaction];
    var leader = modelData.leaders[crew.selectedLeader];

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
          <div className="inline-select">
            <Select
              name="member-select"
              value={crew.selectedMember}
              options={members}
              onChange={e => this.handleSelectMember(e)}
              placeholder="Select member..."
              clearable={false}
              optionRenderer={this.renderOption} />
            <input value="Add" type="submit" />
          </div>
        </form>
        <form onSubmit={e => this.handleAddMerc(e)}>
          <label>Mercenaries</label>
          <div className="inline-select">
            <Select
              name="merc-select"
              value={crew.selectedMerc}
              options={mercs}
              onChange={e => this.handleSelectMerc(e)}
              placeholder="Select mercenary..."
              clearable={false}
              optionRenderer={this.renderOption} />
            <input value="Add" type="submit" />
          </div>
        </form>
      </div>
    )
  }

  renderOption (option) {
    return <span>{option.label} <strong className="float-right">{option.cost}ss</strong></span>;
  }

  buildMember (m) {
    let member = this.props.modelData.members[m];
    let merc = member.factions.indexOf(parseInt(this.props.crew.selectedFaction)) > -1;
    let cost = merc ? member.cost : member.cost + 1
    return (
      {value: m, label: member.name, cost: member.cost}
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
  crew: PropTypes.object.isRequired
}

export default CrewSelector
