import axios from 'axios';

const url = 'http://localhost:4500/api/posts/';

class PostService {
  //Get Posts
  static async getPosts() {
    const res = await axios.get(url);
    return res.data.map((item) => ({
      ...item,
      createdDate: new Date(item.createdDate),
    }));
  }

  //Get Single Posts
  static async getSinglePosts(id) {
    const res = await axios.get(`${url}${id}`);
    return res.data.map((item) => ({
      ...item,
      createdDate: new Date(item.createdDate),
    }));
  }

  //Add Posts
  static addPost(text) {
    return axios.post(url, { text });
  }

  //Update Posts
  static updatePost(id, text) {
    return axios.put(`${url}${id}`, { text });
  }

  //Delete Posts
  static deletePost(id) {
    return axios.delete(`${url}${id}`);
  }
}

export default PostService;
