import store from "../redux/store"

type IRootState = ReturnType<typeof store.getState>;
type ThunkDispatch = typeof store.dispatch

export type {IRootState, ThunkDispatch};