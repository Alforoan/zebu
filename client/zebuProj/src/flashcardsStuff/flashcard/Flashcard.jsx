/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import './Flashcard.css'
import axios from 'axios';

const Flashcard = ({
  card,
  onNextCard,
  isAnswerShown,
  handleClick,
  setFontSize,
  fontSize,
  setCardId,
  id,
  setReviewCount,
  setPrevDifficulty,
  cardTimeEasy,
  cardTimeMedium,
  cardTimeHard,
  reviewCount,
  nextTime,
  setCardTimeEasy,
  setCardTimeMedium,
  setCardTimeHard,
  setCardTimeEasySeconds,
  setCardTimeMediumSeconds,
  setCardTimeHardSeconds,
}) => {

  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  useEffect(() => {
    setCardId(id)
  }, [id])
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

  useEffect(() => {
    const fetchCard = async() => {
      try {
        const response = await axios.get('http://localhost:3000/api/user/edit', {...config, params:{id: id}});
        const times = response?.data?.flashcard?.times;
        const status = response?.data?.flashcard?.status;
        let easyTime = response?.data?.flashcard?.easy;
        let mediumTime = response?.data?.flashcard?.medium;
        let hardTime = response?.data?.flashcard?.hard;
        
        if(easyTime === null || easyTime === 0){
          easyTime = 600;
  
        }
        if (mediumTime === null || mediumTime === 0) {
          mediumTime = 180;
        }
        if (hardTime === null || hardTime === 0) {
          hardTime = 60;
        }
        console.log({easyTime, mediumTime, hardTime});
        setCardTimeEasySeconds(easyTime); 
        setCardTimeMediumSeconds(mediumTime);
        setCardTimeHardSeconds(hardTime);

        const totalMinutesEasy = easyTime / 60;
        const totalMinutesMedium = mediumTime / 60;
        const totalMinutesHard = hardTime / 60;

        let finalTimeEasy;
        let finalTimeStringEasy = '';

        let finalTimeMedium;
        let finalTimeStringMedium = '';

        let finalTimeHard;
        let finalTimeStringHard = '';

        if (totalMinutesEasy < 60) {
          finalTimeEasy = roundToNearestMinute(totalMinutesEasy);
          if (finalTimeEasy < 1) {
            finalTimeStringEasy = `1m`;
          }else{
            finalTimeStringEasy = `${finalTimeEasy}m`;
          }
        } else if (totalMinutesEasy >= 60 && totalMinutesEasy < 1440) {
          finalTimeEasy = roundToTenthHour(totalMinutesEasy);
          finalTimeStringEasy = `${finalTimeEasy}hr`;
        } else if (totalMinutesEasy >= 1440) {
          finalTimeEasy = roundToTenthDay(totalMinutesEasy);
          finalTimeStringEasy = `${finalTimeEasy}d`;
        }

        if (totalMinutesMedium < 60) {
          finalTimeMedium = roundToNearestMinute(totalMinutesMedium);
          if (finalTimeMedium < 1) {
            finalTimeStringMedium = `1m`;
          } else {
            finalTimeStringMedium = `${finalTimeMedium}m`;
          }
        } else if (totalMinutesMedium >= 60 && totalMinutesMedium < 1440) {
          finalTimeMedium = roundToTenthHour(totalMinutesMedium);
          finalTimeStringMedium = `${finalTimeMedium}hr`;
        } else if (totalMinutesMedium >= 1440) {
          finalTimeMedium = roundToTenthDay(totalMinutesMedium);
          finalTimeStringMedium = `${finalTimeMedium}d`;
        }

        if (totalMinutesHard < 60) {
          finalTimeHard = roundToNearestMinute(totalMinutesHard);
          if (finalTimeHard < 1) {
            finalTimeStringHard = `1m`;
          } else {
            finalTimeStringHard = `${finalTimeHard}m`;
          }
        } else if (totalMinutesHard >= 60 && totalMinutesHard < 1440) {
          finalTimeHard = roundToTenthHour(totalMinutesHard);
          finalTimeStringHard = `${finalTimeHard}hr`;
        } else if (totalMinutesHard >= 1440) {
          finalTimeHard = roundToTenthDay(totalMinutesHard);
          finalTimeStringHard = `${finalTimeHard}d`;
        }

        if(status !== null){
          setPrevDifficulty(status);
        }
        
        setCardTimeEasy(finalTimeStringEasy)
        setCardTimeMedium(finalTimeStringMedium)
        setCardTimeHard(finalTimeStringHard)
        setReviewCount(times);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCard();
  }, [id])

  //console.log({reviewCount});
  //console.log({nextTime});
  console.log({reviewCount});
  console.log({cardTimeEasy});
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {!isAnswerShown ? (
        <>
          <p
            style={{
              marginTop: '2rem',
              maxWidth: '65vw',
              fontSize: `${fontSize}px`,
            }}
            className='front'
          >
            {card?.front}
          </p>
          <div
            style={{
              position: 'fixed',
              bottom: '6.3rem',
              left: 0,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <button onClick={handleClick}>Show Answer</button>
          </div>
        </>
      ) : (
        <>
          <div style={{ marginBottom: '8rem' }}>
            <p
              style={{
                marginTop: '2rem',
                maxWidth: '65vw',
                fontSize: `${fontSize}px`,
              }}
              className='front'
            >
              {card?.front}
            </p>
            <div className='line'></div>
            <p
              className='back'
              style={{ maxWidth: '65vw', fontSize: `${fontSize}px` }}
            >
              {card?.back}
            </p>
          </div>
          <div
            style={{
              position: 'fixed',
              bottom: 0,
              paddingBottom: '2rem',
              paddingTop: '1rem',
              left: 0,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'white',
            }}
          >
            <button onClick={handleClick}>Hide Answer</button>
            <div>
              <div style={{ display: 'flex', marginTop: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ textAlign: 'center' }}>
                    &lt;{reviewCount === 0 ? '10m' : cardTimeEasy}
                  </span>
                  <button
                    onClick={(e) => onNextCard(e, card?.id)}
                    className='difficulty-btn'
                  >
                    Easy
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ textAlign: 'center' }}>
                    &lt;{reviewCount === 0 ? '3m' : cardTimeMedium}
                  </span>
                  <button
                    onClick={(e) => onNextCard(e, card?.id)}
                    className='difficulty-btn'
                  >
                    Medium
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ textAlign: 'center' }}>
                    &lt;{reviewCount === 0 ? '1m' : cardTimeHard}
                  </span>
                  <button
                    onClick={(e) => onNextCard(e, card?.id)}
                    className='difficulty-btn'
                  >
                    Hard
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Flashcard