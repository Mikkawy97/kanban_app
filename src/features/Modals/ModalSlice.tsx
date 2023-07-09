import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { Card} from "../BoardLists/BoardListSlice";
import { Board } from "../Sidebar/SidebarSlice";

export interface Checkitem{

    id:string,
    name:string,
    state:string
  }



export interface ModalState{
    viewTask_show:Boolean,
    addEdit_task_show:Boolean,
    addEdit_board_show:Boolean,
    addEdit_task_flag:Boolean,
    addEdit_board_flag:boolean,


  
    delete_show:Boolean,
    deleteTaskBoard_flag:string


    selectedCard:Card 
    listsCopy:Board,
    selectBoard:Board ,
    sidebarSmallModal_show:Boolean
   


}



const initialState:ModalState={
    viewTask_show:false,
    addEdit_task_show:false,
    addEdit_board_show:false,
    addEdit_task_flag:false,
    addEdit_board_flag:false,

    delete_show:false,
    deleteTaskBoard_flag:"",
    listsCopy:{id:'',name:'',lists:[]},
    selectedCard:{name:'',id:'',idList:'',idChecklists:[],checkitems:[],desc:''},
    selectBoard:{name:"",id:'',lists:[]},
    sidebarSmallModal_show:false




   
}

export const ModalSlice=createSlice({
    name:'modal',
    initialState,
    reducers:{
    
        toggleViewTask_show:(state,action:PayloadAction<Card>)=>{
        
           state.viewTask_show=!state.viewTask_show;
           state.selectedCard=action.payload;
                
    
        },
        toggleAddEditTask_show:(state,action:PayloadAction<Card>)=>{
        
            state.addEdit_task_show=!state.addEdit_task_show;
            state.selectedCard=action.payload;
                 
     
         },
         toggleAddEditBoard_show:(state)=>{
        
            state.addEdit_board_show=!state.addEdit_board_show;
          
                 
     
         },
         toggleSmallModal_show:(state)=>{
        
            state.sidebarSmallModal_show=!state.sidebarSmallModal_show;
          
                 
     
         },
        edittask_mode:(state)=>{
            state.addEdit_task_flag=true;
        },
        addtask_mode:(state)=>{
            state.addEdit_task_flag=false;
        },
        editBoard_mode:(state)=>{
            state.addEdit_board_flag=true;
        },
        addBoard_mode:(state)=>{
            state.addEdit_board_flag=false;
        },
        setListCopy:(state,action:PayloadAction<Board>)=>{
                state.listsCopy.lists=action.payload.lists;
                state.listsCopy.name=action.payload.name;
                
          
        }
            ,
        toggleDelete:(state,action:PayloadAction<string>)=>{
        
            state.delete_show=!state.delete_show;
            state.deleteTaskBoard_flag=action.payload;


          
                 
     
        },
        SetTask:(state,action:PayloadAction<Card>)=>{
        
            state.selectedCard=action.payload

          
                 
     
        },
        SetBoard:(state,action:PayloadAction<Board>)=>{
        
            state.selectBoard=action.payload;

          
                 
     
        },
      

        

     

       
    }
});

export default ModalSlice.reducer;
export const {toggleViewTask_show,toggleAddEditTask_show,addtask_mode,edittask_mode,toggleAddEditBoard_show,addBoard_mode,editBoard_mode,setListCopy,toggleDelete,SetTask,SetBoard,toggleSmallModal_show}=ModalSlice.actions;
