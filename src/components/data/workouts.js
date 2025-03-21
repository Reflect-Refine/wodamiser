// Database of built-in workouts
const workouts = {
  regular: [
    {
      name: "Fran",
      description: "21-15-9 reps of:\nThrusters (43/30kg)\nPull-ups",
      type: "For Time",
      movements: ['barbells', 'gymnastics'],
      movementsList: ['thrusters', 'pullups'],
      estimatedTime: "5-15 minutes",
      difficulty: "Intermediate"
    },
    {
      name: "Cindy",
      description: "AMRAP in 20 minutes of:\n5 Pull-ups\n10 Push-ups\n15 Air Squats",
      type: "AMRAP",
      movements: ['gymnastics', 'bodyweight'],
      movementsList: ['pullups'],
      estimatedTime: "20 minutes",
      difficulty: "Beginner-Intermediate"
    },
    {
      name: "Helen",
      description: "3 rounds for time of:\n400m Run\n21 Kettlebell Swings (24/16kg)\n12 Pull-ups",
      type: "For Time",
      movements: ['running', 'kettlebells', 'gymnastics'],
      movementsList: ['kettlebellswings', 'pullups'],
      estimatedTime: "8-15 minutes",
      difficulty: "Intermediate"
    },
    {
      name: "Jackie",
      description: "For time:\n1000m Row\n50 Thrusters (20/15kg)\n30 Pull-ups",
      type: "For Time",
      movements: ['rowing', 'barbells', 'gymnastics'],
      movementsList: ['rowing', 'thrusters', 'pullups'],
      estimatedTime: "10-20 minutes",
      difficulty: "Intermediate-Advanced"
    },
    {
      name: "Karen",
      description: "For time:\n150 Wall Balls (9/6kg)",
      type: "For Time",
      movements: ['wallballs'],
      movementsList: ['wallballs'],
      estimatedTime: "7-12 minutes",
      difficulty: "Intermediate"
    },
    {
      name: "DT",
      description: "5 rounds for time of:\n12 Deadlifts (70/47.5kg)\n9 Hang Power Cleans (70/47.5kg)\n6 Push Jerks (70/47.5kg)",
      type: "For Time",
      movements: ['barbells'],
      movementsList: ['deadlifts'],
      estimatedTime: "10-15 minutes",
      difficulty: "Intermediate-Advanced"
    }
  ],
  hyrox: [
    {
      name: "Hyrox Prep 1",
      description: "1km Run\n100m Sled Push (men: 80kg / women: 60kg)\n1km Run\n100m Sled Pull (men: 80kg / women: 60kg)\n1km Run\n80m Burpee Broad Jumps\n1km Run",
      type: "For Time",
      movements: ['running', 'sleds', 'jumping'],
      movementsList: ['burpees'],
      estimatedTime: "30-45 minutes",
      difficulty: "Advanced"
    },
    {
      name: "Hyrox Prep 2",
      description: "1km Run\n50 Wall Balls (men: 9kg / women: 6kg)\n1km Run\n50 Reverse Lunges with Kettlebell (men: 24kg / women: 16kg)\n1km Run\n50 Sandbag Lunges (men: 20kg / women: 15kg)\n1km Run",
      type: "For Time",
      movements: ['running', 'wallballs', 'kettlebells', 'sandbags'],
      movementsList: ['wallballs', 'kettlebellswings'],
      estimatedTime: "30-45 minutes",
      difficulty: "Intermediate-Advanced"
    },
    {
      name: "Hyrox Row Challenge",
      description: "4 Rounds:\n500m Row\n30 Wall Balls (men: 9kg / women: 6kg)\n30 Box Step-Overs (60/50cm)\n30 Sandbag Thrusters (men: 20kg / women: 15kg)",
      type: "For Time",
      movements: ['rowing', 'wallballs', 'jumping', 'sandbags'],
      movementsList: ['rowing', 'wallballs', 'boxjumps'],
      estimatedTime: "30-40 minutes",
      difficulty: "Intermediate-Advanced"
    }
  ],
  intense: [
    {
      name: "The Nightmare",
      description: "For time:\n100 Burpees\n100 Pull-ups\n100 Thrusters (30/20kg)\n100 Box Jumps (60/50cm)\n100 Calorie Row",
      type: "For Time",
      movements: ['bodyweight', 'gymnastics', 'barbells', 'jumping', 'rowing'],
      movementsList: ['burpees', 'pullups', 'thrusters', 'boxjumps', 'rowing'],
      estimatedTime: "40-60 minutes",
      difficulty: "Advanced-Elite"
    },
    {
      name: "The Suffer",
      description: "AMRAP in 50 minutes:\n1km Run\n50 Air Squats\n30 Pull-ups\n15 Handstand Push-ups",
      type: "AMRAP",
      movements: ['running', 'bodyweight', 'gymnastics'],
      movementsList: ['pullups'],
      estimatedTime: "50 minutes",
      difficulty: "Advanced-Elite"
    },
    {
      name: "The Crusher",
      description: "7 rounds for time of:\n30 Deadlifts (100/70kg)\n30 Box Jumps (60/50cm)\n30 Pull-ups\n400m Run",
      type: "For Time",
      movements: ['barbells', 'jumping', 'gymnastics', 'running'],
      movementsList: ['deadlifts', 'boxjumps', 'pullups'],
      estimatedTime: "45-60 minutes",
      difficulty: "Elite"
    }
  ]
};

export default workouts;