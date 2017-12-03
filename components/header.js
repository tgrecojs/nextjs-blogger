import AppBar from 'material-ui/AppBar';

const Header = ({ title = 'Next.js blogging application!'}) =>
<AppBar
title={title}
iconClassNameRight="muidocs-icon-navigation-expand-more"
/>

export default Header;
