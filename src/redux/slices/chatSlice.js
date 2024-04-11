import {
  createSlice,
  createAsyncThunk,
  isPending,
  isRejected,
  isFulfilled,
} from "@reduxjs/toolkit";
import { ChatApi } from "../../services/apis/ChatApis";
import { resetApp } from "./authSlice";

export const initialState = {
  loading: false,
  chatHistory: [],
  questionsList: [],
  isHistoryLoaded: false,
  error: null,
  selectedChatHistory: null,
};

const handlePending = (state) => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload || action.error.message;
};

const handleFulfilled = (state, action) => {
  state.loading = false;

  if (action.type.startsWith("chat/chatHistory")) {
    state.chatHistory = action.payload?.data?.data
      ? action.payload?.data?.data
      : action.payload?.data;
    state.isHistoryLoaded = true;
  }

  if (action.type.startsWith("chat/questionsList")) {
    state.questionsList = action.payload?.data;
  }

  if (action.type.startsWith("chat/messageList")) {
    const { chatId, messages } = action.payload;
    const chatIndex = state.chatHistory.findIndex((chat) => chat.id === chatId);
    if (chatIndex !== -1) {
      state.chatHistory[chatIndex].messages = messages;
    }
  }
};

export const chatHistory = createAsyncThunk(
  "chat/chatHistory",
  async (data, { rejectWithValue }) => {
    try {
      const response = await ChatApi.chatHistory(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const questionsList = createAsyncThunk(
  "chat/questionsList",
  async (data, { rejectWithValue }) => {
    try {
      const response = await ChatApi.questionsList();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const messageList = createAsyncThunk(
  "chat/messageList",
  async (data, { rejectWithValue }) => {
    try {
      const response = await ChatApi.messageList(data);
      return { chatId: data.chatId, messages: response.data.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const initiateChat = createAsyncThunk(
  "chat/initiateChat",
  async (data, { rejectWithValue }) => {
    try {
      const response = await ChatApi.initiateChat(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateChat = createAsyncThunk(
  "chat/updateChat",
  async (data, { rejectWithValue }) => {
    try {
      const udpatedData = {
        prompt: data.prompt,
        message_uid: data.message_uid,
        question: data.question,
        answer: data.answer,
      };
      const response = await ChatApi.updateChat(data.chatId, udpatedData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSelectedChatHistory: (state, action) => {
      state.selectedChatHistory = action.payload;
    },
    clearSelectedChatHistory: (state) => {
      state.selectedChatHistory = null;
    },
    addChatToHistory: (state, action) => {
      const data = action.payload;
      state.chatHistory.unshift(data);
    },
    addMessageToChatHistory: (state, action) => {
      const { chatId, message } = action.payload;

      const chatIndex = state.chatHistory.findIndex(
        (chat) => chat.id === chatId
      );
      if (chatIndex !== -1) {
        if (!state.chatHistory[chatIndex].messages) {
          state.chatHistory[chatIndex].messages = [];
        }
        state.chatHistory[chatIndex].messages.push(message);
      }
    },
    updateMessageAnswerInChatHistory: (state, action) => {
      const {
        newConversation,
        chat_uid,
        chatId,
        message_uid,
        answer,
        related_questions,
      } = action.payload;
      let chatIndex;
      if (newConversation) {
        chatIndex = state.chatHistory.findIndex((chat) => chat.id === chat_uid);
      } else {
        chatIndex = state.chatHistory.findIndex((chat) => chat.id === chatId);
      }

      if (chatIndex !== -1) {
        const messageIndex = state.chatHistory[chatIndex].messages.findIndex(
          (message) => message.message_uid === message_uid
        );
        if (messageIndex !== -1) {
          if (newConversation) {
            state.chatHistory[chatIndex].id = chatId;
          }
          state.chatHistory[chatIndex].messages[messageIndex].loading = false;
          state.chatHistory[chatIndex].messages[messageIndex].answer = answer;
          state.chatHistory[chatIndex].messages[
            messageIndex
          ].related_questions = related_questions;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetApp, () => initialState)
      .addMatcher(isPending, handlePending)
      .addMatcher(isRejected, handleRejected)
      .addMatcher(isFulfilled, handleFulfilled);
  },
});

export const {
  clearError,
  setSelectedChatHistory,
  clearSelectedChatHistory,
  addChatToHistory,
  addMessageToChatHistory,
  updateMessageAnswerInChatHistory,
} = chatSlice.actions;
export default chatSlice.reducer;
