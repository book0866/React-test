import './App.css';
import { AccountBook } from './component/AccountBook';
import { Provider } from 'react-redux';
import { createSlice, configureStore } from '@reduxjs/toolkit';

export const AccountSlice = createSlice({
  name: 'accountBook',
  initialState: { accountlist: [], totalAmount: 0 },
  reducers: {
    ADD: (state, action) => {
      const { amount, type } = action.payload;
      const id = state.accountlist.length;
      const item = { id, amount, type };

    state.accountlist.push(item);
    state.totalAmount = (state.totalAmount + type) === 'income' ? state.totalAmount + amount : state.totalAmount - amount;
    },
    DELETE: (state, action) => {
      const item = state.accountlist.find((item) => item.id === action.payload);
      if (item) {
        state.totalAmount = (state.totalAmount - item.type) === 'income' ? state.totalAmount + item.amount : state.totalAmount - item.amount;
        state.accountlist = state.accountlist.filter((item) => item.id !== action.payload);
      }
    }
  }
});

const store = configureStore({
  reducer: {
    accountBook: AccountSlice.reducer
  }
});

function App() {
  return (
    <div>
        <h3>가계부</h3>
        <Provider store={store}>
          <AccountBook></AccountBook>
        </Provider>
    </div>
  );
}

export default App;
