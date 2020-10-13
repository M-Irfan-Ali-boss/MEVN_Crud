<template>
  <div class="container">
    <h1>Latest Post</h1>
    <FlashMessage :position="'right top'"></FlashMessage>
    <div class="create-post" v-if="update">
      <div class="Updatediv" v-for="post in posts" :key="post.id">
        <label for="create-post">Update Post</label>
        <input type="text" id="create-post" v-model="text" placeholder="Update Post" />
        <button class="btn btn-primary" @click="updatePost(post.id)">Update Post</button>
      </div>
    </div>
    <div class="create-post" v-else>
      <label for="create-post">Create Post</label>
      <input type="text" id="create-post" v-model="text" placeholder="Create Post" />
      <button class="btn btn-primary" @click="addPost">Add Post</button>
    </div>
    <hr />
    <p class="error" v-if="error">{{ error }}</p>
    <div class="post-container">
      <div class="post" v-for="post in posts" :key="post.id">
        <div class="created-at">{{ `${post.createdDate.getDate()}/${post.createdDate.getMonth()}/${post.createdDate.getFullYear()}` }}</div>
        <div class="event-btns">
          <div class="created-edit" @click="editPost(post.id)"><img src="../assets/edit.svg" alt="" /></div>
          <div class="created-delete" @click="deletePost(post.id)"><img src="../assets/delete.svg" alt="" /></div>
        </div>
        <p class="text">{{ post.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from '../PostService';
export default {
  name: 'PostComponent',
  data() {
    return {
      posts: [],
      text: '',
      error: '',
      update: false,
    };
  },
  methods: {
    async addPost() {
      await PostService.addPost(this.text);
      this.posts = await PostService.getPosts();
      this.text = '';
    },
    async editPost(id) {
      this.posts = await PostService.getSinglePosts(id);
      this.text = this.posts[0].text;
      this.update = true;
    },
    async updatePost(id) {
      await PostService.updatePost(id, this.text);
      this.posts = await PostService.getPosts();
      this.update = false;
      this.text = '';
      this.flashMessage.success({
        title: 'Success Message',
        message: 'Your post hase been successfully updated!',
      });
    },
    async deletePost(id) {
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts();
      this.flashMessage.success({
        title: 'Success Message',
        message: 'Your post hase been successfully deleted!',
      });
    },
  },
  async created() {
    try {
      this.posts = await PostService.getPosts();
    } catch (err) {
      this.error = err.message;
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container {
  max-width: 800px;
  margin: 0 auto;
}

._vue-flash-msg-body,
.Message div {
  z-index: 99;
}

p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}

.create-post {
  display: block;
  width: 100%;
}

.create-post label {
  display: block;
  margin-bottom: 5px;
  text-align: left;
}

.create-post input {
  text-align: left;
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  margin: 15px 0;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}

.btn-primary {
  color: #fff;
  background-color: darkgreen;
  display: inline-block;
  border: 0;
  cursor: pointer;
  font-weight: 400;
  text-align: center;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  margin: 0 5px 15px;
}

div.post {
  position: relative;
  border: 1px solid #5bd658;
  background-color: #bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}

div.created-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  background-color: darkgreen;
  color: white;
  font-size: 13px;
}

div.event-btns {
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px;
  background-color: darkgreen;
  color: white;
  font-size: 13px;
  display: flex;
  justify-content: flex-start;
}

div.event-btns img {
  width: 15px;
  margin: 0 5px;
  cursor: pointer;
}

p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}
</style>
