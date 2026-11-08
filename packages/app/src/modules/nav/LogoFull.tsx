import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    height: 32,
    whiteSpace: 'nowrap',
  },
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
  name: {
    color: theme.palette.text.primary,
    fontSize: 19,
    fontWeight: 700,
    letterSpacing: '-0.5px',
  },
}));

export const LogoFull = () => {
  const classes = useStyles();

  return (
    <span className={classes.root}>
      <span className={classes.badge} aria-hidden="true">
        PH
      </span>
      <span className={classes.name}>Platform Hub</span>
    </span>
  );
};
