// src/components/instructor/InstructorReviews.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Rating,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Search as SearchIcon,
  ArrowDropUp,
  ArrowDropDown,
} from "@mui/icons-material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

const InstructorReviews = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      studentName: "John Doe",
      courseTitle: "Introduction to React",
      rating: 4.5,
      comment: "Great course!",
      date: "2025-03-15",
    },
    {
      id: 2,
      studentName: "Jane Smith",
      courseTitle: "Advanced JavaScript",
      rating: 5,
      comment: "Amazing content!",
      date: "2025-03-20",
    },
    {
      id: 3,
      studentName: "Bob Johnson",
      courseTitle: "Introduction to React",
      rating: 3,
      comment: "Good but needs more examples.",
      date: "2025-03-22",
    },
    {
      id: 4,
      studentName: "Alice Brown",
      courseTitle: "Introduction to React",
      rating: 4,
      comment: "Very clear!",
      date: "2025-03-25",
    },
    {
      id: 5,
      studentName: "Tom Wilson",
      courseTitle: "Advanced JavaScript",
      rating: 2.5,
      comment: "Too fast-paced.",
      date: "2025-03-26",
    },
    {
      id: 6,
      studentName: "Bob Johnson",
      courseTitle: "Introduction to AI",
      rating: 4.5,
      comment: "Goods.",
      date: "2025-03-22",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [tabValue, setTabValue] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState("All"); // Default to "All" courses

  // Get unique course titles for dropdown
  const courseTitles = [
    "All",
    ...new Set(reviews.map((review) => review.courseTitle)),
  ];

  // Filter reviews based on selected course and search term
  const filteredReviews = reviews
    .filter(
      (review) =>
        selectedCourse === "All" || review.courseTitle === selectedCourse
    )
    .filter(
      (review) =>
        review.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.comment.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Handle sorting
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  // Sort filtered reviews
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (!sortColumn) return 0;
    let valueA = a[sortColumn];
    let valueB = b[sortColumn];
    if (typeof valueA === "string") {
      valueA = valueA.toLowerCase();
      valueB = valueB.toLowerCase();
    }
    if (sortDirection === "asc") {
      return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
    } else {
      return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
    }
  });

  // --- Review Summary Calculations (Filtered by Selected Course) ---

  // Filter reviews for summary based on selected course
  const summaryReviews = reviews.filter(
    (review) =>
      selectedCourse === "All" || review.courseTitle === selectedCourse
  );

  // 1. Average Rating by Course
  const averageRatingByCourse = Object.entries(
    summaryReviews.reduce((acc, review) => {
      acc[review.courseTitle] = acc[review.courseTitle] || {
        total: 0,
        count: 0,
      };
      acc[review.courseTitle].total += review.rating;
      acc[review.courseTitle].count += 1;
      return acc;
    }, {})
  ).map(([courseTitle, { total, count }]) => ({
    courseTitle,
    averageRating: Number((total / count).toFixed(2)),
  }));

  // 2. Positive vs Negative Rating Ratio
  const positiveReviews = summaryReviews.filter((r) => r.rating >= 4).length;
  const negativeReviews = summaryReviews.filter((r) => r.rating < 4).length;
  const ratingRatioData = [
    { name: "Positive (≥4)", value: positiveReviews },
    { name: "Negative (<4)", value: negativeReviews },
  ];
  const COLORS = ["#4caf50", "#f44336"];

  // 3. Number of Reviews Over Time
  const reviewsByDate = summaryReviews.reduce((acc, review) => {
    acc[review.date] = (acc[review.date] || 0) + 1;
    return acc;
  }, {});
  const reviewsOverTime = Object.entries(reviewsByDate).map(
    ([date, count]) => ({
      date,
      count,
    })
  );

  // Tab change handler
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ p: 4, maxWidth: "1200px", mx: "auto" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ mb: 4, fontWeight: "bold", color: "#1976d2" }}
      >
        Course Feedbacks & Analysis
      </Typography>

      {/* Course Selection Dropdown */}
      <FormControl sx={{ mb: 3, minWidth: 200 }}>
        <InputLabel id="course-select-label">Select Course</InputLabel>
        <Select
          labelId="course-select-label"
          value={selectedCourse}
          label="Select Course"
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          {courseTitles.map((course) => (
            <MenuItem key={course} value={course}>
              {course}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Tabs for Reviews and Summary */}
      <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Reviews" />
        <Tab label="Review Summary" />
      </Tabs>

      {/* Tab Content */}
      {tabValue === 0 && (
        <>
          <TextField
            label="Search Reviews"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mb: 3, width: "100%", maxWidth: "400px" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <TableContainer component={Paper} elevation={3}>
            <Table sx={{ minWidth: 650 }} aria-label="reviews table">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#1976d2" }}>
                  <TableCell
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                    onClick={() => handleSort("studentName")}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      Student Name
                      {sortColumn === "studentName" &&
                        (sortDirection === "asc" ? (
                          <ArrowDropUp sx={{ color: "white", ml: 1 }} />
                        ) : (
                          <ArrowDropDown sx={{ color: "white", ml: 1 }} />
                        ))}
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                    onClick={() => handleSort("courseTitle")}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      Course Title
                      {sortColumn === "courseTitle" &&
                        (sortDirection === "asc" ? (
                          <ArrowDropUp sx={{ color: "white", ml: 1 }} />
                        ) : (
                          <ArrowDropDown sx={{ color: "white", ml: 1 }} />
                        ))}
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                    onClick={() => handleSort("rating")}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      Rating
                      {sortColumn === "rating" &&
                        (sortDirection === "asc" ? (
                          <ArrowDropUp sx={{ color: "white", ml: 1 }} />
                        ) : (
                          <ArrowDropDown sx={{ color: "white", ml: 1 }} />
                        ))}
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                    onClick={() => handleSort("comment")}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      Comment
                      {sortColumn === "comment" &&
                        (sortDirection === "asc" ? (
                          <ArrowDropUp sx={{ color: "white", ml: 1 }} />
                        ) : (
                          <ArrowDropDown sx={{ color: "white", ml: 1 }} />
                        ))}
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                    onClick={() => handleSort("date")}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      Date
                      {sortColumn === "date" &&
                        (sortDirection === "asc" ? (
                          <ArrowDropUp sx={{ color: "white", ml: 1 }} />
                        ) : (
                          <ArrowDropDown sx={{ color: "white", ml: 1 }} />
                        ))}
                    </Box>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedReviews.length > 0 ? (
                  sortedReviews.map((review) => (
                    <TableRow
                      key={review.id}
                      sx={{
                        "&:nth-of-type(odd)": { backgroundColor: "#f5f5f5" },
                        "&:hover": { backgroundColor: "#e0f7fa" },
                      }}
                    >
                      <TableCell>{review.studentName}</TableCell>
                      <TableCell>{review.courseTitle}</TableCell>
                      <TableCell>
                        <Rating
                          value={review.rating}
                          precision={0.5}
                          readOnly
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{review.comment}</TableCell>
                      <TableCell>{review.date}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} sx={{ textAlign: "center", py: 2 }}>
                      <Typography variant="body1" color="textSecondary">
                        No reviews found for this course.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {tabValue === 1 && (
        <Box sx={{ mt: 3 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ mb: 3, color: "#1976d2" }}
          >
            Review Summary{" "}
            {selectedCourse !== "All" ? `for ${selectedCourse}` : ""}
          </Typography>

          <Grid container spacing={3}>
            {/* Average Rating by Course */}
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ textAlign: "center" }}
                >
                  Average Rating by Course
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <BarChart
                    width={350}
                    height={250}
                    data={averageRatingByCourse}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="courseTitle" />
                    <YAxis domain={[0, 5]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="averageRating" fill="#1976d2" />
                  </BarChart>
                </Box>
              </Paper>
            </Grid>

            {/* Positive vs Negative Rating Ratio */}
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ textAlign: "center" }}
                >
                  Positive vs Negative Rating Ratio
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <PieChart width={350} height={250}>
                    <Pie
                      data={ratingRatioData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {ratingRatioData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </Box>
              </Paper>
            </Grid>

            {/* Number of Reviews Over Time */}
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ textAlign: "center" }}
                >
                  Number of Reviews Over Time
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <LineChart width={700} height={300} data={reviewsOverTime}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="count" stroke="#1976d2" />
                  </LineChart>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default InstructorReviews;
