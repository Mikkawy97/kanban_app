import React from 'react';

import './Sidebar_styles.css';

import logo from '../../assets/images/Group 16.png';
import whitelogo from '../../assets/images/Group 16 (1).png';
import cbimgae from '../../assets/images/fluent_board-split-24-regular (2).png';
import { BsFillSunFill } from "react-icons/bs";
import { BsMoonStarsFill } from "react-icons/bs";
import Switch from '@mui/material/Switch';
import { alpha, styled } from '@mui/material/styles';
import { useEffect } from 'react';
import { Board, toggletheme } from './SidebarSlice';
import { useAppSelector } from '../../app/hooks';
import { useAppDispatch } from '../../app/hooks';
import { setBoards ,setSelectedBoard } from './SidebarSlice';
import boardIconActive from '../../assets/images/fluent_board-split-24-regular.png';
import boardIcon from '../../assets/images/fluent_board-split-24-regular (1).png';
import { BiHide } from "react-icons/bi";
import { toggleAddEditBoard_show ,addBoard_mode} from '../Modals/ModalSlice';

import { toggleSidebar } from './SidebarSlice';



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

function Sidebar() {
  const boards=useAppSelector(state=>state.sidebar.boards);
  const selectedBoard=useAppSelector(state=>state.sidebar.selectedBoard);
  const theme=useAppSelector(state=>state.sidebar.theme);
  const dispatch=useAppDispatch();



  function api<T>(url: string): Promise<T> {
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return response.json()
      })
  
  }
  useEffect(() => {
  
api<[Board]>('https://api.trello.com/1/members/me/boards?key=fc6c565b4ae5538cc27871b87f8ce28b&token=ATTAa190c19de930f11167c6f5a0d6a3594cee8db5d2a2f28a4a6c296fd715bbebdbA1D51C1A')
  .then((data) => {

    dispatch(setBoards(data))
   
  })
  .catch(error => {
 
  })

      
  
  }, []);

console.log(boards);
  return (
 
    <div className={theme==='light'?"sidebar_cont d-none color-white d-none d-xs-none d-sm-none d-md-block d-lg-block d-xl-block bg-white":"sidebar_cont d-none color-dark d-xs-none d-sm-none d-md-block d-lg-block d-xl-block bg-darksidebar"}>
        <div className='d-flex flex-column  '>
            
                <div className='logo_container'>
                  {theme==='light'?
                  <img src={logo} className='img-fluid' alt='logo' />
  : <img src={whitelogo} className='img-fluid' alt='logo' />}
                </div>
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

       <div className='show_sidebar'>
       <button className={'sidebar_on_toggle'} onClick={()=>{
        dispatch(toggleSidebar());
    }}>
             
      <>
      <BiHide size={16} color={"#828FA3"} className='mr-10' />
     
        <div className='text'>Hide Sidebar</div>
        </>
      
  
      </button>
           </div>
    </div>

  );
}

export default Sidebar;
