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
  changeSoulstones,
  deleteTotem,
  resetSoulstones
} from '../actions'

import { appSelector } from '../selectors'
import CrewOptions from '../components/CrewOptions'
import CrewSelector from '../components/CrewSelector'
import CrewList from '../components/CrewList'

require("../styles/main.scss")

class App extends Component {
  render () {
    const { dispatch, modelData, crewOptions, crewList } = this.props

    return (
      <div id="crew-builder">
        <div className="sidebar">
          <h1>Malifaux Crew Builder</h1>
          <CrewOptions
            modelData={modelData}
            crewOptions={crewOptions}
            onFactionChange={faction => dispatch(setFaction(faction))}
            onLeaderChange={leader_id => dispatch(setLeader(leader_id))}
            onTotemChange={totem_id => dispatch(setTotem(totem_id))}
            onSoulstonesChange={soulstones => dispatch(changeSoulstones(soulstones))}
            onSoulstonesUpdate={soulstones => dispatch(setSoulstones(soulstones))}
            onResetForm={this.resetForm.bind(this)}
            onClearMembers={this.clearMembers.bind(this)} />
          <CrewSelector
            modelData={modelData}
            crewList={crewList}
            crewOptions={crewOptions}
            onMemberAdd={member => dispatch(addMember(member))}
            onMemberSelect={member => dispatch(selectMember(member))}
            onMercAdd={member => dispatch(addMember(member))}
            onMercSelect={member => dispatch(selectMerc(member))} />
        </div>
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <CrewList
                  modelData={modelData}
                  crewList={crewList}
                  onMemberDelete={member_index => dispatch(deleteMember(member_index))}
                  onTotemDelete={(totem) => dispatch(deleteTotem(totem))} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  clearMembers () {
    this.props.dispatch(clearMembers());
  }

  resetForm (faction) {
    let faction_leaders = this.props.modelData.factions[faction.id].leaders;
    let leader = this.props.modelData.leaders[faction_leaders[0]];
    let leader_members = this.props.modelData.factions[faction.id].members;
    let leader_mercs = this.props.modelData.factions[faction.id].mercs;

    this.props.dispatch(setLeader({
      id: faction_leaders[0],
      name: leader.name,
      cache: leader.cache
    }));

    this.props.dispatch(deleteTotem());
    this.props.dispatch(resetSoulstones());
    this.props.dispatch(selectMember(leader_members[0]));
    this.props.dispatch(selectMerc(leader_mercs[0]));
    this.props.dispatch(clearMembers());
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  modelData: PropTypes.object.isRequired,
  crewList: PropTypes.object.isRequired,
  crewOptions: PropTypes.object.isRequired
}

export default connect(appSelector)(App)
