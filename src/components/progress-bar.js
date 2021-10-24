import * as React from 'react';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { makeStyles } from '@mui/styles';


const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

const useStyles = makeStyles({
  color1: {
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: '#59981A',
    },
  },
  color2: {
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: '#81B622',
    },
  },
  color3: {
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: '#ECF87F',
    },
  }
});

export default function ProgressBar({ color, number }) {
  const classes = useStyles();

  const colorDict = {
    first: classes.color1,
    second: classes.color2,
    third: classes.color3,
  }

  return (
      <BorderLinearProgress variant="determinate" value={number} className={colorDict[color]} />
  );
}