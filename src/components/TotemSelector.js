import React, { Component, PropTypes } from 'react'
import { map } from 'lodash'
import Select from 'react-select'

class TotemSelect extends Component {
  render () {

    var modelData = this.props.modelData;
    var crewOptions = this.props.crewOptions;
    var faction = modelData.factions[crewOptions.selectedFaction];
    var leader = modelData.leaders[crewOptions.selectedLeader];

    var totems = map(leader.totems, function(t) {
      let totem = modelData.totems[t];

      if(totem.factions.indexOf(parseInt(crewOptions.selectedFaction)) != -1 || totem.merc){

        let merc = totem.merc && totem.factions.indexOf(parseInt(crewOptions.selectedFaction)) == -1;
        let cost = merc ? totem.cost + 1 : totem.cost
        return (
          {value: t, label: totem.name, cost: cost}
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
          optionRenderer={this.renderOption}
          placeholder="Select totem..."
          clearable={false} />
      </div>
    )
  }

  renderOption (option) {
    return <span>{option.label} <strong className="float-right">{option.cost}ss</strong></span>;
  }

  handleChangeTotem (e) {
    let totem = this.props.modelData.totems[e];
    this.props.switchTotem({
      id: e,
      name: totem.name,
      cost: totem.cost
    });
  }
}

TotemSelect.propTypes = {
  switchTotem: PropTypes.func.isRequired,
  modelData: PropTypes.object.isRequired,
  crewOptions: PropTypes.object.isRequired
}

export default TotemSelect
