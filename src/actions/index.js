import { bindActionCreators } from "redux";
import store from "../store";
import * as actions from "./actions";

export const {
  heroCreated,
  heroCreating,
  heroCreatingError,
  heroRemoved,
  heroRemoving,
  heroRemovingError,
  heroesFetched,
  heroesFetching,
  heroesFetchingError,
  optionsFetched,
  toggleFilter,
} = bindActionCreators(actions, store.dispatch);
