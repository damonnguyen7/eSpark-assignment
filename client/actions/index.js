const SET_VIDEO_AT = 'SET_VIDEO_AT';
const INCREMENT_PLAY_COUNTER = 'INCREMENT_PLAY_COUNTER';
const INCREMENT_PAUSE_COUNTER = 'INCREMENT_PAUSE_COUNTER';
const INCREMENT_REPLAY_COUNTER = 'INCREMENT_REPLAY_COUNTER';
const SET_QUESTION_RESULT = 'SET_QUESTION_RESULT';
const SET_FIRST_NAME = 'SET_FIRST_NAME';
const SET_LAST_NAME = 'SET_LAST_NAME';
const UPDATE_CURRENT_TIME = 'UPDATE_CURRENT_TIME';
const DISABLE_REPLAY_FOR_SEGMENT = 'DISABLE_REPLAY_FOR_SEGMENT';

export function setFirstName(firstName) {
  return {
    type: SET_FIRST_NAME,
    firstName
  };
};

export function setLastName(lastName) {
  return {
    type: SET_LAST_NAME,
    lastName
  };
};

export function setVideoAt(videoLocation) {
  return {
    type: SET_VIDEO_AT,
    videoLocation
  };
};

export function incrementPlayCounter(videoLocation) {
  return {
    type: INCREMENT_PLAY_COUNTER,
    videoLocation
  };
};

export function incrementPauseCounter(videoLocation) {
  return {
    type: INCREMENT_PAUSE_COUNTER,
    videoLocation
  };
};

export function incrementReplayCounter(videoLocation) {
  return {
    type: INCREMENT_REPLAY_COUNTER,
    videoLocation
  };
};

export function setResultFor(segment, data) {
  console.log(segment, data);
  return {
    type: SET_QUESTION_RESULT,
    segment,
    data
  };
};

export function updateCurrentTime(playerCurrentTime) {
  return {
    type: UPDATE_CURRENT_TIME,
    playerCurrentTime
  };
};

export function disableReplayForSegment(segment) {
  return {
    type: DISABLE_REPLAY_FOR_SEGMENT,
    segment
  };
};
