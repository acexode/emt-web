// ----------------------------------------------------------------------

export default function Autocomplete() {
  return {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline  ": {
             borderColor: "hsl(0, 100%, 27%)",
           

             
          },
          "&.MuiAutocomplete-inputFocused":{
            color: "hsl(0, 100%, 27%)",
          }
        },
         
      }
    }
  };
}
