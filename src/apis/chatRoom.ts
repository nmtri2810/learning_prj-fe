import axiosInstance from './axiosInstance';

const context = '/chat-rooms';

const chatRoomAPI = {
  async get(id: string) {
    return await axiosInstance.get(`${context}/${id}`);
  },
};

export default chatRoomAPI;
