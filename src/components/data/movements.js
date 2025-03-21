// Movement information database with details and scaling options
const movements = {
  pullups: {
    name: "Pull-ups",
    description: "A pull-up is an upper-body strength exercise where you hang from a bar and pull yourself up until your chin is above the bar.",
    tips: ["Keep your core tight", "Pull your shoulder blades down and back", "Try to lead with your chest"],
    scaling: ["Ring rows", "Jumping pull-ups", "Banded pull-ups"],
    videoUrl: "/api/placeholder/450/250"
  },
  thrusters: {
    name: "Thrusters",
    description: "A thruster combines a front squat with a push press in one fluid movement.",
    tips: ["Keep your elbows high in the front rack", "Maintain a full grip on the bar", "Drive through your heels"],
    scaling: ["Lighter weight", "Dumbbell thrusters", "No weight, just body movement"],
    videoUrl: "/api/placeholder/450/250"
  },
  burpees: {
    name: "Burpees",
    description: "A full-body exercise that combines a squat, push-up, and jump.",
    tips: ["Keep your core engaged throughout", "Scale to your fitness level", "Focus on consistent pace rather than speed"],
    scaling: ["Step back instead of jumping", "No push-up", "No jump at the top"],
    videoUrl: "/api/placeholder/450/250"
  },
  wallballs: {
    name: "Wall Balls",
    description: "A compound movement where you perform a squat with a medicine ball and then throw it to a target on the wall.",
    tips: ["Keep your chest up", "Use your legs to generate power", "Aim for the center of the target"],
    scaling: ["Lighter ball", "Lower target", "Squat to a box for depth"],
    videoUrl: "/api/placeholder/450/250"
  },
  kettlebellswings: {
    name: "Kettlebell Swings",
    description: "A dynamic exercise where you swing a kettlebell from between your legs to shoulder height using hip drive.",
    tips: ["Hinge at the hips, not squat", "Keep your back flat", "Squeeze your glutes at the top"],
    scaling: ["Lighter weight", "Russian swing (eye level) vs American (overhead)", "Two-handed vs one-handed"],
    videoUrl: "/api/placeholder/450/250"
  },
  boxjumps: {
    name: "Box Jumps",
    description: "An explosive exercise where you jump from the ground onto a raised platform.",
    tips: ["Land softly with knees slightly bent", "Stand fully at the top", "Step down instead of jumping down to preserve your joints"],
    scaling: ["Lower box height", "Step-ups", "Box step-overs"],
    videoUrl: "/api/placeholder/450/250"
  },
  deadlifts: {
    name: "Deadlifts",
    description: "A weight training exercise where you lift a loaded barbell from the ground to hip level.",
    tips: ["Keep your back flat", "Push through your heels", "Bar should stay close to your body"],
    scaling: ["Lighter weight", "Sumo stance", "Kettlebell or dumbbell deadlift"],
    videoUrl: "/api/placeholder/450/250"
  },
  rowing: {
    name: "Rowing",
    description: "A full-body cardio exercise performed on a rowing machine.",
    tips: ["Legs-core-arms for the pull, arms-core-legs for the return", "Don't rush the return", "Set damper according to your fitness level"],
    scaling: ["Lower damper setting", "Reduced distance", "Alternate with another movement"],
    videoUrl: "/api/placeholder/450/250"
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