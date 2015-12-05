import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { setFaction, setLeader, setTotem, addMember, selectMember, selectMerc, clearMembers } from '../actions'

import { appSelector } from '../selectors'
import CrewOptions from './CrewOptions'
import CrewSelector from '../components/CrewSelector'
import CrewList from '../components/CrewList'

class App extends Component {
  render () {
    const { dispatch, modelData, crewOptions, crew } = this.props

    return (
      <div id="crew-builder">
        <h1>Malifaux Crew Builder</h1>
        <CrewOptions
          modelData={modelData}
          crewOptions={crewOptions}
          onFactionChange={faction_id => dispatch(setFaction(faction_id))}
          onLeaderChange={leader_id => dispatch(setLeader(leader_id))}
          onTotemChange={totem_id => dispatch(setTotem(totem_id))}
          onResetForm={this.resetForm.bind(this)} />
        <CrewSelector
          modelData={modelData}
          crewOptions={crewOptions}
          crew={crew}
          onMemberAdd={member_id => dispatch(addMember(member_id))}
          onMemberSelect={member_id => dispatch(selectMember(member_id))}
          onMercAdd={member_id => dispatch(addMember(member_id))}
          onMercSelect={member_id => dispatch(selectMerc(member_id))} />
        <CrewList
          modelData={modelData}
          crewOptions={crewOptions}
          crew={crew} />
      </div>
    )
  }

  resetForm (faction_id) {
    this.props.dispatch(clearMembers());
    let faction_leaders = this.props.modelData.factions[faction_id].leaders;
    this.props.dispatch(setLeader(faction_leaders[0]));
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
