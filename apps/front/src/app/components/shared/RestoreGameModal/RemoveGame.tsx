import { Alert, Button, Checkbox, FormControlLabel, Grid, Stack } from '@mui/material'
import { FC, useState } from 'react'

type Props = {
  onRemove: () => void;
}

const RemoveGame: FC<Props> = ({ onRemove }) => {
  const [enableRemove, setEnableRemove] = useState(false);

  return (
    <Stack>
      <Alert severity="warning">
        Or if you want you can remove the backup and this modal will not appear again.
      </Alert>
      <Grid container justifyContent="center">
        <FormControlLabel
          control={
            <Checkbox
              checked={enableRemove}
              onChange={(_e, checked) => setEnableRemove(checked)}
            />
          }
          label="Enable remove"
        />
        <Button color="error" disabled={!enableRemove} onClick={onRemove}>
          Remove Backup
        </Button>
      </Grid>
    </Stack>
  )
}

export default RemoveGame