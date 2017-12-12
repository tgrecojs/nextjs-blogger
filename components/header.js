import AppBar from 'material-ui/AppBar';
const styles = {
  title: {
    textAlign: 'center',
  },
};


const Header = ({ title = 'Next.js blogging application!'}) =>
  <AppBar title={title} showMenuIconButton={false} style={styles.title} />

export default Header;
