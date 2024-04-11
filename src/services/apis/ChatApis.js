import { urls } from "../Urls";
import { ChatService } from "../http/ChatService";

export class ChatApi {
  static chatHistory() {
    const urlWithId = `${urls.chat.list}?ordering=-created_at`;
    return ChatService.get(urlWithId);
  }

  static questionsList() {
    return ChatService.get(urls.question.list);
  }

  static messageList(data) {
    const urlWithId = `${urls.chat.message_list}/${data.chatId}?ordering=created_at`;
    return ChatService.get(urlWithId);
  }

  static initiateChat(data) {
    return ChatService.post(urls.chat.initiate_chat, data);
  }

  static updateChat(chatId, data) {
    const urlWithId = `${urls.chat.update_chat}/${chatId}`;
    return ChatService.put(urlWithId, data);
  }
}
