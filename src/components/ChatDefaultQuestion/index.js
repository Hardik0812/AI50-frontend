import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { ChatBrandLogo } from "../../assets";
import DashboardLayout from "../../layout/DashboardLayout";
import {
  addChatToHistory,
  addMessageToChatHistory,
  questionsList,
  setSelectedChatHistory,
  updateMessageAnswerInChatHistory,
} from "../../redux/slices/chatSlice";
import { initiateChat } from "../../redux/slices/chatSlice";

import SendChatForm from "../SendChatForm";
import Chat from "../Chat";

const related_questions = [
  "What are the eligibility requirements for 2024 Medicare, and how do I or my clients enroll?",
  "What does 2024 Medicare cover, and what are the differences between Part A, Part B, Part C, and Part D?",
  "⁠How much does Medicare cost? What are the premiums, deductibles, and out-of-pocket expenses for different parts of Medicare for 2024?",
];

const ChatDefaultQuestion = () => {
  const [isRunning, setIsRunning] = useState(false);

  const dispatch = useDispatch();
  const { userDetails } = useSelector((state) => state.auth);

  const questions = useSelector((state) => state.chat.questionsList);

  useEffect(() => {
    if (questions.length === 0) {
      dispatch(questionsList());
    }
  }, [dispatch, questions.length]);

  const listQuestions = questions.map((item) => {
    const words = item.split(" ");
    const title = words.slice(0, 3).join(" ");
    const description = words.slice(3).join(" ");
    return { title, description };
  });

  const onSubmit = async (inputValue) => {
    setIsRunning(true);
    const chat_uid = uuidv4();
    const message_uid = uuidv4();

    await dispatch(
      addChatToHistory({
        id: chat_uid,
        chat_uid: chat_uid,
        user_id: userDetails.id,
        title: inputValue,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_pinned: false,
        is_archived: false,
        messages: [],
      })
    );

    const addNewMessage = {
      id: message_uid,
      chat_id: chat_uid,
      message_uid: message_uid,
      user_id: userDetails.id,
      question: inputValue,
      answer: "",
      related_questions: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      loading: true,
    };

    await dispatch(
      addMessageToChatHistory({
        chatId: chat_uid,
        message: addNewMessage,
      })
    );

    await dispatch(
      setSelectedChatHistory({
        id: chat_uid,
        chat_uid: chat_uid,
        user_id: userDetails.id,
        title: inputValue,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_pinned: false,
        is_archived: false,
        messages: [],
      })
    );

    dispatch(initiateChat({ prompt: inputValue, chat_uid, message_uid })).then(
      async (response) => {
        setIsRunning(false);

        if (
          response.payload.success === "True" ||
          response.payload.success === true
        ) {
          await dispatch(
            updateMessageAnswerInChatHistory({
              newConversation: true,
              chat_uid: chat_uid,
              chatId: response.payload.data.chat_id,
              message_uid: message_uid,
              answer: response.payload.data.answer,
              related_questions: response.payload.data.related_questions,
            })
          );

          await dispatch(
            setSelectedChatHistory({
              id: response.payload.data.chat_id,
              chat_uid: chat_uid,
              user_id: userDetails.id,
              title: inputValue,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              is_pinned: false,
              is_archived: false,
              messages: [],
            })
          );
        }
      }
    );
  };

  const onQuestionSubmit = async (question) => {
    const chat_uid = uuidv4();
    const message_uid = uuidv4();
    setIsRunning(true);

    await dispatch(
      addChatToHistory({
        id: chat_uid,
        chat_uid: chat_uid,
        user_id: userDetails.id,
        title: question,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_pinned: false,
        is_archived: false,
        messages: [],
      })
    );

    const addNewMessage = {
      id: message_uid,
      chat_id: chat_uid,
      message_uid: message_uid,
      user_id: userDetails.id,
      question: question,
      answer: "",
      related_questions: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      loading: true,
    };

    await dispatch(
      addMessageToChatHistory({
        chatId: chat_uid,
        message: addNewMessage,
      })
    );

    await dispatch(
      setSelectedChatHistory({
        id: chat_uid,
        chat_uid: chat_uid,
        user_id: userDetails.id,
        title: question,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_pinned: false,
        is_archived: false,
        messages: [],
      })
    );

    dispatch(initiateChat({ prompt: question, chat_uid, message_uid })).then(
      async (response) => {
        setIsRunning(false);

        if (
          response.payload.success === "True" ||
          response.payload.success === true
        ) {
          await dispatch(
            updateMessageAnswerInChatHistory({
              newConversation: true,
              chat_uid: chat_uid,
              chatId: response.payload.data.chat_id,
              message_uid: message_uid,
              answer: response.payload.data.answer,
              related_questions: response.payload.data.related_questions,
            })
          );
          await dispatch(
            setSelectedChatHistory({
              id: response.payload.data.chat_id,
              chat_uid: chat_uid,
              user_id: userDetails.id,
              title: question,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              is_pinned: false,
              is_archived: false,
              messages: [],
            })
          );
        }
      }
    );
  };

  const onTopicSubmit = async (question) => {
    const chat_uid = uuidv4();
    const message_uid = uuidv4();
    setIsRunning(true);

    await dispatch(
      addChatToHistory({
        id: chat_uid,
        chat_uid: chat_uid,
        user_id: userDetails.id,
        title: question,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_pinned: false,
        is_archived: false,
        messages: [],
      })
    );

    const addNewMessage = {
      id: message_uid,
      chat_id: chat_uid,
      message_uid: message_uid,
      user_id: userDetails.id,
      question: question,
      answer: "",
      related_questions: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      loading: true,
    };

    await dispatch(
      addMessageToChatHistory({
        chatId: chat_uid,
        message: addNewMessage,
      })
    );

    await dispatch(
      setSelectedChatHistory({
        id: chat_uid,
        chat_uid: chat_uid,
        user_id: userDetails.id,
        title: question,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_pinned: false,
        is_archived: false,
        messages: [],
      })
    );

    dispatch(
      initiateChat({
        type: "personalized",
        prompt: question,
        chat_uid,
        message_uid,
      })
    ).then(async (response) => {
      setIsRunning(false);

      if (
        response.payload.success === "True" ||
        response.payload.success === true
      ) {
        await dispatch(
          updateMessageAnswerInChatHistory({
            newConversation: true,
            chat_uid: chat_uid,
            chatId: response.payload.data.chat_id,
            message_uid: message_uid,
            answer: response.payload.data.answer,
            related_questions: response.payload.data.related_questions,
          })
        );
        await dispatch(
          setSelectedChatHistory({
            id: response.payload.data.chat_id,
            chat_uid: chat_uid,
            user_id: userDetails.id,
            title: question,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            is_pinned: false,
            is_archived: false,
            messages: [],
          })
        );
      }
    });
  };

  return (
    <DashboardLayout>
      {/* <Chat /> */}
      <div className="w-full px-4 xl:px-0 md:max-w=[800px] xl:max-w-[900px] 2xl:max-w-[1265px] m-auto h-full relative">
        <div className="flex flex-col h-full w-full  ">
          <div className=" h-full">
            {/* Logo  */}
            <div className="flex flex-col items-center mb-6 pt-[75px] pb-[60px]">
              <ChatBrandLogo className="my-6" />
              <h1 className="text-3xl font-semibold">
                {userDetails?.full_name ? `${userDetails?.full_name} ,` : ""}{" "}
                How Can I Help You Today?
              </h1>
            </div>
            {/*  */}
            <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
              {listQuestions?.map((info, i) => (
                <div
                  className="col-span-1 cursor-pointer"
                  key={i}
                  onClick={() =>
                    onTopicSubmit(info.title + " " + info.description)
                  }
                >
                  <div className="bg-white rounded-xl border border-[#ccc] p-4">
                    <p className="text-2xl font-semibold m-0">{info?.title}</p>
                    <span className="text-2xl font-normal opacity-[0.7] mt-2">
                      {info?.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5">
              <div className="bg-white rounded-xl border border-[#ccc] p-4">
                <h2 className="text-2xl font-semibold mb-4">
                  Related Questions{" "}
                </h2>
                {related_questions.map((question, i) => (
                  <div className="mt-2" key={i}>
                    <div className="border border-[#ddd] p-3 rounded-lg">
                      <button
                        className="flex justify-between w-full px-2 rounded-lg text-lg"
                        onClick={() => onQuestionSubmit(question)}
                      >
                        <span className="text-xl font-medium text-left">
                          {question}
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <SendChatForm isRunning={isRunning} onSubmit={onSubmit} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ChatDefaultQuestion;
