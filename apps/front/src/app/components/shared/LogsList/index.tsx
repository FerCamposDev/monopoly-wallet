import { Card, Divider, Grid, List, ListItem, ListItemText, Stack, Typography } from "@mui/material"
import { FC } from "react"
import { useGame } from "../../../context/game/useGame"
import { TrendingFlatOutlined } from "@mui/icons-material"

type Props = {
  isUserLog?: boolean
}

const LogsList: FC<Props> = ({ isUserLog }) => {
  const { logs } = useGame();

  const finalLogs = isUserLog ? logs.filter(l => l.isRelatedToPlayer) : logs;

  const renderArrows = (isIn: boolean) => {
    if (isIn) {
      return <TrendingFlatOutlined color="success" sx={{ transform: 'scaleX(-1)' }} />;
    }
    return <TrendingFlatOutlined color="error" />;
  }

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
              <Stack>
                {log.isRelatedToPlayer && isUserLog && renderArrows(log.isIn)}
                <Typography variant="body2" fontSize={10}>
                  {log.displayTime}
                </Typography>
              </Stack>

              <ListItemText primary={log.message} secondary={log.reason} />
              <ListItemText sx={{ textAlign: 'right' }} primary="Amount" secondary={`$ ${log.amount.toLocaleString()}`} />
            </Grid>
          </ListItem>
        ))}
      </List>
    </Card>
  )
}

export default LogsList