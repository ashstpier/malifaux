import { createSelector } from 'reselect'

const modelDataSelector = state => state.modelData
const crewOptionsSelector = state => state.crewOptions
const crewListSelector = state => state.crewList

export const appSelector = createSelector(
  modelDataSelector,
  crewOptionsSelector,
  crewListSelector,
  (modelData, crewOptions, crewList) => {
    return {
      modelData,
      crewOptions,
      crewList
    }
  }
)
