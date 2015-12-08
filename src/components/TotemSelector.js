import React, { Component, PropTypes } from 'react'
import { map } from 'lodash'
import Select from 'react-select'

class TotemSelect extends Component {
  render () {

    var modelData = this.props.modelData;
    var crew = this.props.crew;
    var faction = modelData.factions[crew.selectedFaction];
    var leader = modelData.leaders[crew.selectedLeader];

    var totems = map(modelData.totems, function(faction, t) {
      let totem = modelData.totems[t];
      let isLeader = totem.leaders.indexOf(parseInt(crew.selectedLeader)) > -1 || totem.merc;
      if(isLeader){
        let merc = totem.merc && totem.factions.indexOf(parseInt(crew.selectedFaction)) == -1;
        let cost = merc ? totem.cost + 1 : totem.cost
        return (
          {value: t, label: totem.name, cost: totem.cost}
        );
      }
    }).filter(function(n){ return n != undefined });

    return (
      <div className="totem-options">
        <label>Totem</label>
        <Select
          name="totem-select"
          value={crew.selectedTotem.id}
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
    this.props.switchTotem({
      id: e,
      data: this.props.modelData.totems[e]
    });
  }
}

TotemSelect.propTypes = {
  switchTotem: PropTypes.func.isRequired,
  modelData: PropTypes.object.isRequired
}

export default TotemSelect
