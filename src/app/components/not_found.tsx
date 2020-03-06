import { Route } from "react-router-dom";
import React from "react";
import { Box, Typography } from "@material-ui/core";
import { Center } from "./center";

export const NotFound: React.FC = () => {
  return (
    <Route path="*">
      <Box p={3}>
        <Center>
          <Typography>Not found</Typography>
        </Center>
      </Box>
    </Route>
  );
};
