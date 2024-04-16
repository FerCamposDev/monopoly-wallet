import { Card, Divider, Grid, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Typography } from "@mui/material"
import { FC } from "react"
import { useGame } from "../../../context/game/useGame"
import { VisibilityOutlined } from "@mui/icons-material"

type Props = {
  onlyUser?: boolean
}

const LogsList: FC<Props> = ({ onlyUser }) => {
  const { logs } = useGame();

  const finalLogs = onlyUser ? logs.filter(l => l.isRelatedToPlayer) : logs;

  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="subtitle1">
        Last transactions
      </Typography>
      <Divider />
      <List dense sx={{ overflowY: 'scroll', height: '50vh' }}>
        {finalLogs.map((log, index) => (
          <ListItem key={index} disablePadding>
            <Grid container gap={1} alignItems="center" >
              <Typography variant="body2" fontSize={10} mt={0.5}>
                {log.displayTime}
              </Typography>
              <ListItemText primary={log.message} />
              <ListItemSecondaryAction>
                <IconButton>
                  <VisibilityOutlined />
                </IconButton>
              </ListItemSecondaryAction>
            </Grid>
          </ListItem>
        ))}
      </List>
    </Card>
  )
}

export default LogsList