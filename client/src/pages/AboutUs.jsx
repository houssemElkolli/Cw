import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";



const AboutUs = () => {
  return (
    <Box
      className="aboutUS"
      sx={{
      }}
    >
      <Typography
        variant="h3"
        component="h3"
        sx={{
          textAlign: 'center',
          margin: '40px',
          fontFamily: "Cursive,Sans-serif",
          userSelect : "none",


        }}>
        Us
        <Typography
         variant="h3"
         component="h3"
          sx={{
            fontFamily: "Cursive,Sans-serif",
            position : "relative",
            top : "-10px"

          }}
      >About</Typography>
      <Box>
        <Box
        sx={{
          
        }}
        >

        </Box>

      </Box>

      </Typography>
    </Box>
  )
}

export default AboutUs

