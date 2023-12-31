import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { ShoppingCart } from "@mui/icons-material";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 2,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export const CartItem = ({ cartItem, mode }: any) => {
  return (
    <IconButton aria-label="cart">
      <StyledBadge badgeContent={cartItem} color="primary">
        <ShoppingCart style={{ color: mode === "light" ? "black" : "white" }} />
      </StyledBadge>
    </IconButton>
  );
};
