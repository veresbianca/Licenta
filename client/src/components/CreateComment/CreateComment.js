import React from 'react';
import { Textarea, Center, Button, Box } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../../utils/mutations';

export default function CreateComment({ postId, commentAuthor }) {
  const [addComment] = useMutation(ADD_COMMENT);
  const hashtagRegExp = /#[a-z0-9_]+/g;

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: async ({ message }) => {
      const tags = message.match(hashtagRegExp);
      const newComment = await addComment({
        variables: {
          input: { postId, commentDetails: { commentAuthor, message, tags } },
        },
      });
      console.log(newComment);
      formik.values.message = '';
    },
  });

  return (
    <Center mt="50px">
      <Box
        bg={'white'}
        p={3}
        rounded={'md'}
        maxW={'50%'}
        w={'50%'}
        alignItems={'end'}
      >
        <form onSubmit={formik.handleSubmit}>
          <Textarea
            bg={'white'}
            id="message"
            name="message"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.message}
            resize={'none'}
          />
          <Center>
            <Button 
              px={8}
              bg={'green'}
              w="250px"
              mt="20px"
              color={'black'}
              rounded={'md'}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }} type="submit"
            >
              Comment
            </Button>
          </Center>
        </form>
      </Box>
    </Center>
  );
}
