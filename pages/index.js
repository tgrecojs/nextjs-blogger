import Link from 'next/link'
import 'isomorphic-fetch';
import withStyles from '../shared/MUI/withMUI';
import Header from '../components/header';
import { Card, CardHeader, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

const Page = ({posts}) =>
  <div>
  <Header />
     
    {posts.map(x =>
      <Card key={x.id} className="post">
      <CardHeader title={x.title} />
        {/*
          show the /blog/:x.id url in the browser
          but use the pages/post.js file with the x.id as a query internally
        */}
        <CardText>
        <RaisedButton primary={true} fullWidth={true}>
        <Link prefetch href={`/post?id=${x.id}`} as={`/blog/${x.id}`}>
          <a>
            Click to Read This Post
          </a>
        </Link>
        </RaisedButton>
        </CardText>
      </Card>
    )}
  </div>


Page.getInitialProps = async () => {
    const res = await fetch(`https://www.googleapis.com/blogger/v3/blogs/4789269094064278868/posts?key=${process.env.BLOGGER_API_KEY}`)
    const json = await res.json()
    return {posts: json.items};
  }

export default withStyles(Page);
  