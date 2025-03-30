// src/components/admin/AdminManageUsers.jsx
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Select,
  MenuItem,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { ArrowDropUp, ArrowDropDown } from "@mui/icons-material";
const AdminManageUsers = () => {
  // Local state for users
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Student",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Instructor",
      status: "Active",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "Student",
      status: "Suspended",
    },
  ]);

  // State for status toggle confirmation dialog
  const [openStatusConfirm, setOpenStatusConfirm] = useState(false);
  const [selectedUserIdForStatus, setSelectedUserIdForStatus] = useState(null);

  // State for role change confirmation dialog
  const [openRoleConfirm, setOpenRoleConfirm] = useState(false);
  const [selectedUserIdForRole, setSelectedUserIdForRole] = useState(null);
  const [newRole, setNewRole] = useState("");

  // State for sorting
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  // Handle role change initiation
  const handleRoleChange = (userId, event) => {
    const role = event.target.value;
    setSelectedUserIdForRole(userId);
    setNewRole(role);
    setOpenRoleConfirm(true);
  };

  // Confirm role change
  const confirmRoleChange = () => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === selectedUserIdForRole ? { ...user, role: newRole } : user
      )
    );
    setOpenRoleConfirm(false);
    setSelectedUserIdForRole(null);
    setNewRole("");
    // TODO: Add API call to update role on backend
  };

  // Cancel role change
  const cancelRoleChange = () => {
    setOpenRoleConfirm(false);
    setSelectedUserIdForRole(null);
    setNewRole("");
  };

  // Handle suspend/activate toggle initiation
  const handleSuspendToggle = (userId) => {
    setSelectedUserIdForStatus(userId);
    setOpenStatusConfirm(true);
  };

  // Confirm status toggle
  const confirmStatusToggle = () => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === selectedUserIdForStatus
          ? {
              ...user,
              status: user.status === "Active" ? "Suspended" : "Active",
            }
          : user
      )
    );
    setOpenStatusConfirm(false);
    setSelectedUserIdForStatus(null);
    // TODO: Add API call to update status on backend
  };

  // Cancel status toggle
  const cancelStatusToggle = () => {
    setOpenStatusConfirm(false);
    setSelectedUserIdForStatus(null);
  };
  // Handle sorting
  const handleSort = (column) => {
    if (sortColumn === column) {
      // Toggle direction if same column is clicked
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Set new column and default to ascending
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  // Sort users based on current column and direction
  const sortedUsers = [...users].sort((a, b) => {
    if (!sortColumn) return 0; // No sorting if no column selected

    const valueA = a[sortColumn].toLowerCase
      ? a[sortColumn].toLowerCase()
      : a[sortColumn];
    const valueB = b[sortColumn].toLowerCase
      ? b[sortColumn].toLowerCase()
      : b[sortColumn];

    if (sortDirection === "asc") {
      return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
    } else {
      return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
    }
  });
  return (
    <Box sx={{ p: 4, maxWidth: "1200px", mx: "auto" }}>
      <TableContainer
        sx={{
          mt: 5,
          borderRadius: 3,
          boxShadow: "none",
          border: "1px solid #ccc",
        }}
        component={Paper}
        elevation={3}
      >
        <Table sx={{ minWidth: 650 }} aria-label="user management table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "white" }}>
              <TableCell
                sx={{ color: "black", fontWeight: "bold", cursor: "pointer" }}
                onClick={() => handleSort("name")}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  Name
                  {sortColumn === "name" &&
                    (sortDirection === "asc" ? (
                      <ArrowDropUp sx={{ color: "black", ml: 1 }} />
                    ) : (
                      <ArrowDropDown sx={{ color: "black", ml: 1 }} />
                    ))}
                </Box>
              </TableCell>
              <TableCell
                sx={{ color: "black", fontWeight: "bold", cursor: "pointer" }}
                onClick={() => handleSort("email")}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  Email
                  {sortColumn === "email" &&
                    (sortDirection === "asc" ? (
                      <ArrowDropUp sx={{ color: "black", ml: 1 }} />
                    ) : (
                      <ArrowDropDown sx={{ color: "black", ml: 1 }} />
                    ))}
                </Box>
              </TableCell>
              <TableCell
                sx={{ color: "black", fontWeight: "bold", cursor: "pointer" }}
                onClick={() => handleSort("role")}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  Role
                  {sortColumn === "role" &&
                    (sortDirection === "asc" ? (
                      <ArrowDropUp sx={{ color: "black", ml: 1 }} />
                    ) : (
                      <ArrowDropDown sx={{ color: "black", ml: 1 }} />
                    ))}
                </Box>
              </TableCell>
              <TableCell
                sx={{ color: "black", fontWeight: "bold", cursor: "pointer" }}
                onClick={() => handleSort("status")}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  Status
                  {sortColumn === "status" &&
                    (sortDirection === "asc" ? (
                      <ArrowDropUp sx={{ color: "black", ml: 1 }} />
                    ) : (
                      <ArrowDropDown sx={{ color: "black", ml: 1 }} />
                    ))}
                </Box>
              </TableCell>
              <TableCell sx={{ color: "black", fontWeight: "bold" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedUsers.map((user) => (
              <TableRow
                key={user.id}
                sx={{
                  "&:hover": { backgroundColor: "#e0f7fa" },
                  transition: "all 0.3s",
                }}
              >
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e)}
                    size="small"
                    sx={{ minWidth: 120 }}
                  >
                    <MenuItem value="Student">Student</MenuItem>
                    <MenuItem value="Instructor">Instructor</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color={user.status === "Active" ? "error" : "success"}
                    size="small"
                    onClick={() => handleSuspendToggle(user.id)}
                    sx={{ textTransform: "none", fontWeight: "medium" }}
                  >
                    {user.status === "Active" ? "Suspend" : "Activate"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Confirmation Dialog */}
      <Dialog open={openStatusConfirm} onClose={cancelStatusToggle}>
        <DialogTitle>Are you sure ?</DialogTitle>
        <DialogContent>
          Are you sure you want to{" "}
          {users.find((u) => u.id === selectedUserIdForStatus)?.status ===
          "Active"
            ? "suspend"
            : "activate"}{" "}
          this user?
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelStatusToggle} color="primary">
            Cancel
          </Button>
          <Button
            onClick={confirmStatusToggle}
            color="primary"
            variant="contained"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      {/* Role Change Confirmation Dialog */}
      <Dialog open={openRoleConfirm} onClose={cancelRoleChange}>
        <DialogTitle>
          Are you sure you want to change this user's role to "{newRole}"?
        </DialogTitle>
        <DialogContent>
          Are you sure you want to change this user's role to "{newRole}"?
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelRoleChange} color="primary">
            Cancel
          </Button>
          <Button
            onClick={confirmRoleChange}
            color="primary"
            variant="contained"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminManageUsers;
