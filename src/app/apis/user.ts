import axiosInstance from './axiosInstance';

const context = '/users';

const userAPI = {
  async getList() {
    return await axiosInstance.get(context);
  },
};

export default userAPI;
