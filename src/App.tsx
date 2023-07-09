import React from 'react';
import logo from './assets/images/Group 16.png';
import whitelogo from './assets/images/Group 16 (2).png';
import logosmall from './assets/images/Group 15.png';
import './App.css';
import Sidebar from './features/Sidebar/Sidebar';
import { useAppSelector } from './app/hooks';
import { BiShow } from "react-icons/bi";
import { useAppDispatch } from './app/hooks';
import { toggleSidebar } from './features/Sidebar/SidebarSlice';
import { FaEllipsisV } from "react-icons/fa";
import BoardList from './features/BoardLists/BoardList';
import { toggleAddEditTask_show,addtask_mode,editBoard_mode,toggleAddEditBoard_show, toggleDelete, SetBoard } from './features/Modals/ModalSlice';
import Dropdown from 'react-bootstrap/Dropdown';
import { Board } from './features/Sidebar/SidebarSlice';
import { Card } from './features/BoardLists/BoardListSlice';
import { BiChevronDown } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { toggleSmallModal_show} from './features/Modals/ModalSlice';

function App() {
  const selectedBoard:Board|null=useAppSelector(state=>state.modal.selectBoard);
  const selectedCard:Card=useAppSelector(state=>state.modal.selectedCard);
  const isOpen:Boolean=useAppSelector(state=>state.sidebar.isOpen);
  const lists=useAppSelector(state=>state.boardList.lists);
  const theme=useAppSelector(state=>state.sidebar.theme);
  const dispatch=useAppDispatch();
  return (
    <div className={theme==='light'?'genral_container bg-lightbody':"genral_container bg-darkbody"} >
    <div className="row m-0 ">
  
  
    {isOpen?
         <div className='col-md-2 p-0' >
       <Sidebar />
       </div> 
    :
    <div className='' >
    <button className={'sidebar_off_toggle'} onClick={()=>{
      dispatch(toggleSidebar());
  }}>
       
      
         <BiShow size={20} color={"white"} className='mr-10' />
     
    </button>
    </div> 
         
    }


     
   
 
    

     <div className={isOpen?'app_wrapper  col-md-10 p-0':'app_wrapper col-md-12 p-0'}>
    
      <div className={theme==='light'?'header bg-white color-white':'header bg-darksidebar color-dark'}>
            <div className='container-fluid'>
              <div className='row align-items-center align-md-items-center  m-0'>
                <div className='col-8 col-md-8 col-sm-6 col-xs-6 col-lg-8 col-xl-6 d-flex align-items-start'>
                  {!isOpen && 
                    <div className='logo_container  '>
                    {theme==='light'?
                    <img src={logo} className='img-fluid' alt='logo' />:<img src={whitelogo} className='img-fluid' alt='logo' />
                    
                    
                    }
                  </div>
                  
                  }
                  <img className='d-block  d-xs-block d-sm-block d-md-none d-lg-none d-xl-none mr-10' src={logosmall} />
                 
                  <div className={theme==='light'?'title text-black':'title text-white'}>Platform Launch</div>
                  <BiChevronDown className='d-block  d-xs-block d-sm-block d-md-none d-lg-none d-xl-none' color='#635FC7' size={30} 
                  onClick={()=>{
                    dispatch(toggleSmallModal_show());
              
                  }}
                  />
                </div>
                <div className='col-4 col-md-4 col-sm-6 col-xs-6 col-lg-4 col-xl-6  d-flex justify-content-end align-items-center align-sm-items-center'>
                  <button className='add_task_btn d-none  d-xs-none d-sm-none d-md-block d-lg-block d-xl-block'
                  onClick={()=>{
                    dispatch(addtask_mode());
                    dispatch(toggleAddEditTask_show(selectedCard));
                  }}
                  disabled={lists.length ===0? true:false}
                  >+ Add New Task</button>
                   <button className='add_task_btn d-block  d-xs-block d-sm-block d-md-none d-lg-none d-xl-none'
                  onClick={()=>{
                    dispatch(addtask_mode());
                    dispatch(toggleAddEditTask_show(selectedCard));
                    
                  }}
                  disabled={lists.length ===0? true:false}
                  ><AiOutlinePlus color='white' size={20} /></button>


                    <Dropdown className=''>

              <Dropdown.Toggle className='dropdown_btn'>
              <FaEllipsisV size={20} color='#828FA3' className=' mt-0 ' >  </FaEllipsisV>
              </Dropdown.Toggle>
           
              <Dropdown.Menu>
               <Dropdown.Item  className='menuitem text-black'
               onClick={()=>{
                dispatch(toggleAddEditBoard_show());
                    dispatch(editBoard_mode());

               }}
               
               >Edit Board</Dropdown.Item>
                <Dropdown.Item  className='menuitem text-red'
                  onClick={()=>{
                    dispatch(SetBoard(selectedBoard))
                    dispatch(toggleDelete("board"));
                  }}
                
                >Delete Board</Dropdown.Item>
              
              </Dropdown.Menu>`

            

              </Dropdown>
                  
                </div>
              </div>
            </div>
          
      </div>
      <BoardList />
      </div>
     
    </div>
  
   
    </div>
   

  );
}

export default App;
