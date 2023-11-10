import Box from "@mui/joy/Box";
import Radio, { radioClasses } from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import Sheet from "@mui/joy/Sheet";
import Done from "@mui/icons-material/Done";
import FormLabel from "@mui/joy/FormLabel";
import { useState } from "react";

const SelectColor = () => {
    const colorMappings:any = {
        primary: 'blue',
        neutral: 'gray',
        danger: 'red',
        success: 'green',
        warning: 'orange',
        light: 'white',
      };

      const colors = Object.keys(colorMappings);
  const [selectedColor, setSelectedColor] = useState("warning");
  const handleColorChange = (color: any) => {
    setSelectedColor(color);
  };
  const colorValue = colorMappings[selectedColor];

  return (
    <Box sx={{ resize: "horizontal", overflow: "auto", px: 2 }}>
      <FormLabel
        id="product-color-attribute"
        sx={{
          mb: 1.5,
          fontWeight: "xl",
          textTransform: "uppercase",
          fontSize: "xs",
          letterSpacing: "0.1em",
        }}
      >
        Color
      </FormLabel>
      <RadioGroup
        aria-labelledby="product-color-attribute"
        value={selectedColor}
        sx={{ gap: 2, flexWrap: "wrap", flexDirection: "row" }}
        onChange={(event) => handleColorChange(event.target.value)} 
      >
         {colors.map((color:any) => (
          <Sheet
            key={color}
            sx={{
              position: "relative",
              width: 40,
              height: 40,
              flexShrink: 0,
              bgcolor: color === "light" ? "#fff" : `${color}.solidBg`,
              borderRadius: color === "light" ? "50%" : "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",

            }}
          >
            <Radio
              variant={color === "light" ? "solid" : "solid"}
              color={color === "light" ? "default" : color}
              checkedIcon={<Done />}
              value={color}
              slotProps={{
                input: { "aria-label": color },
                radio: {
                  sx: {
                    display: "contents",
                    "--variant-borderWidth": "2px",
                  },
                },
              }}
              sx={{
                '--joy-focus-outlineOffset': '4px',
                '--joy-palette-focusVisible': (theme:any) =>
                  theme.vars.palette[color] && theme.vars.palette[color][500], // Check if the property exists
                [`& .${radioClasses.action}.${radioClasses.focusVisible}`]: {
                  outlineWidth: '2px',
                },
              }}
              />
             
          </Sheet>
        ))}
      </RadioGroup>
    </Box>
  );
};

export default SelectColor;
