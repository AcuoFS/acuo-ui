import axios from "axios/index";
import { FETCH_ACCESS_WITH_REFRESH } from "../../constants/APIcalls";

export const FetchAccessWithRefresh = () =>
  axios.get(FETCH_ACCESS_WITH_REFRESH, { withCredentials: true })
