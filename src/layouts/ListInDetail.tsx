import React from "react";
import {
  Stack,
  Typography,
  Box,
  IconButton,
  useTheme,
  Button,
} from "@mui/material";

interface ListItemData {
  id: string;
  [key: string]: any;
}

interface ListInDetailProps {
  title: string;
  items: ListItemData[];
  activeId?: string;
  onItemClick: (id: string) => void;
  renderItemContent: (item: ListItemData, isActive: boolean) => React.ReactNode;
  onCreateClick?: () => void;
}

const ListInDetail: React.FC<ListInDetailProps> = ({
  title,
  items,
  activeId,
  onItemClick,
  renderItemContent,
  onCreateClick,
}) => {
  const theme = useTheme();

  return (
    <Stack
      width="350px"
      sx={{
        borderRight: `1px solid ${theme.palette.divider}`,
        height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
        overflowY: "auto",
      }}
    >
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        px={theme.spacing(3)}
        py={theme.spacing(1)}
        sx={{ borderBottom: `1px solid ${theme.palette.divider}`, flexShrink: 0, minHeight: 57 }}
      >
        <Typography variant="h5">{title}</Typography>
        {onCreateClick && (
          <Button
            onClick={onCreateClick}
            color="primary"
            variant="contained"
            aria-label={`Create new ${title.toLowerCase()}`}
            disableElevation
          >
            Add
          </Button>
        )}
      </Stack>

      {/* Item List */}
      <Stack spacing={0} flex={1}>
        {items.length === 0 ? (
          <Box px={theme.spacing(3)} py={theme.spacing(2)}>
            <Typography variant="body2" color="text.secondary">
              No items available.
            </Typography>
          </Box>
        ) : (
          items.map((item) => {
            const isActive = item.id === activeId;
            return (
              <Box
                key={item.id}
                onClick={() => onItemClick(item.id)}
                sx={{
                  cursor: "pointer",
                  bgcolor: isActive
                    ? theme.palette.action.selected
                    : "transparent",
                  borderLeft: isActive
                    ? `4px solid ${theme.palette.primary.main}`
                    : "4px solid transparent",
                  transition: "background-color 0.2s",
                  "&:hover": {
                    bgcolor: isActive
                      ? theme.palette.action.selected
                      : theme.palette.action.hover,
                  },
                }}
                px={theme.spacing(2.5)}
                py={theme.spacing(2)}
              >
                {renderItemContent(item, isActive)}
              </Box>
            );
          })
        )}
      </Stack>
    </Stack>
  );
};

export default ListInDetail;