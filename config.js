
const DAY_MINUTE_OFFSET = 3*60;

const BEHAVIOUR_CONFIGS = {
  'squash': {
    label: 'Squash',
    icon: '🎾',
    behaviours: [
      { id: 'SQUASH_SOLO', description: 'Solo Session', score: 2 },
      { id: 'SQUASH_MATCH', description: 'Match', score: 2, icon: '⚔️', isStrenuous: true},
      { id: 'SQUASH_OPEN_NIGHT', description: 'Open Night', score: 2, isStrenuous: true },
      { id: 'SQUASH_TRAINING', description: 'Training Session', score: 3, icon: '🎯', isStrenuous: true },
    ],
  },
  'running': {
    label: 'Running',
    icon: '🏃‍♂️‍➡️',
    behaviours: [
      { id: 'RUNNING_ZONE2', description: 'Zone 2', score: 1 },
      { id: 'RUNNING_INTERVAL', description: 'Interval Session', score: 3, isStrenuous: true },
      { id: 'RUNNING_LONG', description: 'Long Run', score: 2, isStrenuous: true},
      { id: 'RUNNING_HILL', description: 'Hill Run', score: 2, isStrenuous: true},
      { id: 'RUNNING_TEMPO', description: 'Tempo Run', score: 2, isStrenuous: true},
    ],
  },
  'strength': {
    label: 'Strength',
    icon: "🏋️‍♂️",
    behaviours: [
      { id: 'STRENGTH_WORKOUT', description: 'Workout', score: 2, isStrenuous: true },
    ]
  },
  'health': {
    label: "Health",
    icon: '🩺',
    behaviours: [
      { id: 'HEALTH_MOBILITY_SESSION', description: 'Mobility Session', score: 2 },
      { id: 'HEALTH_MOBILITY_SNACK', description: 'Mobility Snack', score: 1 }, // Note: Both start with Mobility, you may want to differentiate later if using as unique primary keys!
      { id: 'HEALTH_REHAB', description: 'Injury Rehab', score: 2 },
    ],
  },
  'other-exercise': {
    label: "Other Exercise",
    icon: '🥵',
    behaviours: [
      { id: 'OTHER_EXERCISE_CARDIO', description: 'Cardio Workout', score: 1 },
      { id: 'OTHER_EXERCISE_HIKE', description: 'Hike', score: 1 },
    ]
  },
  'pilates': {
    label: 'Pilates',
    icon: '🤸‍♂️',
    behaviours: [
      { id: 'PILATES_REGULAR_SESSION', description: 'Regular Session', score: 2 },
      { id: 'PILATES_MISSED_SESSION', description: 'Missed Session', score: -2 },
    ],
  },
  'cycling': {
    label: 'Cycling',
    icon: '🚴‍♂️',
    behaviours: [
      { id: 'CYCLING_BIKE', description: 'BIke Ride', score: 2, isStrenuous: true },
      { id: 'CYCLING_ZONE2', description: 'Zone 2', score: 1 }
    ]
  },
  'food': {
    label: 'Food',
    icon: '🍴',
    behaviours: [
      { id: 'FOOD_HEALTHY_CHOICE', description: 'Healthy Choice', score: 1, icon: '🍎' },
      { id: 'FOOD_UNHEALTHY_MEAL', description: 'Unhealthy Meal', score: -2, icon: '🍔' },
      { id: 'FOOD_UNHEALTHY_SNACK', description: 'Unhealthy Snack/Drink', score: -1, icon: '🍫' },
      { id: 'FOOD_MINDLESS_GRAZING', description: 'Mindless Grazing/Boredom Eating', score: -1, icon: '🍪' },
      { id: 'FOOD_POORLY_HYDRATED', description: 'Poorly hydrated', score: -1, icon: '🫗' },
    ],
  },
  'sleep': {
    label: 'Sleep',
    icon: '🛏️',
    behaviours: [
      { id: 'SLEEP_LATE', description: 'Late to Bed', score: -2 },
      { id: 'SLEEP_EARLY', description: 'Early to Bed', score: 1 },
    ],
  },
  'travel': {
    label: 'Travel',
    behaviours: [
      { id: 'TRAVEL_ACTIVE', description: 'Active Journey', score: 1 }
    ],
  },
  'productivity': {
    label: 'Productivity',
    behaviours: [
      { id: 'PRODUCTIVITY_PROCRASTINATION', description: 'Prograstination/Poor Focus', score: -2 },
      { id: 'PRODUCTIVITY_DEEP_WORK', description: 'Deep Work Block Completed', score: 1 }
    ]
  }
};
  const PENALTIES = [
  ];


      
