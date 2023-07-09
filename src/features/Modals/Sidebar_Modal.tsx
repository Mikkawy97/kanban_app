import React from 'react';
import { Modal } from 'react-bootstrap';
import { useAppSelector } from '../../app/hooks';
import { Card, deleteTask } from '../BoardLists/BoardListSlice';
import { useAppDispatch } from '../../app/hooks';
import { toggleAddEditTask_show } from './ModalSlice';
import './Modal.css';
import { toggleSmallModal_show} from './ModalSlice';
import { deleteBoard } from '../Sidebar/SidebarSlice';
import boardIconActive from '../../assets/images/fluent_board-split-24-regular.png';
import boardIcon from '../../assets/images/fluent_board-split-24-regular (1).png';
import { BiHide } from "react-icons/bi";
import { toggleAddEditBoard_show ,addBoard_mode} from '../Modals/ModalSlice';
import cbimgae from '../../assets/images/fluent_board-split-24-regular (2).png';
import { setBoards ,setSelectedBoard } from '../Sidebar/SidebarSlice'
import { BsFillSunFill } from "react-icons/bs";
import { BsMoonStarsFill } from "react-icons/bs";
import Switch from '@mui/material/Switch';
import { alpha, styled } from '@mui/material/styles';
import { toggletheme } from '../Sidebar/SidebarSlice';


const LightSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: '#635FC7',
      '&:hover': {
        backgroundColor: alpha('#635FC7', theme.palette.action.hoverOpacity),
      },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: '#635FC7',
    },
  }));
  const label = { inputProps: { 'aria-label': 'Color switch demo' } };
function Siderbar_Modal () {
  const show:any =useAppSelector(state=>state.modal.sidebarSmallModal_show);
  const boards=useAppSelector(state=>state.sidebar.boards);
  const selectedBoard=useAppSelector(state=>state.sidebar.selectedBoard);
const theme =useAppSelector(state=>state.sidebar.theme);


  const dispatch=useAppDispatch();
  const handleClose = () => dispatch(toggleSmallModal_show());
  function api<T>(url: string,obj:object): Promise<T> {
    return fetch(url,obj)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return response.json()
      })
  
  }

  return (
    <>
  
  
   
  <Modal show={show} C centered onHide={handleClose} className={theme==='light'?'light ':'dark'}>
    
        <Modal.Body className='p-0'>
            <div className='modal_small'>
            <div className='container'>
            <div className='row m-0 align-items-center modal_small '>
              <div className='col-md-12 p-0'>
              <div className='title'>ALL BOARDS ({boards.length})</div>
                  <div className='boards_cont '>
                    
                        {boards.map((item)=>{
                          return (
                            <button className={item.id===selectedBoard?.id?'board_item active':'board_item '} key={item.id}
                            onClick={()=>{
                                dispatch(setSelectedBoard(item));
                            }}
                            
                            
                            >
                                {item.id===selectedBoard?.id && 
                              <img src={boardIconActive} className='img-fluid mr-10 ' alt='board'/>
                                }
                                {item.id!==selectedBoard?.id && 
                              <img src={boardIcon} className='img-fluid mr-10 ' alt='board'/>
                                }
                              <div className='board_title'>{item.name}</div>
                              
                              </button>
                          )
                        })}
                        <div className='board_item'>
                        <img src={cbimgae} className='img-fluid mr-10 ' alt='board'/>
                        <button className='create_newBoard'
                          onClick={()=>{
                            dispatch(toggleAddEditBoard_show());
                            dispatch(addBoard_mode());
                          }}
                        
                        >+Create New Board</button>


                        </div>
                    
                  </div>
                  <div className=' switch_cont' >
                        <div className={theme==='light'?'theme_switch_cont bg-lightbody':'theme_switch_cont bg-darkbody'}>

                          <BsFillSunFill color='#828FA3' className='mr-10' size={17} />
                          <LightSwitch {...label} 
                          
                          onClick={()=>{
                                dispatch(toggletheme());
                          }}
                          />
                          
                          <BsMoonStarsFill color='#828FA3'  className="ml-10" size={15} />
                        </div>
                    
                    </div> 
          </div>
          </div>
          </div>
          </div>

        </Modal.Body>
  
      </Modal>
   
    </>
  );
}

export default Siderbar_Modal;