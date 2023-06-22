import React from 'react'
import CircleIcon from '@mui/icons-material/Circle';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Tooltip } from '@mui/material';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';

const ListItem = ({stage,priority,due,task,handleStageBackward,handleStageForward,handleEdit,handleDelete,dragStart,handledrag}) => {
  return (
    <div className='flex flex-row justify-between border-b p-4' draggable  onDragStart={e=>{dragStart(e,task,stage);handledrag()}} >
        <div className='flex flex-row items-center'>
            <CircleIcon sx={{color:priority==="high"?'#f7322f':priority==="medium"?"#ffb03b":priority==="low"&&'#a6fff8'}} />
            <div className='flex flex-col flex-1'>
                <p className='text-xl font-Lexend font-medium ml-3 mr-5 text-start'>{task}</p>
                <p className='text-sm font-Lexend font-light ml-3 text-start'>Due: {due}</p>
            </div>
        </div>
        <div className='flex flex-row'>
            {stage!==0&&<Tooltip title='Stage Backward'><ArrowBackIosIcon onClick={()=>handleStageBackward(task,stage)} sx={{color:'#f56153'}}/></Tooltip>}
            {stage!==3 && <Tooltip title='Stage Forward'><ArrowForwardIosIcon onClick={()=>handleStageForward(task,stage)} sx={{color:'#33f23c',marginRight:2}}/></Tooltip>} 
            <Tooltip title='Edit'><EditIcon onClick={()=>handleEdit(task,stage)} sx={{color:'#6b97bf',marginRight:2}}/></Tooltip>
            <Tooltip title='Delete'><DeleteIcon onClick={()=>handleDelete(task,stage)} sx={{color:'#d90d1b'}}/></Tooltip>
        </div>
    </div>
  )
}

export default ListItem