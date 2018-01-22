import AppBar from 'material-ui/AppBar';

const Header = ({ title = 'Next.js blogging application'}) =>
    <AppBar title={title} showMenuIconButton={false} />

export default Header;
