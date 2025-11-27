import { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTrendingVideos } from '../redux/videos/videoActions';
import type { RootState } from '../redux/rootReducer';
import Grids from '../Components/Grid';
import { Box,Typography,CircularProgress } from '@mui/material';
import CategoryList from '../Components/CategoryList';
import { fetchVideosByCategory } from '../api/youtubeApi';

const Homepage = () => {

    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [selectedCategory,setSelectedCategory] = useState('')
    const [categoryVideos, setCategoryVideos] = useState([]);
    const [loadingCategoryVideos, setLoadingCategoryVideos] = useState(false);
    const [errorCategoryVideos, setErrorCategoryVideos] = useState(null);

    const store = useSelector((state: RootState) => state.videoState)
    const dispatch = useDispatch<any>()
    useEffect(() => {
        if (store.trending.length === 0)
            dispatch(fetchTrendingVideos())
    }, [store.trending.length]);


    useEffect(() => {
        let scrolled = false
        const threshold = 700
        const onScroll = () => {
            if (scrolled) return
            scrolled = true
            requestAnimationFrame(() => {
                try {

                    if (store.loading || !store.nextPageToken) return
                    const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - threshold
                    if (nearBottom) {
                        dispatch(fetchTrendingVideos(store.nextPageToken))
                    }
                } finally {
                    scrolled = false
                }
            })
        }

        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [store.nextPageToken, store.loading, dispatch]);

    useEffect(() => {
        if (!selectedCategoryId) return

        const loadCategoryVideos = async () => {
            setLoadingCategoryVideos(true)
            setErrorCategoryVideos(null)
            try {
                const videos = await fetchVideosByCategory(selectedCategoryId, 'US')
                setCategoryVideos(videos)
            } catch (err: any) {
                setErrorCategoryVideos(err.message)
            } finally {
                setLoadingCategoryVideos(false)
            }

        }

        loadCategoryVideos();
    }, [selectedCategoryId])
    const displayTrending = !selectedCategoryId 


    const handleCategorySelect = useCallback((categoryId, category) => {
        setSelectedCategoryId(categoryId);
        setSelectedCategory(category)
    }, []);

    if (store.loading && store.trending.length === 0) {
        return <div className="loading">Loading videos...</div>;
    }

    if (store.error) {
        return <div className="error">Error fetching videos: {store.error}</div>;
    }

    return (
        <Box padding={2} justifyContent={'center'}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center'
            }}>
                <CategoryList
                    selectedCategoryId={selectedCategoryId}
                    onCategorySelect={handleCategorySelect} />
            </Box>
            {displayTrending ? (
                <>
                    <Typography variant='h5' gutterBottom>Trending Videos</Typography>
                    <Grids videos={store.trending} />
                    {store.loading && store.trending.length > 0 && (
                        <div style={{ textAlign: 'center', padding: 12 }}>Loading more...</div>
                    )}
                </>
            ) : (
                <>
                    <h1>{selectedCategory}</h1>
                    {loadingCategoryVideos ? (
                        <Box display="flex" justifyContent="center" padding={4}><CircularProgress /></Box>
                    ) : errorCategoryVideos ? (
                        <Typography color="error">{errorCategoryVideos}</Typography>
                    ) : (
                        <Grids videos={categoryVideos} />
                    )}
                </>
            )}
        </Box>
    );
};


export default Homepage;