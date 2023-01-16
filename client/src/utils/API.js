export const searchFood = async (query, timezone) => {
  return await fetch(`https://trackapi.nutritionix.com/v2/natural/nutrients/`, {
    method: 'POST',
    body: JSON.stringify({
      query,
      timezone,
    }),
    headers: {
      'Content-Type': 'application/json',
      'x-app-id': '0afafc41',
      'x-app-key': '94e49a78268303375e4e639ab878c9d1',
    },
  });
};

export const searchExercise = async (query, user) => {
  return await fetch(`https://trackapi.nutritionix.com/v2/natural/exercise`, {
    method: 'POST',
    body: JSON.stringify({
      query,
      gender: user?.gender,
      weight_kg: user?.weight,
      height_cm: user?.height,
      age: user?.age,
    }),
    headers: {
      'Content-Type': 'application/json',
      'x-app-id': '0afafc41',
      'x-app-key': '94e49a78268303375e4e639ab878c9d1',
    },
  });
};
