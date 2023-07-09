import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import SidebarReducer  from '../features/Sidebar/SidebarSlice';
import BoardListReducer from '../features/BoardLists/BoardListSlice';
import ModalReducer from '../features/Modals/ModalSlice';

export const store = configureStore({
  reducer: {
    sidebar:SidebarReducer,
    boardList:BoardListReducer,
    modal:ModalReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
