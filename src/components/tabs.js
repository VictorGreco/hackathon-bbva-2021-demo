import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export default function ColorTabs() {
  const [value, setValue] = React.useState('two');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="one" label="Noticias" disabled />
        <Tab value="two" label="Estadisticas" />
        <Tab value="three" label="Previsiones" disabled />
      </Tabs>
    </Box>
  );
}