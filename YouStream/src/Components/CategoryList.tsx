import React, { useState, useEffect, useMemo } from 'react';
import { fetchCategories } from '../api/youtubeApi';
import { Chip, Box, Pagination, useMediaQuery, useTheme, CircularProgress, Typography } from '@mui/material';


const CategoryList = ({ selectedCategoryId, onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isExtraSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const itemsPerPage = useMemo(() => {
    if (isExtraSmallScreen) return 3;
    if (isSmallScreen) return 5;
    return 8;
  }, [isSmallScreen, isExtraSmallScreen]);

  useEffect(() => {
    (async () => {
      console.log('CategoryList component mount')
      setLoading(true);
      setError(null);
      try {
        const v = await fetchCategories();
        const assignable = v.filter(cat => cat.snippet.assignable);
        setCategories(assignable);
      } catch (err: any) {
        setError(err.message)
      } finally { }
      setLoading(false)

    })();
  }, []);


  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCategories = categories.slice(startIndex, endIndex);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
        <CircularProgress />
        <Typography variant="h6" sx={{ marginLeft: 2 }}>Loading categories...</Typography>
      </Box>
    );
  }

  if (error) {
    return <Box className="error" sx={{ padding: 2, color: 'error.main' }}>Error fetching data: {error}</Box>;
  }

  return (
    <Box sx={{ padding: 2 }}>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginBottom: 2 }}>
        {currentCategories.map((category) => (
          <Chip
            key={category.id}
            label={category.snippet.title}
            onClick={() => onCategorySelect(category.id,category.snippet.title)}
            color={selectedCategoryId === category.id ? "primary" : "default"}
            variant="filled"
            clickable
            sx={{
              color: selectedCategoryId === category.id ? 'white' : 'black', 
              bgcolor: selectedCategoryId === category.id ? 'black' : 'lightgrey', 
              '&:hover': {
                color: 'white',
                bgcolor: 'black'
              }
            }}
          />

        ))}
      </Box>

      <Box display="flex" justifyContent="center" marginTop={3}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          size={isExtraSmallScreen ? "small" : "medium"}
        />
      </Box>
    </Box>
  );
};

export default CategoryList;
