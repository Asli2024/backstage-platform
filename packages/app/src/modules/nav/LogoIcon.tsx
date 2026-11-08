import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  badge: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontSize: 12,
    fontWeight: 800,
    flexShrink: 0,
  },
}));

export const LogoIcon = () => {
  const classes = useStyles();

  return (
    <span className={classes.badge} role="img" aria-label="Platform Hub">
      PH
    </span>
  );
};
