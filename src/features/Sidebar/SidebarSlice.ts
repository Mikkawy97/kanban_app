import { createSlice,PayloadAction } from "@reduxjs/toolkit"
import { List } from "../BoardLists/BoardListSlice"

export interface Board{
    name:string,
    id:string
    lists:List[]
  
  }



export interface SidebarState{
    theme:String,
    isOpen:boolean,
    boards:Board[],
    selectedBoard: Board ;

}



const initialState:SidebarState={
    isOpen:true,
    theme:theme()
        
        
    
 
    
    ,
    boards:[],
    selectedBoard:{name:'',id:'',lists:[]}
   
}
function theme() {
    const value = localStorage.getItem("theme")
    
    if (typeof value === 'string' && value) {
        return value
    
    }
    else{
        localStorage.setItem('theme', JSON.stringify('light'));
        return 'light'
    }
    
   
}



export const SidebarSlice=createSlice({
    name:'sidebar',
    initialState,
    reducers:{
        toggleSidebar:(state)=>{
            state.isOpen=!(state.isOpen)
        },
        toggletheme:(state)=>{
            
                if(state.theme==='light'){
                    state.theme='dark';
                    localStorage.setItem('theme', 'dark');
                }
                else{
                    state.theme='light';
                    localStorage.setItem('theme', 'light');
                }
        },
        setBoards:(state,action:PayloadAction<[Board]>)=>{
            state.boards=action.payload;
            if(Number(action.payload.length) !==0){
                    state.selectedBoard=action.payload[0]
            }
      
        },
        setSelectedBoard:(state,action:PayloadAction<Board>)=>{
            state.selectedBoard=action.payload;

         
        },
        addBoard:(state,action:PayloadAction<Board>)=>{
            state.boards.push(action.payload);
           
         
        },

        add_edit_Board:(state,action:PayloadAction<Board>)=>{
        
            for (let index = 0; index < state.boards.length; index++) {
                        if(state.boards[index].id===action.payload.id){
                            console.log('dwedw');
                            state.boards.splice(index,1,action.payload);
                            
                        }
                        
                
            }
            state.selectedBoard=action.payload;
        },
        deleteBoard:(state,action:PayloadAction<Board>)=>{
        
            for (let index = 0; index < state.boards.length; index++) {
              if(state.boards[index].id===action.payload.id){
                state.boards.splice(index,1);
             
            
                
              }


          
        }
        
    
              
                     
         
          },
          editBoard:(state,action:PayloadAction<{board:Board,id:string}>)=>{
      
            for (let index = 0; index < state.boards.length; index++) {
              if(state.boards[index].id===action.payload.id){
          
                    var temp={...state.boards[index]};
                    temp.name=action.payload.board.name;
                    state.boards.splice(index,1,temp);
             
            
                
              }
          
        }
       
    }
          
       
    }
});

export default SidebarSlice.reducer;
export const {toggleSidebar,setBoards,setSelectedBoard,add_edit_Board,addBoard,deleteBoard,editBoard,toggletheme}=SidebarSlice.actions;
