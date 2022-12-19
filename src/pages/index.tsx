import { Box, Grid, Paper } from "@mui/material";
import { Container } from "@mui/system";
import dynamic from "next/dynamic";
import { useState } from "react";

import Mirror from "../contents/Mirror";


const AudioSampler = dynamic(() => import("../contents/AudioSampler"),{ssr: false});


function App() {

  return (
    <Container component={Paper} sx={{
      height: "98vh",
      width: "98vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#e7e4df",
      overflow: "hidden",
    }}>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Mirror/>

          <Box height={100}/>
        </Grid>

        <Grid item xs={12}>
          
          <AudioSampler/>
        </Grid>
      </Grid>
      
    </Container>
  );
}

export default App;
