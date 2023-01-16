import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      id
      username
      email
      isPrivate
      weight
      height
      age
      gender
      bmi
      birthday
      country
      city
      address
      phone
      stats {
        userName
        dailySteps
        heartRate
        caloriesBurn
        protein
        fats
        carbs
        sleep
        weight
      }
      mealPlan {
        id
        name
        type
        calories
        proteins
        carbs
        fats
        photo
        unit
        value
      }
      exercisePlan {
        id
        name
        type
        calories
        distance
        time
        reps
        sets
        liftingWeight
      }
      goals {
        goalWeight
        goalCustom
        goalExercise {
          id
          name
          type
          calories
          distance
          time
          reps
          sets
          liftingWeight
        }
      }
      posts {
        id
        postAuthor
        message
        meals {
          name
          type
          calories
          proteins
          carbs
          fats
          photo
          unit
          value
        }
        createdAt
        likes
        tags
      }
    }
  }
`;

export const GET_POSTS = gql`
  query posts {
    posts {
      id
      postAuthor
      message
      likes
      exercises {
        id
        name
        type
        calories
        distance
        time
        reps
        sets
        liftingWeight
      }
      meals {
        id
        name
        type
        calories
        proteins
        carbs
        fats
        photo
        unit
        value
      }
      tags
      comments {
        commentAuthor
        message
        image
        likes
        tags
        createdAt
      }
      createdAt
      image
      usersLiked {
        id
      }
    }
  }
`;

export const GET_POST = gql`
  query post($postId: ID!) {
    post(postId: $postId) {
      id
      postAuthor
      message
      likes
      exercises {
        id
        name
        type
        calories
        distance
        time
        reps
        sets
        liftingWeight
      }
      meals {
        id
        name
        type
        calories
        proteins
        carbs
        fats
        photo
        unit
        value
      }
      tags
      comments {
        commentId
        commentAuthor
        message
        image
        likes
        tags
        createdAt
        usersLiked {
          id
          username
        }
      }
      createdAt
      image
      usersLiked {
        id
      }
    }
  }
`;

export const GET_PROF = gql`
  query profesionalist {
    profesionalist {
      name
      type
      photoSrc
    }
  }
`;
