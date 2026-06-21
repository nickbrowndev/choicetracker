
const DAY_MINUTE_OFFSET = 3*60;

const BEHAVIOUR_CONFIGS = {
  'squash': {
    label: 'Squash',
    icon: '🎾',
    behaviours: [
      { id: 'SQUASH_SOLO', label: 'Solo Session', score: 2 },
      { id: 'SQUASH_MATCH', label: 'Match', score: 2, icon: '⚔️', isStrenuous: true},
      { id: 'SQUASH_OPEN_NIGHT', label: 'Open Night', score: 2, isStrenuous: true },
      { id: 'SQUASH_TRAINING', label: 'Training Session', score: 3, icon: '🎯', isStrenuous: true },
    ],
  },
  'running': {
    label: 'Running',
    icon: '🏃‍♂️‍➡️',
    behaviours: [
      { id: 'RUNNING_ZONE2', label: 'Zone 2', score: 1 },
      { id: 'RUNNING_INTERVAL', label: 'Interval Session', score: 3, isStrenuous: true },
      { id: 'RUNNING_LONG', label: 'Long Run', score: 2, isStrenuous: true},
      { id: 'RUNNING_HILL', label: 'Hill Run', score: 2, isStrenuous: true},
      { id: 'RUNNING_TEMPO', label: 'Tempo Run', score: 2, isStrenuous: true},
    ],
  },
  'strength': {
    label: 'Strength',
    icon: "🏋️‍♂️",
    behaviours: [
      { id: 'STRENGTH_WORKOUT', label: 'Workout', score: 2, isStrenuous: true },
    ]
  },
  'health': {
    label: "Health",
    icon: '🩺',
    behaviours: [
      { id: 'HEALTH_MOBILITY_SESSION', label: 'Mobility Session', score: 2 },
      { id: 'HEALTH_MOBILITY_SNACK', label: 'Mobility Snack', score: 1 }, // Note: Both start with Mobility, you may want to differentiate later if using as unique primary keys!
      { id: 'HEALTH_REHAB', label: 'Injury Rehab', score: 2 },
    ],
  },
  'other-exercise': {
    label: "Other Exercise",
    icon: '🥵',
    behaviours: [
      { id: 'OTHER_EXERCISE_CARDIO', label: 'Cardio Workout', score: 1 },
      { id: 'OTHER_EXERCISE_HIKE', label: 'Hike', score: 1 },
    ]
  },
  'pilates': {
    label: 'Pilates',
    icon: '🤸‍♂️',
    behaviours: [
      { id: 'PILATES_REGULAR_SESSION', label: 'Regular Session', score: 2 },
      { id: 'PILATES_MISSED_SESSION', label: 'Missed Session', score: -2 },
    ],
  },
  'cycling': {
    label: 'Cycling',
    icon: '🚴‍♂️',
    behaviours: [
      { id: 'CYCLING_BIKE', label: 'BIke Ride', score: 2, isStrenuous: true },
      { id: 'CYCLING_ZONE2', label: 'Zone 2', score: 1 }
    ]
  },
  'food': {
    label: 'Food',
    icon: '🍴',
    behaviours: [
      { id: 'FOOD_HEALTHY_CHOICE', label: 'Healthy Choice', score: 1, icon: '🍎' },
      { id: 'FOOD_UNHEALTHY_MEAL', label: 'Unhealthy Meal', score: -2, icon: '🍔' },
      { id: 'FOOD_UNHEALTHY_SNACK', label: 'Unhealthy Snack/Drink', score: -1, icon: '🍫' },
      { id: 'FOOD_MINDLESS_GRAZING', label: 'Mindless Grazing/Boredom Eating', score: -1, icon: '🍪' },
      { id: 'FOOD_POORLY_HYDRATED', label: 'Poorly hydrated', score: -1, icon: '🫗' },
    ],
  },
  'sleep': {
    label: 'Sleep',
    icon: '🛏️',
    behaviours: [
      { id: 'SLEEP_LATE', label: 'Late to Bed', score: -2 },
      { id: 'SLEEP_EARLY', label: 'Early to Bed', score: 1 },
    ],
  },
  'travel': {
    label: 'Travel',
    behaviours: [
      { id: 'TRAVEL_ACTIVE', label: 'Active Journey', score: 1 }
    ],
  },
  'productivity': {
    label: 'Productivity',
    behaviours: [
      { id: 'PRODUCTIVITY_PROCRASTINATION', label: 'Prograstination/Poor Focus', score: -2 },
      { id: 'PRODUCTIVITY_DEEP_WORK', label: 'Deep Work Block Completed', score: 1 }
    ]
  }
};
  const PENALTIES = [
  ];


      
