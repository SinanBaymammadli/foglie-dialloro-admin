import React from "react";
import Button from "@material-ui/core/Button";
import { CircularProgress } from "@material-ui/core";

interface IProps {
  label: string;
  loading: boolean;
}

export const FormButton: React.FC<IProps> = ({ label, loading }: IProps) => {
  return (
    <Button variant="contained" color="primary" fullWidth size="large" type="submit" disabled={loading}>
      {loading ? <CircularProgress size={26} /> : label}
    </Button>
  );
};
