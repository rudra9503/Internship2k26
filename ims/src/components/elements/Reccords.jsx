import React from 'react'
import {Table,
     TableContainer, 
     TableHead, 
     TableBody,
     TableRow, 
     TableCell, 
     Paper} from '@mui/material'





const Reccords = () => {

const tableData = [{
  "id": 1,
  "first_name": "Diannne",
  "last_name": "Wilkenson",
  "email": "dwilkenson0@businessinsider.com"
}, {
  "id": 2,
  "first_name": "Valma",
  "last_name": "Petegree",
  "email": "vpetegree1@upenn.edu"
}, {
  "id": 3,
  "first_name": "Salaidh",
  "last_name": "Ponder",
  "email": "sponder2@gmpg.org"
}, {
  "id": 4,
  "first_name": "Ring",
  "last_name": "Ferriere",
  "email": "rferriere3@msu.edu"
}, {
  "id": 5,
  "first_name": "Ainsley",
  "last_name": "Golagley",
  "email": "agolagley4@youtube.com"
}, {
  "id": 6,
  "first_name": "West",
  "last_name": "Janczak",
  "email": "wjanczak5@discuz.net"
}, {
  "id": 7,
  "first_name": "Marj",
  "last_name": "Kundert",
  "email": "mkundert6@census.gov"
}, {
  "id": 8,
  "first_name": "Thorpe",
  "last_name": "Riediger",
  "email": "triediger7@soundcloud.com"
}, {
  "id": 9,
  "first_name": "Felice",
  "last_name": "Hartly",
  "email": "fhartly8@netscape.com"
}, {
  "id": 10,
  "first_name": "Jonie",
  "last_name": "Faulkener",
  "email": "jfaulkener9@webnode.com"
}]
  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-lable= 'simple table'>

            <TableHead sx={{position:'relative', backgroundColor:'gray'}}>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Email</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    tableData.map(row =>(
                        <TableRow key={row.id} sx={{
                                '&:last-child td &: last-chold th':{border: 1}
                        }}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.first_name}</TableCell>
                            <TableCell>{row.last_name}</TableCell>
                            <TableCell>{row.email}</TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>

        </Table>

      </TableContainer>
    </div>
  )
}

export default Reccords
