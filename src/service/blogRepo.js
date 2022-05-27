import { Amplify, API, graphqlOperation } from 'aws-amplify';
import awsExport from '../aws-exports';

import { listBlogs, listPosts } from '../graphql/queries';
import { getPost } from '../graphql/queries';
import { createBlog, createPost } from '../graphql/mutations';

Amplify.configure(awsExport);

// const blogs = [ 
//     {id: "blog1", name: "Blog 1"},
//     {id: "blog2", name: "Blog 2"},
//     {id: "blog3", name: "Blog 3"}
// ];

// const posts = [ 
//     {id: "post11", title: "Blog 1 Post 1", content: 'this is the post 1 content of blog 1', blogPostId: 'blog1'},
//     {id: "post12", title: "Blog 1 Post 2", content: 'this is the post 2 content of blog 1', blogPostId: 'blog1'},
//     {id: "post13", title: "Blog 1 Post 3", content: 'this is the post 3 content of blog 1', blogPostId: 'blog1'},
//     {id: "post21", title: "Blog 2 Post 1", content: 'this is the post 1 content of blog 2', blogPostId: 'blog2'},
//     {id: "post22", title: "Blog 2 Post 2", content: 'this is the post 2 content of blog 2', blogPostId: 'blog2'},
//     {id: "post23", title: "Blog 2 Post 3", content: 'this is the post 3 content of blog 2', blogPostId: 'blog2'},
//     {id: "post31", title: "Blog 3 Post 1", content: 'this is the post 1 content of blog 3', blogPostId: 'blog3'},
//     {id: "post32", title: "Blog 3 Post 2", content: 'this is the post 2 content of blog 3', blogPostId: 'blog3'},
//     {id: "post33", title: "Blog 3 Post 3", content: 'this is the post 3 content of blog 3', blogPostId: 'blog3'}
// ];


class BlogRepo {
    constructor(){

    }

    //functions go here
    async fetchBlogs() {
        try {
            const blogQuery = await API.graphql(graphqlOperation(listBlogs));
            const blogs = blogQuery.data.listBlogs.items;
            return blogs;
        } catch(ex) {
            console.log(`error fetching blogs: ${JSON.stringify(ex)}`);
        }

    }

    async fetchPosts(id) {
        try {
            const postQuery = await API.graphql(graphqlOperation(listPosts, {blogPostId: id} ));
            const posts = postQuery.data.listPosts.items;
            return posts;
        } catch(ex) {
            console.log(`error fetching posts: ${JSON.stringify(ex)}`);
        }

    }

    async getPost(id) {
        try {
            const postQuery = await API.graphql(graphqlOperation(getPost, {id: id}));
            const post = postQuery.data.getPost;
            return post;
        } catch(ex) {
            console.log(`error fetching posts: ${JSON.stringify(ex)}`);
        }

    }

    async addBlog(blog) {
        try{
            await API.graphql(graphqlOperation(createBlog, {input: blog}));
        } catch (ex){
            console.log(`error creating blog: ${JSON.stringify(ex)}`);
        }
    }

    async addPost(post) {
        try{
            await API.graphql(graphqlOperation(createPost, {input: post}));
        } catch (ex){
            console.log(`error creating post: ${JSON.stringify(ex)}`);
        }
    }
}

export default BlogRepo