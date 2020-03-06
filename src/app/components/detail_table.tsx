import React, { ReactNode } from "react";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { Routing } from "../core/routing";
import { Link } from "react-router-dom";
import { ErrorPanel } from "./error_panel";
import { isError, isPending } from "../core/redux";
import { Center } from "./center";
import { IAsyncData } from "../core/models";
import { Loading } from "./loading";
import { Grid } from "@material-ui/core";

interface IProps {
  branch: IAsyncData<any>;
  route?: string;
  onDelete?: (id: string) => void;
  deleteBranch?: IAsyncData<void>;
  children?: ReactNode;
}

export function DetailTable({ branch, route, onDelete, deleteBranch, children }: IProps) {
  const id = branch.data?.id;

  return (
    <Box mt={3}>
      <Grid container justify="flex-end" alignItems="center">
        {route && (
          <Box mr={1} component="span">
            <IconButton to={Routing.generateEditRoute(route, id)} component={Link}>
              <EditIcon />
            </IconButton>
          </Box>
        )}

        {onDelete && (
          <IconButton onClick={() => onDelete(id)}>
            <DeleteIcon />
          </IconButton>
        )}
      </Grid>

      {deleteBranch && isError(deleteBranch) && (
        <Center>
          <Box py={2}>
            <ErrorPanel branch={deleteBranch} />
          </Box>
        </Center>
      )}

      {isError(branch) && (
        <Center>
          <Box py={2}>
            <ErrorPanel branch={branch} />
          </Box>
        </Center>
      )}

      <Loading loading={isPending(branch) || Boolean(deleteBranch && isPending(deleteBranch))}>
        <Paper>{children}</Paper>
      </Loading>
    </Box>
  );
}
