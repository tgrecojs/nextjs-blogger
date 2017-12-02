import { Component } from 'react'
import Link from 'next/link';
// Blogger API KEY
const API_KEY = 'AIzaSyAvTf4FzPZt6hr7DtAXt2dBmQ5rqZXeZm8';


const Page = ({id, json }) => (
    <div>
    <h1>
      Post: {id}
    </h1>
    <div dangerouslySetInnerHTML={{__html: json.content }} />
    {/*
      show /blog in the browser
      but use pages/index.js file internally
    */}
    <Link href="/" as="/blog">
      <a>Go back to the list of posts</a>
    </Link>
    <style jsx>{`
      h1 {
        color: red;
      }
    `}</style>
  </div>
) 

Page.getInitialProps = async ({query: { id }}) => {
    const res = await fetch(`https://www.googleapis.com/blogger/v3/blogs/4789269094064278868/posts/${id}?key=${process.env.BLOGGER_API_KEY}`);
    const json = await res.json();
    
    return { json, id };
} 

export default Page;
