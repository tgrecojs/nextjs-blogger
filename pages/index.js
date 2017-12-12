import Link from 'next/link'
import 'isomorphic-fetch';
import withStyles from '../shared/MUI/withMUI';
import Header from '../components/header';
import { Card, CardHeader, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

const styles = {
  cardStyles: {
    margin: 10,
  }
}

const Page = ({posts}) =>
  <div>
  <Header />
    {posts.map(x =>
      <Card key={x.id} style={styles.cardStyles}>
      <CardHeader title={x.title}  />
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
    const response = await fetch(`https://www.googleapis.com/blogger/v3/blogs/4789269094064278868/posts?key=${process.env.BLOGGER_API_KEY}`)
    const data = await response.json()
    return {posts: data.items};
  }

export default withStyles(Page);
  