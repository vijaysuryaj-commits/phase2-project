import * as types from './video.types'
import axios from 'axios'


const API_KEY: string = 'AIzaSyBkqPFn7RJuTDOYCBOH-vsabBYfDyS_qHw';

const BASE_URL: string = 'https://www.googleapis.com/youtube/v3/videos';


export const fetchTrendingVideos = (pageToken?: string) => async (dispatch: any) => {
    dispatch({ type: types.FETCH_TRENDING_VIDEOS_REQUEST })
    try {
        const params: Record<string, string> = {
            part: 'snippet,statistics',
            chart: 'mostPopular',
            regionCode: 'IN',
            maxResults: '12',
            key: API_KEY,
        };
        if (pageToken) params.pageToken = pageToken;

        const res = await axios.get(`${BASE_URL}?${new URLSearchParams(params).toString()}`)

        
        dispatch({
            type: types.FETCH_TRENDING_VIDEOS_SUCCESS,
            payload: {
                items: res.data.items ?? [],
                nextPageToken: res.data.nextPageToken ?? null,
                append: Boolean(pageToken),
            },
        })
    }
    catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        dispatch({ type: types.FETCH_TRENDING_VIDEOS_FAILURE, payload: message })
    }
}
