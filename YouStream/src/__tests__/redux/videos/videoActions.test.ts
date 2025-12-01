import { fetchTrendingVideos } from "../../../redux/videos/videoActions";

import { getMostPopularVideos } from "../../../api/youtubeApi";

jest.mock('../../api/youtubeApi',()=>{
    getMostPopularVideos:jest.fn(()=>())
})