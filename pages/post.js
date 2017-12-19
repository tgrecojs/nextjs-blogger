import Header from '../components/header';
import withMui from '../shared/MUI/withMUI';

const Post = ({ title = 'The post will be rendered here!'}) => 
    <div>
        <Header />
        <h2>{title}</h2>
    </div>;

Post.getInitialProps = async () => {

};

export default withMui(Post);
