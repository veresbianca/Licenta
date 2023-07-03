import React, { useState, useEffect, useRef } from 'react';
import PostList from '../../components/PostList';
import CreatePost from '../../components/createPost';
import { useQuery } from '@apollo/client';
import { Center, CircularProgress, Container } from '@chakra-ui/react';
import { GET_POSTS } from '../../utils/queries';

import { Grid, GridItem } from '@chakra-ui/react';

import Auth from '../../utils/auth';

export default function PostsPages() {
  const { loading, error, data } = useQuery(GET_POSTS);
  const posts = data?.posts?.slice().reverse() || [];

  console.log('postsPages')

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
        {Auth.loggedIn() && (
          <GridItem>
            <CreatePost />
          </GridItem>
        )}

        <GridItem>
          <PostList posts={posts} />
        </GridItem>
      </Grid>
    </>
  );
}
