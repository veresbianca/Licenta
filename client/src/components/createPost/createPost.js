import React, { useState } from 'react';
import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  Grid,
  GridItem,
  Stack,
  FormControl,
  FormLabel,
  Textarea,
  Button,
  Center,
  Input,
  ListItem,
  IconButton,
  CircularProgress,
  List,
  Accordion,
  AccordionPanel,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  Container,
} from '@chakra-ui/react';
import { searchFood, searchExercise } from '../../utils/API';
import { FaPlus, FaCheck } from 'react-icons/fa';
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import { ADD_POST } from '../../utils/mutations';
import { GET_POSTS } from '../../utils/queries';

export default function Component({ postUpdate }) {
  const user = Auth.loggedIn() ? Auth.getProfile() : null;
  const [newPost, newPostMutation] = useMutation(ADD_POST);

  const [exercise, setExercise] = useState(false);
  const [cardio, setCardio] = useState(false);
  const [meal, setMeal] = useState(false);

  const [lift, setLift] = useState('');
  const [weight, setWeight] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [cardiotype, setCardiotype] = useState('');
  const [time, setTime] = useState('');
  const [distance, setDistance] = useState('');

  const renderExercise = () => {
    if (exercise) {
      return (
        <Box as={'form'} mt={0}>
          <Stack spacing={4}>
            <Input
              placeholder="Lift(Bench,Pullups,etc.)"
              bg={'gray.100'}
              border={0}
              color={'gray.500'}
              _placeholder={{
                color: 'gray.500',
              }}
              value={lift}
              onChange={handleLiftchange}
            />
            <Input
              placeholder="Weight"
              bg={'gray.100'}
              border={0}
              color={'gray.500'}
              _placeholder={{
                color: 'gray.500',
              }}
              value={weight}
              onChange={handleWeightchange}
            />
            <Input
              placeholder="Sets"
              bg={'gray.100'}
              border={0}
              color={'gray.500'}
              _placeholder={{
                color: 'gray.500',
              }}
              value={sets}
              onChange={handleSetchange}
            />
            <Input
              placeholder="Reps"
              bg={'gray.100'}
              border={0}
              color={'gray.500'}
              _placeholder={{
                color: 'gray.500',
              }}
              value={reps}
              onChange={handleRepchange}
            />
          </Stack>
          <Button
            fontFamily={'heading'}
            mt={8}
            w={'full'}
            bg="darkgreen"
            color={'white'}
            _hover={{
              bg: 'lightgreen',
              boxShadow: 'xl',
            }}
            onClick={() => queryExercise()}
          >
            Add Lift
          </Button>
          {liftResults === 'loading' ? (
            <CircularProgress isIndeterminate />
          ) : liftResults === 'done' ? (
            <List textAlign={'left'} spacing={3}>
              {liftData.lifts.map((lift, index) => (
                <ExerciseResult lift={lift} index={index} />
              ))}
            </List>
          ) : null}
        </Box>
      );
    } else {
    }
  };
  const handleLiftchange = event => {
    const { value } = event.target;
    setLift(value);
  };

  const handleWeightchange = event => {
    const { value } = event.target;
    setWeight(value);
  };

  const handleSetchange = event => {
    const { value } = event.target;
    setSets(value);
  };

  const handleRepchange = event => {
    const { value } = event.target;
    setReps(value);
  };
  const handleExercise = () => {
    if (exercise === false) {
      setExercise(true);
      renderExercise();
    } else {
      setExercise(false);
      renderExercise();
    }
  };
  const handleCardiochange = event => {
    const { value } = event.target;
    setCardiotype(value);
  };

  const handleTime = event => {
    const { value } = event.target;
    setTime(value);
  };

  const handleDistance = event => {
    const { value } = event.target;
    setDistance(value);
  };

  const renderCardio = () => {
    if (cardio) {
      return (
        <Box as={'form'} mt={10}>
          <Stack spacing={4}>
            <Input
              placeholder="Cardio(Running,Swimming,etc.)"
              bg={'gray.100'}
              border={0}
              color={'gray.500'}
              _placeholder={{
                color: 'gray.500',
              }}
              onChange={handleCardiochange}
            />
            <Input
              placeholder="Distance (km)"
              bg={'gray.100'}
              border={0}
              color={'gray.500'}
              _placeholder={{
                color: 'gray.500',
              }}
              onChange={handleDistance}
            />
            <Input
              placeholder="Time (minutes)"
              bg={'gray.100'}
              border={0}
              color={'gray.500'}
              _placeholder={{
                color: 'gray.500',
              }}
              onChange={handleTime}
            />
          </Stack>
          <Button
            fontFamily={'heading'}
            mt={8}
            w={'full'}
            bg="darkgreen"
            color={'white'}
            _hover={{
              bg: 'lightgreen',
              boxShadow: 'xl',
            }}
            onClick={() => searchCardio()}
          >
            Add Cardio
          </Button>
          {cardioResults === 'loading' ? (
            <CircularProgress isIndeterminate />
          ) : cardioResults === 'done' ? (
            <List textAlign={'left'} spacing={3}>
              {cardioData.cardios.map((cardio, index) => (
                <CardioResult cardio={cardio} index={index} />
              ))}
            </List>
          ) : null}
        </Box>
      );
    }
  };

  const [liftResults, setLiftresults] = useState(null);
  const [liftData, setLiftdata] = useState(null);
  const [liftSearch, setLiftsearch] = useState('');

  const queryExercise = async () => {
    setLiftsearch(lift + ' ' + weight + ' ' + sets + ' sets ' + reps + ' reps');
    // console.log(lift + ' ' + weight +'lbs ' + sets + ' sets ' + reps + ' reps')
    const response = await searchExercise(
      lift + ' ' + weight + 'lbs ' + sets + ' sets ' + reps + ' reps',
      user
    );
    setLiftdata(await response.json());
    console.log(response.json);
  };

  const ExerciseResult = ({ lifts, index }) => {
    const [liftadded, setLiftadded] = useState(false);
    const addLiftresult = result => {
      console.log(result);
      setLiftadded(prev => !prev);
    };
    return (
      <Box>
        <ListItem key={index}>
          <IconButton
            size="xs"
            mr={2}
            icon={liftadded ? <FaCheck /> : <FaPlus />}
            color={liftadded ? 'darkgreen' : 'gray'}
            bg={liftadded ? 'green' : 'white'}
            onClick={() => addLiftresult(lifts)}
          />
          {lifts.lift_name}
        </ListItem>
      </Box>
    );
  };

  const [cardioResults, setCardioresults] = useState(null);
  const [cardioData, setCardiodata] = useState(null);
  const [cardioSearch, setCardiosearch] = useState('');

  const searchCardio = async () => {
    setCardiosearch(cardiotype + ' for ' + time + ' ' + distance + ' ');
    const response = await searchExercise(
      cardiotype + ' ' + distance + ' for ' + time,
      user
    );
    setCardiodata(await response.json());
    console.log(response.json);
  };
  const CardioResult = ({ cardios, index }) => {
    const [cardioadded, setCardioadded] = useState(false);
    const addCardioresult = result => {
      console.log(result);
      setCardioadded(prev => !prev);
    };
    return (
      <Box>
        <ListItem key={index}>
          <IconButton
            size="xs"
            mr={2}
            icon={cardioadded ? <FaCheck /> : <FaPlus />}
            color={cardioadded ? 'darkgreen' : 'gray'}
            bg={cardioadded ? 'green' : 'white'}
            onClick={() => addCardioresult(cardios)}
          />
          {cardios.cardio_name}
        </ListItem>
      </Box>
    );
  };

  const handleCardio = () => {
    if (cardio === false) {
      setCardio(true);
      renderCardio();
    } else {
      setCardio(false);
      renderCardio();
    }
  };
  const [results, setResults] = useState(null);
  const [data, setData] = useState(null);
  const [search, setSearch] = useState('');
  const handleChange = event => {
    const { name, value } = event.target;

    if (name === 'query') {
      setSearch(value);
    }
  };

  const searchNutrition = async values => {
    // event.preventDefault();
    if (values == null) {
      return;
    }
    setResults('loading');
    const response = await searchFood(values);
    setData(await response.json());
    setResults('done');
  };

  //Formik Nutritioniix functions
  const SearchResult = ({ food, index }) => {
    const [added, setAdded] = useState(false);
    const addResult = result => {
      console.log(result);
      setAdded(prev => !prev);
    };
    return (
      <Box>
        <ListItem key={index}>
          <IconButton
            size="xs"
            mr={2}
            icon={added ? <FaCheck /> : <FaPlus />}
            color={added ? 'darkgreen' : 'gray'}
            bg={added ? 'green' : 'white'}
            onClick={() => addResult(food)}
          />
          {food.food_name}
        </ListItem>
      </Box>
    );
  };
  const renderMeal = () => {
    if (meal) {
      return (
        <>
          <Center py={6}>
            <Stack spacing={4}>
              <Box>
                <Input
                  id="query"
                  name="query"
                  type="query"
                  value={search}
                  onChange={handleChange}
                />
                <Button
                  bg={'darkgreen'}
                  color={'white'}
                  my={6}
                  onClick={() => searchNutrition(search)}
                  _hover={{
                    bg: 'lightgreen',
                    boxShadow: 'xl',
                  }}
                >
                  Search Food
                </Button>
              </Box>

              {results === 'loading' ? (
                <CircularProgress isIndeterminate />
              ) : results === 'done' ? (
                <List textAlign={'left'} spacing={3}>
                  {data.foods.map((food, index) => (
                    <SearchResult key={index} food={food} index={index} />
                  ))}
                </List>
              ) : null}
            </Stack>
          </Center>
        </>
      );
    } else {
    }
  };
  const handleMeal = () => {
    if (meal === false) {
      setMeal(true);
      renderMeal();
    } else {
      setMeal(false);
      renderMeal();
    }
  };
  const [postdata, setPostdata] = useState('');
  const textChange = event => {
    const { value } = event.target;
    setPostdata(value);
  };
  const addPost = async text => {
    const newExercises = [];
    const hashtagRegExp = /#[a-z0-9_]+/g;
    const tags = text.match(hashtagRegExp);
    let cardio;
    let weightLift;
    let newMeals;

    if (cardioData) {
      cardio = {
        name: cardiotype,
        type: 'Cardio',
        distance: distance,
        time: time,
        calories: cardioData?.exercises[0]?.nf_calories,
      };

      newExercises.push(cardio);
    }

    if (liftData) {
      weightLift = {
        name: lift,
        type: 'Strength',
        liftingWeight: weight,
        sets: sets,
        reps: reps,
        calories: liftData.exercises[0].nf_calories,
      };

      newExercises.push(weightLift);
    }

    if (data) {
      newMeals = data.foods.map(food => {
        return {
          name: food.food_name,
          calories: food.nf_calories,
          fats: food.nf_total_fat,
          carbs: food.nf_total_carbohydrate,
          proteins: food.nf_protein,
        };
      });
    }

    const createPost = await newPost({
      variables: {
        input: {
          postAuthor: user.data.username,
          message: text,
          exercises: newExercises,
          meals: newMeals,
          tags: tags,
        },
      },
      refetchQueries: [{ query: GET_POSTS }, 'posts'],
    });
  };

  return (
    <Container display="grid" gap="20px" maxW={'5xl'} py={12}>
      <Box
        bg={useColorModeValue('gray.50', 'inherit')}
        p={6}
        alignItems="center"
      >
        <Box alignItems="center">
          <Grid
            display={{ base: 'initial', md: 'grid' }}
            columns={{ md: 4 }}
            spacing={{ md: 4 }}
            mt={0}
            align="center"
          >
            <GridItem mt={[0, null, 0]} colSpan={4}>
              <chakra.form
                method="POST"
                shadow="base"
                rounded={[null, 'md']}
                overflow={{ sm: 'hidden' }}
                alignItems="center"
                onSubmit={e => {
                  e.preventDefault();
                  return addPost(postdata);
                }}
              >
                <Stack
                  px={4}
                  py={5}
                  bg={useColorModeValue('white', 'gray.700')}
                  align="stretch"
                >
                  <FormControl id="email" mt={1}>
                    <FormLabel
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue('gray.700', 'gray.50')}
                    >
                      Scrie o postare!
                    </FormLabel>
                  </FormControl>
                  <Accordion allowMultiple allowToggle>
                    <FormControl id="createpost" mt={1}>
                      <Textarea
                        mt={1}
                        rows={3}
                        shadow="sm"
                        focusBorderColor="brand.400"
                        fontSize={{ sm: 'sm' }}
                        onChange={textChange}
                      />
                    </FormControl>
                  </Accordion>
                </Stack>
                <FormControl>
                  <Center pb="2">
                    <Button
                      px={8}
                      bg={'green'}
                      w="250px"
                      top="25px"
                      color={'black'}
                      rounded={'md'}
                      _hover={{
                        transform: 'translateY(-2px)',
                        boxShadow: 'lg',
                      }}
                      type="submit"
                    >
                      Posteaza
                    </Button>
                  </Center>
                </FormControl>
                <Box
                  px={{ base: 4, sm: 6 }}
                  py={3}
                  bg={useColorModeValue('gray.50', 'gray.900')}
                  textAlign="right"
                >
                  <Button
                    type="button"
                    colorScheme="brand"
                    _focus={{ shadow: '' }}
                    fontWeight="md"
                  >
                    Save
                  </Button>
                </Box>
              </chakra.form>
            </GridItem>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
