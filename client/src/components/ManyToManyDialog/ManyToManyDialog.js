import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import DisplayTable from '../displayTable';
import { getID } from '../../utils';

function ManyToManyDialog({ onClose, originTableName, originRowID, originRowName, destinationTableName }) {
  const originID=getID(originTableName);
  const route=`/${destinationTableName.toLowerCase()}?${originID}=${originRowID}`;
  return (
    <Dialog open onClose={onClose} maxWidth="md" fullWidth>
      <DialogContent>
        <DialogContentText>
          Details for {originTableName} with ID:{originRowID}
        </DialogContentText>
        <DisplayTable route={route} hasDataEntry defaultValues={{[originID]:originRowName}}/>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ManyToManyDialog;
