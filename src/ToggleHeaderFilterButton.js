import { Button, Box } from "@chakra-ui/react";

const ToggleHeaderFilterButton = ({ winboxRef }) => {
  const handleToggleHeaderFilter = () => {
    const tabulator = winboxRef.current.tabulator;
    const headerFilterEnabled = tabulator.getHeaderFilters();
    if (headerFilterEnabled) {
      tabulator.clearHeaderFilter();
    } else {
      tabulator.setHeaderFilterFocus();
    }
  };

  return (
    <Box mb={4}>
      <Button onClick={handleToggleHeaderFilter}>
        {winboxRef.current.tabulator.getHeaderFilters()
          ? "Header Filtering: ON"
          : "Header Filtering: OFF"}
      </Button>
    </Box>
  );
};
export default ToggleHeaderFilterButton;
