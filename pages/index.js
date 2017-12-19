import Header from '../components/header';
import withMui from '../shared/MUI/withMUI';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import 'isomorphic-fetch';

const Index = ({ posts }) => 
    <div>
    <Header />
       {
           posts.map(x =>
            <Card key={x.id}>
                <CardHeader title={x.title} />
                <CardText>
                    <RaisedButton label="Click here to read post!" />
                </CardText>
            </Card>
        )
       }
    </div>;

Index.getInitialProps = async () => {
    const res = await fetch(`${process.env.BLOGGER_URL}?key=${process.env.API_KEY}`);
    const data = await res.json();
    return { posts: data.items };
}

export default withMui(Index);
