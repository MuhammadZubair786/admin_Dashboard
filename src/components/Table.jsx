import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useAuth from '../hooks/useAuth';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Skeleton from 'react-loading-skeleton'

export default function EnhancedTable({headCells,rows,handlerCLick,loading,skeletonNo}) {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { theme } = useAuth();

  return (
   <Paper sx={{ width: '100%', mb: 2,
   boxShadow:`2px 15px 46px -4px rgba(0,0,0,0.23)`
   }}>
      <TableContainer >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {headCells.map((column) => (
                <TableCell
                sx={{backgroundColor:theme=='light'?'':'black',color:theme=='light'?'':'white',textTransform:'capitalize'}}
                  key={column.id}
                  className='font-[SF-Pro-Display-Regular]'
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
               
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {headCells.map((column) => {
                      const value = row[column.id];
                      
                      return (
                        <TableCell key={column.id} align={column.align}
                        className='font-[SF-Pro-Display-Regular]'
                      sx={{backgroundColor:theme=='light'?'':'#292929',color:theme=='light'?'':'white'}}
                        >
                          {column.type =='image'? <img src={value} className='rounded-md w-20 h-14' alt="" />:column.type =='action'?<div className="flex gap-2  items-center">
                          <span className='cursor-pointer bg-cardColor px-2 py-2 rounded-md' onClick={()=>handlerCLick('Edit',value)}>
                            <EditIcon  style={{ color: theme=='light'?"#9cb651":'white' }}/></span>
                          <span className='cursor-pointer bg-cardColor px-2 py-2 rounded-md' onClick={()=>handlerCLick('Delete',value)}>
                            <DeleteIcon  style={{ color: theme=='light'?"#9cb651":'white' }}/>
                          </span>
                        </div>: `${value}`}
                        </TableCell>
                      );
                    })}
                    
                  </TableRow>
                );
                
              })}
              {loading &&Array(5).fill().map((column,index) => {
return(
               <TableRow  hover role="checkbox" tabIndex={-1}>
              {Array(skeletonNo).fill().map((column,index) => {
                      return (
                        <TableCell 
                      sx={{backgroundColor:theme=='light'?'':'#292929',color:theme=='light'?'':'white'}}
                        >
                    {index ==0?<Skeleton width={20} height={20} count={1}/>:<Skeleton width={80} height={20} count={1}/>}
                        </TableCell>
                      );
                    })}
               </TableRow>
)

              })}

          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 25, 100]}
        component="div"
        sx={{'& .css-78c6dr-MuiToolbar-root-MuiTablePagination-toolbar':{backgroundColor:theme=='light'?'white':'black',color:theme=='light'?'black':'white'},'& .css-zylse7-MuiButtonBase-root-MuiIconButton-root.Mui-disabled':{
          color:'white'
        },'& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon':{
          color:'white'
        }}}
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

