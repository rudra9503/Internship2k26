import React from 'react'
import { Box, Button } from '@mui/material'


const Tab = () => {
  return (
    <Box>
      {/* Your page content goes here */}
       <Box 
        position='fixed'
       sx=
       {{justifyContent: 'center',gap: 2, height: '8%',
          display: 'flex', flexDirection: 'row', spacebetween: 'true',
         backgroundColor: 'rgb(41,128,185)', borderRadius: 30, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
         marginBlockStart: 0, marginBlockEnd: 0, marginInlineStart: 0, marginInlineEnd: 0, padding: '8px 16px' 
         
         }}>

          <Box>
            <Button
               sx={{
                  // backgroundColor: 'white',
                  color: 'white',
                  fontWeight: 400,
                  p:1,
                  borderRadius: 30,
                    '&:hover': {
                        backgroundColor: 'rgba(84, 84, 84, 0.9)',
                        borderRadius: 30,
            
                    },
                }}
                >Dashboard
            </Button>
          </Box>

           <Box>
            <Button
               sx={{
                  // backgroundColor: 'white',
                  color: 'white',
                  fontWeight: 400,
                  p:1,
                  borderRadius: 30,
                    '&:hover': {
                        backgroundColor: 'rgba(84, 84, 84, 0.9)',
                        borderRadius: 30,
            
                    },
                }}
                >Shipment Report
            </Button>
          </Box>

           <Box>
            <Button
               sx={{
                  // backgroundColor: 'white',
                  color: 'white',
                  fontWeight: 400,
                  p:1,
                  borderRadius: 30,
                    '&:hover': {
                        backgroundColor: 'rgba(84, 84, 84, 0.9)',
                        borderRadius: 30,
            
                    },
                }}
                >Order Management
            </Button>
          </Box>

           <Box>
            <Button
               sx={{
                  // backgroundColor: 'white',
                  color: 'white',
                  fontWeight: 400,
                  p:1,
                  borderRadius: 30,
                    '&:hover': {
                        backgroundColor: 'rgba(84, 84, 84, 0.9)',
                        borderRadius: 30,
            
                    },
                }}
                >Transport Report
            </Button>
          </Box>

           <Box>
            <Button
               sx={{
                  // backgroundColor: 'white',
                  color: 'white',
                  fontWeight: 400,
                  p:1,
                  borderRadius: 30,
                    '&:hover': {
                        backgroundColor: 'rgba(84, 84, 84, 0.9)',
                        borderRadius: 30,
            
                    },
                }}
                >Add Product
            </Button>
          </Box>

           <Box>
            <Button
               sx={{
                  // backgroundColor: 'white',
                  color: 'white',
                  fontWeight: 400,
                  p:1,
                  borderRadius: 30,
                    '&:hover': {
                        backgroundColor: 'rgba(84, 84, 84, 0.9)',
                        borderRadius: 30,
            
                    },
                }}
                >Settings
            </Button>
          </Box>

        </Box>
        

  
  
     
    

    </Box>


  )
}

export default Tab




// {/* <Box>
//       {/* Your page content goes here */}
//        <Box 
//         position='fixed'
//        sx=
//        {{justifyContent: 'center',gap: 2, height: '8%',
//           display: 'flex', flexDirection: 'row', spacebetween: 'true',
//          backgroundColor: 'rgb(41,128,185)', borderRadius: 30, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
//          marginBlockStart: 0, marginBlockEnd: 0, marginInlineStart: 0, marginInlineEnd: 0, padding: '8px 16px' 
         
//          }}>

        

  
  
//       <Button
//         sx={{
//           // backgroundColor: 'white',
//           color: 'white',
//           fontWeight: 400,
//           p:1,
//           borderRadius: 30,
//           '&:hover': {
//             backgroundColor: 'rgba(84, 84, 84, 0.9)',
//             borderRadius: 30,
           
//           },
//         }}
//       >
//         Dashboard
//       </Button>

//        <Button
//         sx={{
//           // backgroundColor: 'white',
//           color: 'white',
//           fontWeight: 400,
//           '&:hover': {
//             backgroundColor: 'rgba(255, 255, 255, 0.9)',
//           },
//         }}
//       >
//         Dashboard
//       </Button>

//        <Button
//         sx={{
//           // backgroundColor: 'white',
//           color: 'white',
//           fontWeight: 400,
//           '&:hover': {
//             backgroundColor: 'rgba(255, 255, 255, 0.9)',
//           },
//         }}
//       >
//         Dashboard
//       </Button>


//        <Button
//         sx={{
//           // backgroundColor: 'white',
//           color: 'white',
//           fontWeight: 400,
//           '&:hover': {
//             backgroundColor: 'rgba(255, 255, 255, 0.9)',
//           },
//         }}
//       >
//         Dashboard
//       </Button>


//        <Button
//         sx={{
//           // backgroundColor: 'white',
//           color: 'white',
//           fontWeight: 400,
//           '&:hover': {
//             backgroundColor: 'rgba(255, 255, 255, 0.9)',
//           },
//         }}
//       >
//         Dashboard
//       </Button>
      

//        </Box>

//     </Box> */}
