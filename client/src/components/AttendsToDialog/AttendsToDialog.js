import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function EmployeeDetailsDialog({ open, onClose, employeeDetails, selectedRow }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogContent>
        <DialogContentText>
          Details for Animal ID {selectedRow}
        </DialogContentText>
        <TableContainer component={Paper}>
          <Table aria-label="employee details table">
            <TableHead>
              <TableRow>
                <TableCell>Employee ID</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Responsibility</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employeeDetails.map((employee, index) => (
                <TableRow key={index}>
                  <TableCell>{employee.Employee_ID}</TableCell>
                  <TableCell>{employee.Fname}</TableCell>
                  <TableCell>{employee.Lname}</TableCell>
                  <TableCell>{employee.Email}</TableCell>
                  <TableCell>{employee.Role}</TableCell>
                  <TableCell>{employee.Responsibility}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default EmployeeDetailsDialog;
