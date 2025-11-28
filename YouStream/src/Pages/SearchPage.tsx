import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography, CircularProgress,Button } from "@mui/material";
import { searchVideos } from "../api/youtubeApi";
import Grids from "../Components/Grid";
import SearchTabs from "../Components/SearchTabs";


const SearchPage = () => {
  const { query } = useParams();

  const [videos, setVideos] = useState<any>([]);
  const [nextPageToken, setNextPageToken] = useState<string|null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate()
 useEffect(() => {
  if (!query) return;

  async function load() {
    setLoading(true);
    setError(null);

    try {
      const res = await searchVideos(query);
      setVideos(res.videos || []);
      setNextPageToken(res.nextPageToken || null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  load();
}, [query]);


  useEffect(() => {
    let ticking = false;
    const threshold = 700;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(async () => {
        try {
          if (loading || loadingMore || !nextPageToken) return;

          const nearBottom =
            window.innerHeight + window.scrollY >=
            document.body.offsetHeight - threshold;

          if (nearBottom) {
            setLoadingMore(true);
            try {
              const res = await searchVideos(query, nextPageToken);
              setVideos((prev:any) => [...prev, ...(res.videos || [])]);
              setNextPageToken(res.nextPageToken || null);
            } catch (err: any) {
              setError(err.message);
            } finally {
              setLoadingMore(false);
            }
          }
        } finally {
          ticking = false;
        }
      });
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [nextPageToken, loading, loadingMore, query]);

  return (
    <Box p={2}>
      <Button
      size="large"
        onClick={() => navigate(-1)}
        sx={{
          mb: 2,
          color: "black",
          textTransform: "none",
          fontWeight: 'bolder',
          bgcolor:'rgba(0,0,0,0.05)',
          "&:hover": { backgroundColor: "lightgrey" },
        }}
      >
        Back
      </Button>
      <Typography variant="h5" mb={2}>
        Search results for: <strong>{query}</strong>
      </Typography>
        <SearchTabs /> 
      {loading && videos.length === 0 && 
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      }

      {error && <Box color="error.main">Error: {error}</Box>}

      {videos.length > 0 && <Grids videos={videos} />}

      {loadingMore && (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress size={22} />
        </Box>
      )}
    </Box>
  );
};

export default SearchPage;