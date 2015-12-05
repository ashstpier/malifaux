import { createSelector } from 'reselect'

const modelDataSelector = state => state.modelData
const crewOptionsSelector = state => state.crewOptions
const crewSelector = state => state.crew

export const appSelector = createSelector(
  modelDataSelector,
  crewOptionsSelector,
  crewSelector,
  (modelData, crewOptions, crew) => {
    return {
      modelData,
      crewOptions,
      crew
    }
  }
)
