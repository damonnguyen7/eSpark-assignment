export function findVideoSegment(location) {
  if ( location >= 31  && location <= 51) {
    return 'Engineer';
  } else if (location >= 83 && location <= 87) {
    return 'CivilEngineer';
  } else if (location >= 131 && location <= 149) {
    return 'ElectricalEngineer';
  } else if (location >= 160 && location <= 168) {
    return 'MechanicalEngineer';
  } else if (location >= 202 && location <= 210) {
    return 'SofwareEngineer';
  } else if (location >= 237 && location <= 246) {
    return 'AerospaceEngineer';
  } else {
    return undefined;
  }
}

export function incrementPlayOnce() {
  let segments = {
    Engineer: false,
    CivilEngineer: false,
    ElectricalEngineer: false,
    MechanicalEngineer: false,
    SoftwareEngineer: false,
    AerospaceEngineer: false
  };

  return function(location, incrementPlayCounterCB) {
    if (!segments[findVideoSegment(location)]) {
      incrementPlayCounterCB(location);
      segments[findVideoSegment(location)] = true;
    }
  }
};