import React, { FunctionComponent, ReactElement, useContext, useReducer } from 'react';
import {
  Action,
  initialState,
  PossibleActionPayloads,
  reducer as repositoryReducer,
  State as RepositoryState,
} from '../../../domain/repository/reducer';

type RepositoryContext = {
  state: RepositoryState;
  dispatch: React.Dispatch<Action<PossibleActionPayloads>>;
};

const Context = React.createContext<RepositoryContext | undefined>(undefined);

export const useDispatch = (): React.Dispatch<Action<PossibleActionPayloads>> => {
  const { dispatch } = useContext(Context) as RepositoryContext;

  return dispatch;
};

export const useSelector = <T,>(selector: (store: RepositoryState) => T): T => {
  const { state } = useContext(Context) as RepositoryContext;

  return selector(state);
};

export const RepositoryProvider: FunctionComponent<{ children: ReactElement }> = ({ children }) => {
  const [state, dispatch] = useReducer(repositoryReducer, initialState);

  return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
};
