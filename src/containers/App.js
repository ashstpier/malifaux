import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  setFaction,
  setLeader,
  setTotem,
  addMember,
  selectMember,
  deleteMember,
  selectMerc,
  clearMembers,
  setSoulstones,
  changeSoulstones
} from '../actions'

import { appSelector } from '../selectors'
import CrewOptions from '../components/CrewOptions'
import CrewSelector from '../components/CrewSelector'
import CrewList from '../components/CrewList'

require("../styles/main.scss")

class App extends Component {
  render () {
    const { dispatch, modelData, crewOptions, crew } = this.props

    return (
      <div id="crew-builder">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h1>Malifaux Crew Builder</h1>
              <CrewOptions
                modelData={modelData}
                crewOptions={crewOptions}
                onFactionChange={faction_id => dispatch(setFaction(faction_id))}
                onLeaderChange={leader_id => dispatch(setLeader(leader_id))}
                onTotemChange={totem_id => dispatch(setTotem(totem_id))}
                onSoulstonesChange={soulstones => dispatch(changeSoulstones(soulstones))}
                onSoulstonesUpdate={soulstones => dispatch(setSoulstones(soulstones))}
                onResetForm={this.resetForm.bind(this)}
                onClearMembers={this.clearMembers.bind(this)} />
              <CrewSelector
                modelData={modelData}
                crewOptions={crewOptions}
                crew={crew}
                onMemberAdd={member => dispatch(addMember(member))}
                onMemberSelect={member => dispatch(selectMember(member))}
                onMercAdd={member => dispatch(addMember(member))}
                onMercSelect={member => dispatch(selectMerc(member))} />
            </div>
            <div className="col-md-8">
              <CrewList
                modelData={modelData}
                crewOptions={crewOptions}
                crew={crew}
                onMemberDelete={member_index => dispatch(deleteMember(member_index))} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  clearMembers () {
    this.props.dispatch(clearMembers());
  }

  resetForm (faction_id) {
    this.props.dispatch(clearMembers());
    let faction_leaders = this.props.modelData.factions[faction_id].leaders;
    this.props.dispatch(setLeader(String(faction_leaders[0])));
    this.props.dispatch(setTotem(""));

    let leader_members = this.props.modelData.factions[faction_id].members;
    let leader_mercs = this.props.modelData.factions[faction_id].mercs;
    this.props.dispatch(selectMember(leader_members[0]));
    this.props.dispatch(selectMerc(leader_mercs[0]));
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  modelData: PropTypes.object.isRequired,
  crewOptions: PropTypes.object.isRequired,
  crew: PropTypes.object.isRequired
}

export default connect(appSelector)(App)
