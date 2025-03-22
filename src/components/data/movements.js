const movements = {
  pullups: {
    name: "Pull-ups",
    description: "A pull-up is an upper-body strength exercise where you hang from a bar and pull yourself up until your chin is above the bar.",
    tips: ["Keep your core tight", "Pull your shoulder blades down and back", "Try to lead with your chest"],
    scaling: ["Ring rows", "Jumping pull-ups", "Banded pull-ups"],
    videoUrl: "https://www.youtube.com/watch?v=lzRo-4pq_AY",
    tags: ["gymnastics", "bodyweight"]
  },
  thrusters: {
    name: "Thrusters",
    description: "A thruster combines a front squat with a push press in one fluid movement.",
    tips: ["Keep your elbows high in the front rack", "Maintain a full grip on the bar", "Drive through your heels"],
    scaling: ["Lighter weight", "Dumbbell thrusters", "No weight, just body movement"],
    videoUrl: "https://www.youtube.com/watch?v=L219ltL15zk",
    tags: ["barbells", "weightlifting"]
  },
  burpees: {
    name: "Burpees",
    description: "A full-body exercise that combines a squat, push-up, and jump.",
    tips: ["Keep your core engaged throughout", "Scale to your fitness level", "Focus on consistent pace rather than speed"],
    scaling: ["Step back instead of jumping", "No push-up", "No jump at the top"],
    videoUrl: "https://www.youtube.com/watch?v=TU8QYVW0gDU",
    tags: ["bodyweight", "conditioning"]
  },
  wallballs: {
    name: "Wall Balls",
    description: "A compound movement where you perform a squat with a medicine ball and then throw it to a target on the wall.",
    tips: ["Keep your chest up", "Use your legs to generate power", "Aim for the center of the target"],
    scaling: ["Lighter ball", "Lower target", "Squat to a box for depth"],
    videoUrl: "https://www.youtube.com/watch?v=fpUD0mcFp_0",
    tags: ["wallballs", "conditioning"]
  },
  kettlebellswings: {
    name: "Kettlebell Swings",
    description: "A dynamic exercise where you swing a kettlebell from between your legs to shoulder height using hip drive.",
    tips: ["Hinge at the hips, not squat", "Keep your back flat", "Squeeze your glutes at the top"],
    scaling: ["Lighter weight", "Russian swing (eye level) vs American (overhead)", "Two-handed vs one-handed"],
    videoUrl: "https://www.youtube.com/watch?v=mKDIuUbH94Q",
    tags: ["kettlebells", "conditioning"]
  },
  boxjumps: {
    name: "Box Jumps",
    description: "An explosive exercise where you jump from the ground onto a raised platform.",
    tips: ["Land softly with knees slightly bent", "Stand fully at the top", "Step down instead of jumping down to preserve your joints"],
    scaling: ["Lower box height", "Step-ups", "Box step-overs"],
    videoUrl: "https://www.youtube.com/watch?v=52r_Ul5k03g",
    tags: ["jumping", "bodyweight"]
  },
  deadlifts: {
    name: "Deadlifts",
    description: "A weight training exercise where you lift a loaded barbell from the ground to hip level.",
    tips: ["Keep your back flat", "Push through your heels", "Bar should stay close to your body"],
    scaling: ["Lighter weight", "Sumo stance", "Kettlebell or dumbbell deadlift"],
    videoUrl: "https://www.youtube.com/watch?v=op9kVnSso6Q",
    tags: ["barbells", "weightlifting"]
  },
  rowing: {
    name: "Rowing",
    description: "A full-body cardio exercise performed on a rowing machine.",
    tips: ["Legs-core-arms for the pull, arms-core-legs for the return", "Don't rush the return", "Set damper according to your fitness level"],
    scaling: ["Lower damper setting", "Reduced distance", "Alternate with another movement"],
    videoUrl: "https://www.youtube.com/watch?v=fxfhQMbATCw",
    tags: ["cardio", "rowing"]
  },
  cleans: {
    name: "Cleans",
    description: "A weightlifting movement where the barbell is lifted from the ground to the front rack position.",
    tips: ["Keep the bar close to your body", "Explode with your hips", "Catch with elbows high"],
    scaling: ["Hang power clean", "Lighter weight", "Dumbbell clean"],
    videoUrl: "https://www.youtube.com/watch?v=Ty14ogq_Vok",
    tags: ["barbells", "weightlifting"]
  },
  snatch: {
    name: "Snatch",
    description: "A complex Olympic lift where the barbell is lifted from the ground to overhead in one motion.",
    tips: ["Use a wide grip", "Pull under the bar quickly", "Stabilize overhead"],
    scaling: ["Hang power snatch", "Lighter weight", "Dumbbell snatch"],
    videoUrl: "https://www.youtube.com/watch?v=9xQp2sldyts",
    tags: ["barbells", "weightlifting"]
  },
  doubleunders: {
    name: "Double-unders",
    description: "A jump rope movement where the rope passes under your feet twice on each jump.",
    tips: ["Jump tall, not wide", "Keep your wrists relaxed", "Use a consistent rhythm"],
    scaling: ["Single-unders", "Penguin taps", "Speed step"],
    videoUrl: "https://www.youtube.com/watch?v=82jNjDS19lg",
    tags: ["jumping", "bodyweight"]
  },
  handstandpushups: {
    name: "Handstand Push-ups",
    description: "A gymnastic movement where you lower your head to the ground from a handstand position and push back up.",
    tips: ["Keep your core tight", "Use a kip if needed", "Ensure proper neck positioning"],
    scaling: ["Box handstand push-ups", "Pike push-ups", "Wall walks"],
    videoUrl: "https://www.youtube.com/watch?v=qbRbM6d5ddM",
    tags: ["gymnastics", "bodyweight"]
  },
  toes2bar: {
    name: "Toes-to-Bar",
    description: "A gymnastics movement where you raise your toes to touch the pull-up bar.",
    tips: ["Use a controlled kip", "Engage your core", "Point your toes"],
    scaling: ["Knees-to-chest", "Leg raises", "V-ups"],
    videoUrl: "https://www.youtube.com/watch?v=6dHvTlsMvNY",
    tags: ["gymnastics", "bodyweight"]
  },
  muscleups: {
    name: "Muscle-ups",
    description: "A high-skill gymnastic movement where you transition from a pull-up into a dip over the rings or bar.",
    tips: ["Use a powerful kip", "Keep the rings close", "Transition quickly with elbows back"],
    scaling: ["Jumping muscle-ups", "Chest-to-bar pull-ups + ring dips", "Band-assisted muscle-ups"],
    videoUrl: "https://www.youtube.com/watch?v=OCg3UXgzftc",
    tags: ["gymnastics", "bodyweight"]
  },
  bikeerg: {
    name: "BikeErg",
    description: "A cardio machine that simulates cycling and is commonly used for conditioning in CrossFit.",
    tips: ["Maintain steady cadence", "Adjust damper for resistance", "Push through your legs"],
    scaling: ["Lower watt target", "Shorter duration", "Alternate with rowing or running"],
    videoUrl: "https://www.youtube.com/watch?v=AzGfIlxgLAs",
    tags: ["cardio"]
  },
  skierg: {
    name: "SkiErg",
    description: "A cardio machine that simulates the double-pole technique used in Nordic skiing.",
    tips: ["Use full-body movement", "Drive with your core", "Recover upright with arms extended"],
    scaling: ["Lower pace", "Shorter time or distance", "Sub with rowing if unavailable"],
    videoUrl: "https://www.youtube.com/watch?v=B0lIgT5PHc8",
    tags: ["cardio"]
  },
  pushups: {
    name: "Push-ups",
    description: "A classic bodyweight movement where you lower and raise your body using your arms.",
    tips: ["Keep your elbows close", "Maintain a tight core", "Lead with your chest"],
    scaling: ["Knee push-ups", "Incline push-ups", "Negative push-ups"],
    videoUrl: "https://www.youtube.com/watch?v=0pkjOk0EiAk",
    tags: ["bodyweight"]
  },
  lunges: {
    name: "Lunges",
    description: "A lower-body strength movement involving stepping forward or backward into a bent-knee position.",
    tips: ["Keep your torso upright", "Drive through your front heel", "Avoid letting your knee go past your toes"],
    scaling: ["Step-back lunges", "Shorter range of motion", "Support with hands"],
    videoUrl: "https://www.youtube.com/watch?v=QOVaHwm-Q6U",
    tags: ["bodyweight"]
  },
  situps: {
    name: "Sit-ups",
    description: "A core movement involving bending your torso from a lying position to an upright seated position.",
    tips: ["Keep your feet anchored", "Use your arms for momentum if needed", "Lower with control"],
    scaling: ["AbMat sit-ups", "Anchored feet", "Crunches"],
    videoUrl: "https://www.youtube.com/watch?v=1fbU_MkV7NE",
    tags: ["bodyweight"]
  },
  airSquats: {
    name: "Air Squats",
    description: "A bodyweight squat used to build lower body strength and mobility.",
    tips: ["Keep your chest up", "Push your knees out", "Squat to full depth"],
    scaling: ["Box squats", "Partial range", "Assisted with TRX or rig"],
    videoUrl: "https://www.youtube.com/watch?v=C_VtOYc6j5c",
    tags: ["bodyweight"]
  },
  ropeclimbs: {
    name: "Rope Climbs",
    description: "A skill movement where you ascend a rope using both arms and legs.",
    tips: ["Use the J-hook or S-hook with your feet", "Pull and lock with legs", "Reach high with each pull"],
    scaling: ["Lying rope pulls", "Jumping pulls", "Rope climbs from seated position"],
    videoUrl: "https://www.youtube.com/watch?v=Pa4QUC9AvuA",
    tags: ["gymnastics", "bodyweight"]
  },
  handstandwalk: {
    name: "Handstand Walking",
    description: "An advanced gymnastic movement where you walk on your hands while maintaining balance in an inverted position.",
    tips: ["Keep your core tight", "Use fingertips to balance", "Shift weight forward with control"],
    scaling: ["Wall walks", "Handstand hold", "Box shoulder taps"],
    videoUrl: "https://www.youtube.com/watch?v=I5p2VVDupq8",
    tags: ["gymnastics", "bodyweight"]
  },
  pistolsquats: {
    name: "Pistol Squats",
    description: "A single-leg squat that requires strength, balance, and mobility.",
    tips: ["Keep your chest up", "Use your arms for balance", "Descend slowly and with control"],
    scaling: ["Box-assisted pistols", "To a target", "Lunge variations"],
    videoUrl: "https://www.youtube.com/watch?v=qDcniqddTeE",
    tags: ["bodyweight"]
  },
  ghdsitups: {
    name: "GHD Sit-ups",
    description: "A powerful core movement using a Glute-Ham Developer (GHD) to perform full-range sit-ups.",
    tips: ["Extend back with control", "Use hips for explosive return", "Avoid overextension"],
    scaling: ["Partial range of motion", "Mat sit-ups", "Reduce reps"],
    videoUrl: "https://www.youtube.com/watch?v=1pbZ8mX2D1U",
    tags: ["bodyweight"]
  },
  sledpushes: {
    name: "Sled Pushes",
    description: "A strength and conditioning exercise involving pushing a weighted sled across a distance.",
    tips: ["Keep a low body position", "Drive through your legs", "Maintain forward lean"],
    scaling: ["Lighter sled", "Shorter distance", "Bodyweight push"],
    videoUrl: "https://www.youtube.com/watch?v=QwscR2BhdEg",
    tags: ["conditioning"]
  },
  wallwalks: {
    name: "Wall Walks",
    description: "A bodyweight gymnastics movement where the athlete walks their feet up the wall while moving their hands closer to the wall in a handstand position.",
    tips: ["Start in a strong plank", "Keep your core tight", "Walk hands slowly toward the wall"],
    scaling: ["Partial range wall walks", "Hold plank position", "Walk partway up"],
    videoUrl: "https://www.youtube.com/watch?v=NK_OcHEm8yM",
    tags: ["gymnastics", "bodyweight"]
  }
};

// Movement categories that can be excluded
export const movementCategories = [
  { id: 'gymnastics', label: 'Gymnastics (Pull-ups, Muscle-ups, etc.)' },
  { id: 'weightlifting', label: 'Weightlifting (Snatch, Clean & Jerk)' },
  { id: 'barbells', label: 'Barbell Movements' },
  { id: 'kettlebells', label: 'Kettlebell Movements' },
  { id: 'dumbbells', label: 'Dumbbell Movements' },
  { id: 'running', label: 'Running' },
  { id: 'rowing', label: 'Rowing' },
  { id: 'jumping', label: 'Jumping Movements' },
  { id: 'wallballs', label: 'Wall Balls' },
  { id: 'bodyweight', label: 'Bodyweight Movements' },
  { id: 'cardio', label: 'Cardio Machines (Bike, Ski Erg)' },
];

export default movements;