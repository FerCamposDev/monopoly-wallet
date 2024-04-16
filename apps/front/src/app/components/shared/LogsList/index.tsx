import { Card, Divider, Grid, List, Typography } from "@mui/material"
import { FC } from "react"
import { useGame } from "../../../context/game/useGame"

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
      <List sx={{ overflowY: 'scroll', maxHeight: '60vh' }}>
        {finalLogs.map((log, index) => (
          <Grid container gap={2} key={index}>
            <Typography variant="caption">
              {log.date.getHours()}:{log.date.getMinutes()}
            </Typography>
            <Typography variant="body2">
              {log.message}
            </Typography>
          </Grid>
        ))}
      </List>
    </Card>
  )
}

export default LogsList