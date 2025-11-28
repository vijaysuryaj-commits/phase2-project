import React, { useEffect, useState, } from "react";
import { fetchCategories } from "../api/youtubeApi";
import {
  Chip,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";

interface Props {
  selectedCategoryId: string | null;
  onCategorySelect: (id: string, title: string) => void;
}

const CategoryList = ({ selectedCategoryId, onCategorySelect }:Props) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const v = await fetchCategories();
        if (!mounted) return;
        const assignable = Array.isArray(v) ? v.filter((cat: any) => cat?.snippet?.assignable) : [];
        setCategories(assignable);
      } catch (err: any) {
        if (!mounted) return;
        setError(err?.message ?? "Failed to load categories");
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);



  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="120px">
        <CircularProgress size={20} />
        <Typography variant="body2" sx={{ marginLeft: 2 }}>
          Loading categories...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return <Box sx={{ padding: 2, color: "error.main" }}>Error fetching data: {error}</Box>;
  }

  const allSelected = selectedCategoryId === null || selectedCategoryId === "";

  return (
    <Box sx={{ width: "100%", py: 1, bgcolor: "transparent" }}>
      <Box sx={{ 
        maxWidth: 1200, 
        mx: "auto", 
        position: "relative", 
        px: { xs: 1, sm: 2 } 
        }}>
        
        
        <Box
          sx={{
            overflowX: "auto",
            scrollBehavior: "smooth",
            "&::-webkit-scrollbar": { display: "none" },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              py: 1,
              flexWrap: "nowrap",
            }}
          >
            <Chip
              key={"all"}
              label={"All"}
              onClick={() => onCategorySelect("", "")}
              clickable
              color={allSelected ? "primary" : "default"}
              variant="filled"
              sx={{
                minWidth: 88,
                px: 2,
                py: 1,
                fontWeight: allSelected ? 700 : 500,
                bgcolor: allSelected ? "black" : "lightgrey",
                color: allSelected ? "white" : "black",
                borderRadius: 6,
                whiteSpace: "nowrap",
                flex: "0 0 auto",
                "&:hover": {
                  bgcolor: "black",
                  color: "white",
                },
              }}
            />

            {categories.map((category) => {
              const id = category.id;
              const title = category.snippet?.title ?? "Unknown";
              const selected = selectedCategoryId === id;
              return (
                <Chip
                  key={id}
                  
                  label={title}
                  onClick={() => onCategorySelect(id, title)}
                  aria-pressed={selected}
                  clickable
                  variant="filled"
                  sx={{
                    minWidth: 88,
                    px: 2,
                    py: 1,
                    fontWeight: selected ? 700 : 500,
                    bgcolor: selected ? "black" : "lightgrey",
                    color: selected ? "white" : "black",
                    borderRadius: 6,
                    whiteSpace: "nowrap",
                    flex: "0 0 auto",
                    "&:hover": {
                      bgcolor: "black",
                      color: "white",
                    },
                  }}
                />
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CategoryList;