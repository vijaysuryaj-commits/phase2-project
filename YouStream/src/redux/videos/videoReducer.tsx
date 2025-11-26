import * as types from './video.types'

const initialState = {
    trending: [],
    loading: false,
    error: null,
    nextPageToken: null,
}

export default function videoReducer(state = initialState, action: any) {
    switch (action.type) {
        case types.FETCH_TRENDING_VIDEOS_REQUEST:
            return { ...state, loading: true, error: null }
        case types.FETCH_TRENDING_VIDEOS_SUCCESS:

            if (action.payload && typeof action.payload === 'object' && 'items' in action.payload) {
                const { items, nextPageToken, append } = action.payload
                return {
                    ...state,
                    trending: append ? [...state.trending, ...(items || [])] : (items || []),
                    nextPageToken: nextPageToken ?? null,
                    loading: false,
                }
            }

            return { ...state, trending: action.payload ?? [], loading: false }
        case types.FETCH_TRENDING_VIDEOS_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }
}