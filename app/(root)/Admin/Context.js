'use client'
import React, { createContext, useReducer, useContext } from 'react';

const initialState = {
  user: null,
  loading: true,
  properties: {
    Price: '',
    ProjectType: '',
    ProjectAmount: '',
    ProjectName: '',
    Locate: '',
    Service: '',
    Bedrooms: '',
    State: '',
    Description:'',
    imageFiles: []
  },
  error: '',
  success: '',
  isEditing: false,
  username: ''
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_PROPERTIES':
      return { ...state, properties: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_SUCCESS':
      return { ...state, success: action.payload };
    case 'SET_IS_EDITING':
      return { ...state, isEditing: action.payload };
    case 'SET_USERNAME':
      return { ...state, username: action.payload };
    default:
      return state;
  }
};

const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
