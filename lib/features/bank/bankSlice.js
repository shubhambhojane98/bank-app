const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  bankStatement: [],
  balance: 0,
};

const bankSlice = createSlice({
  name: "bank",
  initialState,
  reducers: {
    deposit: (state, action) => {
      const totalAmount = action.payload.amount;
      state.balance += totalAmount;
      const transaction = {
        ...action.payload,
        balance: state.balance,
      };
      state.bankStatement.push(transaction);
    },
    withdraw: (state, action) => {
      const totalAmount = action.payload.amount;
      if (state.balance >= totalAmount) {
        state.balance -= totalAmount;
        const transaction = {
          ...action.payload,
          balance: state.balance,
        };
        state.bankStatement.push(transaction);
      } else {
        alert("Insufficient balance");
      }
    },
    transfer: (state, action) => {
      const totalAmount = action.payload.amount;
      if (state.balance >= totalAmount) {
        state.balance -= totalAmount;
        const transaction = {
          ...action.payload,
          balance: state.balance,
        };
        state.bankStatement.push(transaction);
      } else {
        alert("Insufficient balance");
      }
    },
  },
});

export const { deposit, withdraw, transfer } = bankSlice.actions;

export default bankSlice.reducer;
