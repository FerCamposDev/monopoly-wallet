import { AccountBalanceOutlined, GavelOutlined, LocalAtmOutlined, SwapHorizOutlined } from "@mui/icons-material"
import { Card, Divider, Grid, List, Stack, Typography } from "@mui/material"
import IconButtonText from "../components/shared/IconButtonText"
import { FAKE_LOGS } from "../commons/mocks/logs"

type Props = {
  //
}

const BankScreen = (props: Props) => {
  return (
    <Grid container height="100%" p={2}>
      <Stack width="100%" gap={4}>
        <Grid container alignItems="center" justifyContent="flex-end" gap={2}>
          <AccountBalanceOutlined />
          <Typography variant="h6">
            Bank
          </Typography>
        </Grid>

        <Grid container justifyContent="space-evenly">
          <IconButtonText text="Collect">
            <LocalAtmOutlined />
          </IconButtonText>

          <IconButtonText text="New Payment">
            <SwapHorizOutlined />
          </IconButtonText>

          <IconButtonText text="Hypothecate">
            <GavelOutlined />
          </IconButtonText>
        </Grid>

        <Card sx={{ p: 2 }}>
          <Typography variant="subtitle1">
            Last transactions
          </Typography>
          <Divider />
          <List sx={{ overflowY: 'scroll', maxHeight: '60vh' }}>
            {FAKE_LOGS.map((log, index) => (
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
      </Stack >
    </Grid >
  )
}

export default BankScreen