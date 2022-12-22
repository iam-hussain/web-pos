import { Tooltip } from "@mui/material";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import React from "react";
import { useMutation } from "@apollo/client";
import { ENABLE_POS } from "@graphql/query";
import { LoadingButton } from "@mui/lab";
import useToken from "@hooks/useToken";

function EnablePOSButton({ shopId }: any) {
  const { setToken, deleteToken } = useToken();
  const [loading, setLoading] = React.useState(false);

  const [mutateFunction] = useMutation(ENABLE_POS, {
    variables: {
      shopId,
    },
  });

  const handleButtonOnClick = () => {
    setLoading(true);
    mutateFunction()
      .then((result) => {
        if (result?.data?.enablePOS) {
          setToken(result?.data?.enablePOS, { isPOS: true });
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  return (
    <Tooltip title="Authorize POS will logout the current user and redirects to the POS dashboard">
      <LoadingButton
        onClick={handleButtonOnClick}
        sx={{
          padding: 1,
          paddingInline: 4,
          marginInline: 2,
        }}
        loadingPosition="end"
        variant="contained"
        endIcon={<PointOfSaleIcon />}
        color={"primary"}
        type="submit"
        loading={loading}
      >
        Authorize POS
      </LoadingButton>
    </Tooltip>
  );
}

export default EnablePOSButton;
