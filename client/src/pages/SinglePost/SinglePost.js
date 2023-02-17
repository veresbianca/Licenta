import React from 'react';
import {
  Grid,
  GridItem,
  Center,
  CircularProgress,
  Container,
  Link,
  Box,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_POST } from '../../utils/queries';
import Auth from '../../utils/auth';
import Post from '../../components/Post';
import CreateComment from '../../components/CreateComment';
import Comment from '../../components/Comment';

export default function SinglePost() {
  const { postId } = useParams();
  let username = null;

  if (Auth.loggedIn()) {
    username = Auth.getProfile().data.username;
  }

  const { loading, data } = useQuery(GET_POST, {
    variables: { postId: postId },
  });

  const {
    id,
    postAuthor,
    message,
    likes,
    exercises,
    meals,
    tags,
    comments,
    createdAt,
    image,
    usersLiked,
  } = data?.post || {};

  if (loading) {
    return (
      <Container h={'73vh'}>
        <Center>
          <CircularProgress isIndeterminate />
        </Center>
      </Container>
    );
  }

  return (
    <>
      <Grid gap={1} bg="lightgrey">
        <GridItem row span={1} colSpan={4}>
          <Box display="flex" bg="gray.100">
            <Container display="grid" gap="20px" maxW={'5xl'} py={12}>
              <Link as={RouterLink} to="/posts" fontWeight="bold">
                {'<'} Înapoi la postări
              </Link>
            </Container>
          </Box>

          <Post
            key={id}
            postId={id}
            postAuthor={postAuthor}
            message={message}
            likes={likes}
            exercises={exercises}
            meals={meals}
            tags={tags}
            comments={comments}
            createdAt={createdAt}
            image={image}
            usersLiked={usersLiked}
          />
          {username && (
            <CreateComment postId={postId} commentAuthor={username} />
          )}
          {comments
            .slice()
            .reverse()
            .map(comment => {
              return (
                <Comment
                  key={comment.commentId}
                  comment={comment}
                  postId={postId}
                />
              );
            })}
        </GridItem>
      </Grid>
    </>
  );
}
