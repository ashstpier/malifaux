import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { setFaction, setLeader, setTotem } from '../actions'

import { appSelector } from '../selectors'
import CrewOptions from '../components/CrewOptions'
import CrewList from '../components/CrewList'

class App extends Component {
  render () {
    const { dispatch, modelData, crewOptions } = this.props
    return (
    <div>
      <CrewOptions
        modelData={modelData}
        crewOptions={crewOptions}
        onFactionChange={faction_id => dispatch(setFaction(faction_id))}
        onLeaderChange={leader_id => dispatch(setLeader(leader_id))}
        onTotemChange={totem_id => dispatch(setTotem(totem_id))} />
      <CrewList
        modelData={modelData}
        crewOptions={crewOptions} />
    </div>
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  modelData: PropTypes.object.isRequired,
  crewOptions: PropTypes.object.isRequired
}

export default connect(appSelector)(App)
