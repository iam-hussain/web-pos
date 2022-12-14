import * as React from "react";
import {
  Box,
  Container,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import AppBarComp from "@components/molecules/app-bar";
import { BrandCleanSvg } from "@components/atoms/svg";
import CategoryIcon from "@mui/icons-material/CategoryTwoTone";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import UpdateIcon from "@mui/icons-material/Update";

export default function BoxComponent() {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };
  return (
    <Container>
      <Grid
        container
        spacing={2}
        direction="row"
        alignItems="start"
        justifyContent="center"
        sx={{ minHeight: "100vh", paddingTop: 4 }}
      >
        <Grid item xs={6} md={4}>
          <Box>
            <List component="nav" aria-label="main mailbox folders">
              <ListItemButton
                selected={selectedIndex === 0}
                onClick={(event) => handleListItemClick(event, 0)}
              >
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Add New" />
              </ListItemButton>
            </List>
            <Divider />
            <List
              component="nav"
              aria-label="secondary mailbox folder"
              sx={{
                maxHeight: 500,
                overflow: "auto",
              }}
            >
              <ListItemButton
                selected={selectedIndex === 1}
                onClick={(event) => handleListItemClick(event, 2)}
              >
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Cakes" />
              </ListItemButton>
              <ListItemButton
                selected={selectedIndex === 2}
                onClick={(event) => handleListItemClick(event, 2)}
              >
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Sandwiches" />
              </ListItemButton>
              <ListItemButton
                selected={selectedIndex === 3}
                onClick={(event) => handleListItemClick(event, 2)}
              >
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Drinks" />
              </ListItemButton>
              <ListItemButton
                selected={selectedIndex === 4}
                onClick={(event) => handleListItemClick(event, 2)}
              >
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Tea & Juice" />
              </ListItemButton>
              {new Array(20).fill(6).map((a, b) => (
                <ListItemButton
                  key={b}
                  selected={selectedIndex === 5}
                  onClick={(event) => handleListItemClick(event, 2)}
                >
                  <ListItemIcon>
                    <CategoryIcon />
                  </ListItemIcon>
                  <ListItemText primary="Burger & Pizza" />
                </ListItemButton>
              ))}
            </List>
          </Box>
        </Grid>
        <Grid item xs={6} md={8}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="start"
            justifyContent="center"
            gap={0}
            paddingBottom={4}
            paddingTop={1}
          >
            <Typography variant="h5" paddingBottom={1}>
              Update Product
            </Typography>
            <Typography variant="body2" component="span" color={"GrayText"}>
              Place to update the product title, price and category
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={2}
          >
            <TextField
              fullWidth
              id="outlined-basic"
              label="Title"
              variant="outlined"
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Price"
              variant="outlined"
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Category"
              variant="outlined"
            />
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              flexWrap="wrap"
              gap={2}
            >
              <Button
                sx={{
                  padding: 1,
                  paddingInline: 4,
                  marginInline: 2,
                }}
                variant="contained"
                endIcon={<UpdateIcon />}
              >
                Update Product
              </Button>
              <Button
                sx={{
                  padding: 1,
                  paddingInline: 4,
                  marginInline: 2,
                }}
                variant="contained"
                endIcon={<DeleteIcon />}
              >
                Delete Product
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
