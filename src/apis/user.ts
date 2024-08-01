import axiosInstance from './axiosInstance';

const context = '/users';

const userAPI = {
  async getList() {
    return await axiosInstance.get(context);
  },
  async get(id: string) {
    return await axiosInstance.get(`${context}/${id}`);
  },
};

export default userAPI;
