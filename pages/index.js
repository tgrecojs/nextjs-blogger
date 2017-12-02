import Link from 'next/link'
import 'isomorphic-fetch';
import withStyles from '../shared/MUI/withMUI';

import Header from '../components/header';

const Page = ({posts}) =>
  <div>
  <Header />
    {posts.map(x =>
      <div key={x.id} className="post">
        {/*
          show the /blog/:x.id url in the browser
          but use the pages/post.js file with the x.id as a query internally
        */}
        <Link prefetch href={`/post?id=${x.id}`} as={`/blog/${x.id}`}>
          <a>
            Go to post {x.id}
          </a>
        </Link>
      </div>
    )}
    <style jsx>{`
      .post {
        border: 1px solx.id black;
        padding: 1em 2em;
        margin: .5em 0;
      }
    `}</style>
  </div>


Page.getInitialProps = async () => {
    const res = await fetch(`https://www.googleapis.com/blogger/v3/blogs/4789269094064278868/posts?key=${process.env.BLOGGER_API_KEY}`)
    const json = await res.json()
    return {posts: json.items};
  }

export default withStyles(Page);
  