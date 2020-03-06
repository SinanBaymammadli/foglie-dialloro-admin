import React from "react";
import { TableCell, Box, IconButton } from "@material-ui/core";
import { Routing } from "../core/routing";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

interface IProps {
  route?: string;
  id: string;
  onDelete?: (id: string) => void;
}

export const ActionTableCell: React.FC<IProps> = ({ onDelete, route, id }: IProps) => {
  return (
    <TableCell
      align="right"
      padding="none"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
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
    </TableCell>
  );
};
