export const calculateNextScheduledTime = (
  difficulty,
  setEasy,
  setMedium,
  setHard,
  prevStatus,
  reviewCount
) => {
  let timeIncrementSecondsEasy;
  let timeIncrementSecondsMedium;
  let timeIncrementSecondsHard;

  switch (difficulty) {
    case 'Easy':
      if (reviewCount === 0) {
        timeIncrementSecondsEasy = 10 * 60; // 10 minutes
      } 
      setEasy((prev) => prev + 1);
      break;
    case 'Medium':
      if (reviewCount === 0) {
        timeIncrementSecondsMedium = 3 * 60; // 3 minutes
      } 
      setMedium((prev) => prev + 1);
      break;
    case 'Hard':
      if (reviewCount === 0) {
        timeIncrementSecondsHard = 60; // 1 minute
      } 
      setHard((prev) => prev + 1);
      break;
    default:
      return;
  }

  
  if (prevStatus === 'Easy' && reviewCount >= 1) {
    if (difficulty === 'Easy') {
      timeIncrementSecondsEasy *= 3;
      timeIncrementSecondsMedium *= 3;
      timeIncrementSecondsHard *= 3;
    } else if (difficulty === 'Medium') {
      timeIncrementSecondsEasy *= 0.6;
      timeIncrementSecondsMedium *= 0.6;
      timeIncrementSecondsHard *= 0.6;
    } else if (difficulty === 'Hard') {
      timeIncrementSecondsEasy *= 0.2;
      timeIncrementSecondsMedium *= 0.2;
      timeIncrementSecondsHard *= 0.2;
    }
  } else if (prevStatus === 'Medium' && reviewCount >= 1) {
    if (difficulty === 'Easy') {
      timeIncrementSecondsEasy *= 1.5;
      timeIncrementSecondsMedium *= 1.5;
      timeIncrementSecondsHard *= 1.5;
    } else if (difficulty === 'Medium') {
      timeIncrementSecondsEasy *= 1.1;
      timeIncrementSecondsMedium *= 1.1;
      timeIncrementSecondsHard *= 1.1;
    } else if (difficulty === 'Hard') {
      timeIncrementSecondsEasy *= 0.3;
      timeIncrementSecondsMedium *= 0.3;
      timeIncrementSecondsHard *= 0.3;
    }
  } else if (prevStatus === 'Hard' && reviewCount >= 1) {
    if (difficulty === 'Easy') {
      timeIncrementSecondsEasy *= 1.8;
      timeIncrementSecondsMedium *= 1.8;
      timeIncrementSecondsHard *= 1.8;
    } else if (difficulty === 'Medium') {
      timeIncrementSecondsEasy *= 1.2;
      timeIncrementSecondsMedium *= 1.2;
      timeIncrementSecondsHard *= 1.2;
    } else if (difficulty === 'Hard') {
      timeIncrementSecondsEasy *= 0.5;
      timeIncrementSecondsMedium *= 0.5;
      timeIncrementSecondsHard *= 0.5;
    }
  }

  timeIncrementSecondsEasy = Math.min(timeIncrementSecondsEasy, 604800);
  timeIncrementSecondsMedium = Math.min(timeIncrementSecondsMedium, 604800);
  timeIncrementSecondsHard = Math.min(timeIncrementSecondsHard, 604800);

  const timeNowInUtc = new Date().toISOString();
  const date = new Date(timeNowInUtc);
  if (difficulty === 'Easy') {
    date.setUTCSeconds(date.getUTCSeconds() + timeIncrementSecondsEasy);
  } else if (difficulty === 'Medium') {
    date.setUTCSeconds(date.getUTCSeconds() + timeIncrementSecondsMedium);
  }else{
    date.setUTCSeconds(date.getUTCSeconds() + timeIncrementSecondsHard); 
  }
  const nextScheduled = date.toISOString();



  const totalMinutesEasy = timeIncrementSecondsEasy / 60;
  const totalMinutesMedium = timeIncrementSecondsMedium / 60;
  const totalMinutesHard = timeIncrementSecondsHard / 60;


  function roundToNearestMinute(minutes) {
    return Math.round(minutes);
  }

  function roundToTenthHour(minutes) {
    if (minutes >= 60) {
      return Math.round(minutes / 6) / 10;
    }
    return Math.round((minutes / 60) * 10) / 10;
  }

  function roundToTenthDay(minutes) {
    return Math.round((minutes / (24 * 60)) * 10) / 10;
  }

  let finalTimeEasy;
  let finalTimeStringEasy = '';

  let finalTimeMedium;
  let finalTimeStringMedium = '';

  let finalTimeHard;
  let finalTimeStringHard = '';

  

  if(totalMinutesEasy < 60){
    finalTimeEasy = roundToNearestMinute(totalMinutesEasy);
    finalTimeStringEasy = `${finalTimeEasy}m`
  }else if(totalMinutesEasy >= 60 && totalMinutesEasy < 1440){
    finalTimeEasy = roundToTenthHour(totalMinutesEasy);
    finalTimeStringEasy = `${finalTimeEasy}hr`
  }else if(totalMinutesEasy >= 1440){
    finalTimeEasy = roundToTenthDay(totalMinutesEasy);
    finalTimeStringEasy = `${finalTimeEasy}d`;  
  }

  if (totalMinutesMedium < 60) {
    finalTimeMedium = roundToNearestMinute(totalMinutesMedium);
    finalTimeStringMedium = `${finalTimeMedium}m`;
  } else if (totalMinutesMedium >= 60 && totalMinutesMedium < 1440) {
    finalTimeMedium = roundToTenthHour(totalMinutesMedium);
    finalTimeStringMedium = `${finalTimeMedium}hr`;
  } else if (totalMinutesMedium >= 1440) {
    finalTimeMedium = roundToTenthDay(totalMinutesMedium);
    finalTimeStringMedium = `${finalTimeMedium}d`;
  }

 
  if (totalMinutesHard < 60) {
    finalTimeHard = roundToNearestMinute(totalMinutesHard);
    finalTimeStringHard = `${finalTimeHard}m`;
  } else if (totalMinutesHard >= 60 && totalMinutesHard < 1440) {
    finalTimeHard = roundToTenthHour(totalMinutesHard);
    finalTimeStringHard = `${finalTimeHard}hr`;
  } else if (totalMinutesHard >= 1440) {
    finalTimeHard = roundToTenthDay(totalMinutesHard);
    finalTimeStringHard = `${finalTimeHard}d`;
  }

  return {
    nextScheduled,
    timeNowInUtc,
    finalTimeStringEasy,
    finalTimeStringMedium,
    finalTimeStringHard
  };
};
