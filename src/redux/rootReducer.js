import authReducer from "./slices/authSlice";
import chatReducer from "./slices/chatSlice";
import layoutSlice from "./slices/layoutSlice";

const rootReducer = {
  auth: authReducer,
  chat: chatReducer,
  layout: layoutSlice,
};

export default rootReducer;
