
  const BEHAVIOUR_CONFIGS = {
      'squash': {
          label: 'Squash',
          icon: '🎾',
          behaviours: [
      {description: 'Solo Session', score: 2},
      {description: 'Match', score: 2, icon: '⚔️'},
      {description: 'Open Night', score: 2},
      {description: 'Training Session', score: 3, icon: '🎯'},
      ],
      },
      'running': {
          label: 'Running',
          icon: '🏃‍♂️‍➡️',
          behaviours: [
      {description: 'Zone 2', score: 1},
      {description: 'Interval Session', score: 3},
      {description: 'Long Run', score: 2},
      {description: 'Hill Run', score: 2},
    ],
      },
      'strength': {
          label: 'Strength',
          icon: "🏋️‍♂️",
          behaviours: [
          {description: 'Workout', score: 2},
    ]
      },
      'health': {
          label: "Health",
          icon: '🩺',
          behaviours: [
      {description: 'Mobility Session', score: 2},
      {description: 'Mobility Snack', score: 1},
      {description: 'Injury Rehab', score: 2},
    ],
      },
      'other-exercise': {
          label: "Other Exercise",
          icon: '🥵',
          behaviours: [
      {description: 'Cardio Workout', score: 1},
      {description: 'Hike', score: 1},
    ]
      },
      'pilates': {
          label: 'Pilates',
          icon: '🤸‍♂️',
          behaviours: [
        {description: 'Regular Session', score: 2},
        {description: 'Missed Session', score: -2},
     ],
      },
      'cycling': {
          label: 'Cycling',
          icon: '🚴‍♂️',
          behaviours: [
        {description: 'BIke Ride', score: 2},
        {description: 'Zone 2', score: 1}
    ]
      },
      'food': {
          label: 'Food',
          icon: '🍴',
          behaviours: [
        {description: 'Healthy Choice', score: 1, icon: '🍎'},
        {description: 'Unhealthy Meal', score: -2, icon: '🍔'},
        {description: 'Unhealthy Snack/Drink', score: -1, icon: '🍫'},
        {description: 'Mindless Grazing/Boredom Eating', score: -1, icon: '🍪'},
        {description: 'Poorly hydrated', score: -1, icon: '🫗'},
     ],
          },
          'sleep': {
              label: 'Sleep',
              icon: '🛏️',
              behaviours: [
        {description: 'Late to Bed', score: -2 },
        {description: 'Early to Bed', score: 1},

      ],
          },
          'travel': {
              label: 'Travel',
              behaviours: [
        {description: 'Active Journey', score: 1}
      ],
          },
          'productivity': {
              label: 'Productivity',
              behaviours: [
        {description: 'Prograstination/Poor Focus', score: -2},
        {description: 'Deep Work Block Completed', score: 1}
      ]
          }
  };

  const PENALTIES = [
  ];


      
