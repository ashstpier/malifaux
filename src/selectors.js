import { createSelector } from 'reselect'

const modelDataSelector = state => state.modelData
const crewOptionsSelector = state => state.crewOptions

export const appSelector = createSelector(
  modelDataSelector,
  crewOptionsSelector,
  (modelData, crewOptions) => {
    return {
      modelData,
      crewOptions
    }
  }
)
