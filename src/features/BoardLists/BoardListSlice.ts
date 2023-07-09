import { createSlice,PayloadAction } from "@reduxjs/toolkit";
export interface Checkitem{

  id:string,
  name:string,
  state:string
}

export interface CheckList{

  idCard:string,
  checkItems:Checkitem[]
}
export interface Card{

  id:string,
  name:string,
  idList:string,
  desc:string,
  checkitems:Checkitem[]
  idChecklists:string[]

}
export interface List{

    id:string,
    name:string,
    cards:Card[]
  
  }



export interface BoardListState{
  lists:List[],

}



const initialState:BoardListState={
  lists:[]
   
}

export const BoardListSlice=createSlice({
    name:'boardList',
    initialState,
    reducers:{
    
        setLists:(state,action:PayloadAction<List[]>)=>{
            state.lists=action.payload;
         
    
        },
        editTask:(state,action:PayloadAction<Card>)=>{
  
          var checkitems:Checkitem[];
          checkitems=[];
          for (let index = 0; index < state.lists.length; index++) {
         
                for (let i = 0; i < state.lists[index].cards.length; i++) {
                
                    if(state.lists[index].cards[i].id===action.payload.id){
                      checkitems=state.lists[index].cards[i].checkitems;
                      action.payload.checkitems=checkitems;
                        state.lists[index].cards.splice(i,1);
                   
                    }
                }

                if(state.lists[index].id===action.payload.idList){
                 
                    state.lists[index].cards.push(action.payload);

                }
            
          }
                 
     
        },
        addTask:(state,action:PayloadAction<Card>)=>{
            
          for (let index = 0; index < state.lists.length; index++) {
                if(state.lists[index].id===action.payload.idList){
                  action.payload.checkitems=[];
                  state.lists[index].cards.push(action.payload);
                }
            
          }
       
  
      },
      deleteTask:(state,action:PayloadAction<Card>)=>{
        
        for (let index = 0; index < state.lists.length; index++) {
          if(state.lists[index].id===action.payload.idList){
            for (let i = 0; i < state.lists[index].cards.length; i++) {
                  if(action.payload.id===state.lists[index].cards[i].id){
                    state.lists[index].cards.splice(i,1);
                  }
              
            }
        
            
          }
      
    }

          
                 
     
      },

       
    }
});

export default BoardListSlice.reducer;
export const {setLists,editTask,addTask,deleteTask }=BoardListSlice.actions;
