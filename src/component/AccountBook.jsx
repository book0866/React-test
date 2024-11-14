import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AccountSlice } from '../App';

export const AccountBook = () => {
  const [input, setInput] = useState('');
  const [type, setType] = useState('');
  const dispatch = useDispatch();

  const { accountlist, totalAmount } = useSelector((state) => {
    return {
      totalAmount: state.accountBook.totalAmount,
      accountlist: state.accountBook.accountlist
    };
  });

  return (
    <>
      <label>
        <input type="radio" value="income" name="select" onChange={() => setType('income')}/>수입
      </label>
      <label>
        <input type="radio" value="expense" name="select" onChange={() => setType('expense')}/>지출
      </label>

      <p>
        <input type="text" value={input} onChange={(event) => setInput(event.target.value)}/>
        <button onClick={() => {
            if (input && type) {
              
              dispatch(AccountSlice.actions.ADD({ amount: parseInt(input), type }));
              
              setInput('');
              setType('');
            }
          }}>등록
        </button>
      </p>

      <h4>총 금액: {totalAmount}</h4>

      <ul>
        {accountlist.map((item) => (
          <li key={item.id}>
            ({item.type === 'income' ? '수입' : '지출'}) {item.amount}
            <button onClick={() => dispatch(AccountSlice.actions.DELETE(item.id))}>
              삭제
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
