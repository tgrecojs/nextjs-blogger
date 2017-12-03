import { Component } from 'react'
import Link from 'next/link';
import withStyles from '../shared/MUI/withMUI';
import Header from '../components/header';

const API_KEY = 'AIzaSyAvTf4FzPZt6hr7DtAXt2dBmQ5rqZXeZm8';
import { Card, CardHeader, CardText } from 'material-ui/Card'

const Page = ({id, content, title }) => (
  <div>
  <Header />
    <Card>
    <CardHeader title={title} />
    <CardText>
    <div dangerouslySetInnerHTML={{__html: content }} />
    <Link href="/" as="/blog">
      <a>Go back to the list of posts</a>
    </Link>
    </CardText>
  </Card>
  </div>
) 

Page.getInitialProps = async ({query: { id }}) => {
    const res = await fetch(`https://www.googleapis.com/blogger/v3/blogs/4789269094064278868/posts/${id}?key=${process.env.BLOGGER_API_KEY}`);
    const json = await res.json();
    const title = json.title;
    const content = json.content;
    return { id, title, content };
} 

export default withStyles(Page);
