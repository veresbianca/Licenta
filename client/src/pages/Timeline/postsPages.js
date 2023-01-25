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
      <Grid
        gap={1}
        templateRows="repeat(2, auto 1fr)"
        templateColumns="repeat(5, 1fr)"
        bg="lightgrey"
      >
        {Auth.loggedIn() && (
          <GridItem row span={1} colSpan={4}>
            <CreatePost />
          </GridItem>
        )}

        <GridItem row span={1} colSpan={4}>
          <PostList posts={posts} />
        </GridItem>
      </Grid>
    </>
  );
}
