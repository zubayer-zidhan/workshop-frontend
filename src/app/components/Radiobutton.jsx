import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function RadioButton() {
    const [alignment, setAlignment] = React.useState('city');
    const [isComponentEnabled, setIsComponentEnabled] = React.useState(false);

    const handleAlignment = (event, newAlignment) => {
        if (newAlignment !== null) {
          setAlignment(newAlignment);
          setIsComponentEnabled(newAlignment);
        }
      };
      
      console.log(alignment);
      console.log(isComponentEnabled);
    
    

    return (
        <div className='mt-3 '>

            <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive = {true}
                onChange={handleAlignment}
                aria-label="Platform"
            >
                <ToggleButton value="city">City</ToggleButton>
                <ToggleButton value="workshop">Workshop</ToggleButton>
            </ToggleButtonGroup>
        </div>
    );
}