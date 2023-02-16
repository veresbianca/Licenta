import { gql } from '@apollo/client';
import { userFragment } from './fragments';

// validate user and return user info
export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        username
        email
        isPrivate
        weight
        birthday
        country
        city
        address
        phone
        height
        age
        gender
      }
    }
  }
`;

export const REMOVE_USER = gql`
  mutation removeUser($username: String!) {
    removeUser(username: $username) {
      user {
        id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $password: String!
    $email: String!
    $isPrivate: Boolean
    $weight: Int
    $height: Int
    $age: Int
    $gender: String
    $birthday: Date
    $country: String
    $city: String
    $address: String
    $phone: String
  ) {
    addUser(
      username: $username
      password: $password
      email: $email
      isPrivate: $isPrivate
      weight: $weight
      height: $height
      age: $age
      gender: $gender
      birthday: $birthday
      country: $country
      city: $city
      address: $address
      phone: $phone
    ) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $username: String!
    $email: String!
    $isPrivate: Boolean
    $weight: Int
    $height: Int
    $age: Int
    $gender: String
    $bmi: Float
    $birthday: Date
    $country: String
    $city: String
    $address: String
    $phone: String
  ) {
    updateUser(
      username: $username
      email: $email
      isPrivate: $isPrivate
      weight: $weight
      height: $height
      age: $age
      gender: $gender
      bmi: $bmi
      birthday: $birthday
      country: $country
      city: $city
      address: $address
      phone: $phone
    ) {
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
    }
  }
`;

export const ADD_MEAL = gql`
  mutation addMeal(
    $mealAuthor: String
    $name: String!
    $type: [String]
    $calories: Float
    $proteins: Float
    $carbs: Float
    $fats: Float
    $photo: String
    $unit: String
    $value: Float
  ) {
    addMeal(
      mealAuthor: $mealAuthor
      name: $name
      type: $type
      calories: $calories
      proteins: $proteins
      carbs: $carbs
      fats: $fats
      photo: $photo
      unit: $unit
      value: $value
    ) {
      id
      mealAuthor
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
  }
`;

export const ADD_EXERCISE = gql`
  mutation addExercise(
    $name: String!
    $type: [String]
    $calories: Float
    $distance: Float
    $time: String
    $reps: Int
    $sets: Int
    $liftingWeight: Int
    $plannedDates: [Date]
    $new: Boolean
  ) {
    addExercise(
      name: $name
      type: $type
      calories: $calories
      distance: $distance
      time: $time
      reps: $reps
      sets: $sets
      liftingWeight: $liftingWeight
      plannedDates: $plannedDates
      new: $new
    ) {
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
  }
`;

export const ADD_GOAL = gql`
  mutation addGoal($input: goalInput) {
    addGoal(input: $input) {
      id
      username
      goals
    }
  }
`;

export const ADD_POST = gql`
  mutation addPOST($input: postInput!) {
    addPost(input: $input) {
      id
      postAuthor
      message
      exercises {
        id
        name
        type
        distance
        time
        liftingWeight
        sets
        reps
        calories
      }
      meals {
        id
        name
        type
        calories
        fats
        carbs
        proteins
        photo
        unit
        value
      }
      tags
      createdAt
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($input: commentInput!) {
    addComment(input: $input) {
      id
      message
      comments {
        commentId
        commentAuthor
        message
        createdAt
        tags
        likes
      }
    }
  }
`;

export const UPDATE_LIKES = gql`
  mutation updateLikes($postId: ID!) {
    updateLikes(postId: $postId) {
      likes
    }
  }
`;

export const UPDATE_EXERCISE_FROM_ROUTINE = gql`
  mutation updateExercise(
    $id: ID!
    $name: String!
    $type: [String]
    $calories: Float
    $distance: Float
    $time: String
    $reps: Int
    $sets: Int
    $liftingWeight: Int
  ) {
    updateExercise(
      id: $id
      name: $name
      type: $type
      calories: $calories
      distance: $distance
      time: $time
      reps: $reps
      sets: $sets
      liftingWeight: $liftingWeight
    ) {
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
`;

export const UPDATE_COMMENT_LIKES = gql`
  mutation updateCommentLikes($postId: ID!, $commentId: ID!) {
    updateCommentLikes(postId: $postId, commentId: $commentId) {
      comments {
        commentId
        likes
        usersLiked {
          username
        }
      }
    }
  }
`;

export const REMOVE_EXERCISE_FROM_ROUTINE = gql`
  mutation removeExercise($id: ID!) {
    removeExercise(id: $id) {
      id
      name
      type
    }
  }
`;

export const CREATE_SUBSCRIPTION = gql`
  mutation createSubscription(
    $source: String
    $ccLast4: String
    $type: String
  ) {
    createSubscription(source: $source, ccLast4: $ccLast4, type: $type) {
      ...UserInfo
    }
  }

  ${userFragment}
`;

export const CHANGE_CREDIT_CARD = gql`
  mutation changeCreditCard($source: String, $ccLast4: String) {
    changeCreditCard(source: $source, ccLast4: $ccLast4) {
      ...UserInfo
    }
  }

  ${userFragment}
`;

export const CANCEL_SUBSCRIPTION = gql`
  mutation cancelSubscription {
    cancelSubscription {
      ...UserInfo
    }
  }

  ${userFragment}
`;
