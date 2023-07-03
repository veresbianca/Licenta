import { gql } from '@apollo/client';
import { userFragment } from './fragments';

export const QUERY_ME = gql`
  query me {
    me {
      ...UserInfo
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
        date
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
        plannedDates
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
          date
        }
        createdAt
        likes
        tags
      }
      friends {
        id
        username
        email
        userRole
      }
    }
  }

  ${userFragment}
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
        date
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
        date
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

export const GET_MEDIC = gql`
  query medic($type: String!) {
    medic(type: $type) {
      username
      email
    }
  }
`;

export const GET_TRAINNER = gql`
  query trainner($type: String!) {
    trainner(type: $type) {
      username
      email
    }
  }
`;

export const GET_NUTRITIONIST = gql`
  query nutritionist($type: String!) {
    nutritionist(type: $type) {
      username
      email
    }
  }
`;

export const GET_PSIHOLOGIST = gql`
  query psihologist($type: String!) {
    psihologist(type: $type) {
      username
      email
    }
  }
`;

export const GET_EXERCICES = gql`
  query exercises {
    exercises {
      name
      type
    }
  }
`;
