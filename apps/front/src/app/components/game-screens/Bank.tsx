import { GavelOutlined, LocalAtmOutlined, SwapHorizOutlined } from "@mui/icons-material"
import { Grid, Stack, Typography } from "@mui/material"
import IconButtonText from "../shared/IconButtonText"
import LogsList from "../shared/LogsList"

const BankScreen = () => {
  return (
    <Grid container height="100%" p={2}>
      <Stack width="100%" gap={4}>
        <Grid container alignItems="center" justifyContent="center" gap={2}>
          <Typography variant="h4">
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

        <LogsList />
      </Stack >
    </Grid >
  )
}

export default BankScreen