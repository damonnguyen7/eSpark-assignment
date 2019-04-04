import { findVideoSegment } from '../utility';

const initialState = {
  firstName: undefined,
  lastName: undefined,
  videoLocation: undefined,
  storeCurrentTime: 0,
  enableReplay: {
    Engineer: false,
    CivilEngineer: false,
    ElectricalEngineer: false,
    MechanicalEngineer: false,
    SofwareEngineer: false,
    AerospaceEngineer: false
  },
  behavior: {
    videoPlayer: {
      play: 0,
      pause: 0,
      replay: 0
    },
    videoSegment: {
      Engineer: {
        play: 0,
        pause: 0,
        replay: 0
      },
      CivilEngineer: {
        play: 0,
        pause: 0,
        replay: 0
      },
      ElectricalEngineer: {
        play: 0,
        pause: 0,
        replay: 0
      },
      MechanicalEngineer: {
        play: 0,
        pause: 0,
        replay: 0
      },
      SofwareEngineer: {
        play: 0,
        pause: 0,
        replay: 0
      },
      AerospaceEngineer: {
        play: 0,
        pause: 0,
        replay: 0
      }
    }
  },
  results: {
    Engineer: {},
    CivilEngineer: {}, 
    MechanicalEngineer: {},
    ElectricalEngineer: {},
    SoftwareEngineer: {},
    AerospaceEngineer: {}
  }
}

export default (state = initialState, action) => {
  switch(action.type) {
    case 'SET_FIRST_NAME':
      return {
        ...state,
        firstName: action.firstName
      };
      break;
    case 'SET_LAST_NAME':
      return {
        ...state,
        lastName: action.lastName
      };
      break;
    case 'SET_VIDEO_AT':
      return {
        ...state,
        videoLocation: action.videoLocation
      };
      break;
    case 'INCREMENT_PLAY_COUNTER':
      let segmentForPlay;
      if (action.videoLocation) {
        segmentForPlay = findVideoSegment(action.videoLocation);
      }
      if (segmentForPlay) {
        return {
          ...state,
          behavior: {
            videoPlayer: {
              ...state.behavior.videoPlayer
            },
            videoSegment: {
              ...state.behavior.videoSegment,
              [segmentForPlay]: {
                ...state.behavior.videoSegment[segmentForPlay],
                play: state.behavior.videoSegment[segmentForPlay].play + 1,
              } 
            }
          }
        };        
      }
      return {
        ...state,
        behavior: {
          videoPlayer: {
            ...state.behavior.videoPlayer,
            play: state.behavior.videoPlayer.play + 1
          }, 
          videoSegment: {
            ...state.behavior.videoSegment
          }
        }
      };
      break;
    case 'INCREMENT_PAUSE_COUNTER':
      let segmentForPause;
      if (action.videoLocation) {
        segmentForPause = findVideoSegment(action.videoLocation);
      }
      if (segmentForPause) {
        return {
          ...state,
          behavior: {
            videoPlayer: {
              ...state.behavior.videoPlayer,
              pause: state.behavior.videoPlayer.pause + 1
            },
            videoSegment: {
              ...state.behavior.videoSegment,
              [segmentForPause]: {
                ...state.behavior.videoSegment[segmentForPause],
                pause: state.behavior.videoSegment[segmentForPause].pause + 1
              } 
            }
          }
        };        
      }
      return {
        ...state,
        behavior: {
          videoPlayer: {
            ...state.behavior.videoPlayer,
            pause: state.behavior.videoPlayer.pause + 1
          }, 
          videoSegment: {
            ...state.behavior.videoSegment
          }
        }
      };
      break;
    case 'INCREMENT_REPLAY_COUNTER':
      let segmentForReplay = findVideoSegment(action.videoLocation);
      if (segmentForReplay) {
        return {
          ...state,
          behavior: {
            videoPlayer: {
              ...state.behavior.videoPlayer
            },
            videoSegment: {
              ...state.behavior.videoSegment,
              [segmentForReplay]: {
                ...state.behavior.videoSegment[segmentForReplay],
                replay: state.behavior.videoSegment[segmentForReplay].replay + 1
              }
            }
          }
        };        
      }
      break;
    case 'SET_QUESTION_RESULT':
      let segmentForResults = action.segment;
      return {
        ...state,
        results: {
          ...state.results,
          [segmentForResults]: action.data
        }
      };
      break;
    case 'UPDATE_CURRENT_TIME':
      let playerCurrentTime = action.playerCurrentTime;
      let studentToggleVideoBack = playerCurrentTime < state.storeCurrentTime;
      let enableReplay = state.enableReplay;
      if (studentToggleVideoBack) {
        let segmentForReplayOnCurrentTime = findVideoSegment(playerCurrentTime);
        //enable replay for segments that have not been played
        let videoBehaviorSegments = state.behavior.videoSegment;
        for (let segment in videoBehaviorSegments) {
          if (videoBehaviorSegments[segment].play === 1) {
            //enable replay for this segment
            enableReplay[segment] = true;
          }
        }
        return {
          ...state,
          enableReplay,
          storeCurrentTime: playerCurrentTime,
          behavior: {
            videoPlayer: {
              ...state.behavior.videoPlayer,
              replay: state.behavior.videoPlayer.replay + 1
            },
            videoSegment: {
              ...state.behavior.videoSegment
            }
          }
        };
      }
      return {
        ...state,
        storeCurrentTime: playerCurrentTime
      };
      break;
    case 'DISABLE_REPLAY_FOR_SEGMENT':
      let disableReplaySegment = action.segment;
      return {
        ...state,
        enableReplay: {
          ...state.enableReplay,
          [disableReplaySegment]: false
        }
      };
      break;
    default:
      return state;
  }
}
