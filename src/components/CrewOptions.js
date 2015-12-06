import React, { Component, PropTypes } from 'react'
import { map } from 'lodash'
import FactionSelector from '../components/FactionSelector'
import LeaderSelector from '../components/LeaderSelector'
import TotemSelector from '../components/TotemSelector'

class CrewOptions extends Component {
  render () {
    const { modelData, crewOptions } = this.props

    return (
      <div id='crew-options'>
        <form onSubmit={e => this.handleUpdateSoulstones(e)} onBlur={e => this.handleUpdateSoulstones(e)}>
          <input type="text" value={crewOptions.selectedSoulstones} onChange={e => this.handleChangeSoulstones(e)}/>
        </form>
        <form>
          <FactionSelector
            modelData={modelData}
            crewOptions={crewOptions}
            switchFaction={this.onFactionChange.bind(this)} />
          <LeaderSelector
            modelData={modelData}
            crewOptions={crewOptions}
            switchLeader={this.onLeaderChange.bind(this)} />
          <TotemSelector
            modelData={modelData}
            crewOptions={crewOptions}
            switchTotem={this.onTotemChange.bind(this)} />
        </form>
      </div>
    )
  }

  onFactionChange (val) {
    this.props.onFactionChange(val);
    this.props.onResetForm(val);
  }

  onLeaderChange (val) {
    this.props.onLeaderChange(val);
    this.props.onTotemChange("");
  }

  onTotemChange (val) {
    this.props.onTotemChange(val);
  }

  handleChangeSoulstones (e) {
    this.props.onSoulstonesChange(e.target.value);
  }

  handleUpdateSoulstones (e) {
    e.preventDefault();
    var ss = this.props.crewOptions.selectedSoulstones;
    var regex=/^[0-9]+$/;
    if (ss.match(regex)){
      if(parseInt(ss) < 10){
        this.props.onSoulstonesUpdate(10);
        this.props.onSoulstonesChange(10);
      }else{
        this.props.onSoulstonesUpdate(ss);
        this.props.onSoulstonesChange(ss);
      }
    }else{
      this.props.onSoulstonesUpdate(50);
      this.props.onSoulstonesChange(50);
    }
  }
}

CrewOptions.propTypes = {
  onFactionChange: PropTypes.func.isRequired,
  onLeaderChange: PropTypes.func.isRequired,
  onTotemChange: PropTypes.func.isRequired,
  onSoulstonesChange: PropTypes.func.isRequired,
  onSoulstonesUpdate: PropTypes.func.isRequired,
  onResetForm: PropTypes.func.isRequired,
  modelData: PropTypes.object.isRequired,
  crewOptions: PropTypes.object.isRequired
}

export default CrewOptions
