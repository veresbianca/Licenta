import React, { useState } from 'react';
import {
  FormControl,
  chakra,
  Box,
  Container,
  Heading,
  SimpleGrid,
  Stack,
  Button,
  Center,
  Input,
  IconButton,
  CircularProgress,
  Image,
  RadioGroup,
  Radio,
} from '@chakra-ui/react';

import { searchFood } from '../../utils/API';
import { FaPlus, FaCheck } from 'react-icons/fa';
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import { ADD_MEAL } from '../../utils/mutations';
import MealPlan from '../MealPlan';

import nutritionBanner from '../../assets/images/nutrition-baner.jpg';

export default function Component() {
  const user = Auth.loggedIn() ? Auth.getProfile() : null;
  const [newMeal] = useMutation(ADD_MEAL);
  const [mealTypeValue, setMealTypeValue] = useState('');
  const [unit, setUnit] = useState('');
  const [valueMeal, setValueMeal] = useState(0);
  const [meal, setMeal] = useState(false);
  const [results, setResults] = useState(null);
  const [data, setData] = useState(null);
  const [search, setSearch] = useState('');
  const [addMealBtnDisabled, setAddMealBtnDisabled] = useState(true);

  const valueMealChange = event => {
    const { value } = event.target;
    setValueMeal(parseInt(value));
  };

  const handleChange = event => {
    const { name, value } = event.target;

    if (name === 'query') {
      setSearch(value);
    }
  };

  const searchNutrition = async values => {
    setResults('loading');
    const response = await searchFood(values);
    setData(await response.json());
    setResults('done');
    setAddMealBtnDisabled(false);
  };

  const SearchResult = ({ food, index }) => {
    const [added, setAdded] = useState(false);
    const addResult = result => {
      setAdded(prev => !prev);
    };

    return (
      <Box>
        <IconButton
          size="xs"
          mr={2}
          icon={added ? <FaCheck /> : <FaPlus />}
          color={added ? 'darkgreen' : 'gray'}
          bg={added ? 'green' : 'white'}
          onClick={() => addResult(food)}
        />
        {food.food_name}

        <Image src={food.photo.thumb} />
      </Box>
    );
  };

  const renderMeal = () => {
    return (
      <>
        <FormControl as="fieldset" margin="20px 0">
          <Heading size="md" children="Choose meal type" mb="20px" />

          <RadioGroup onChange={setMealTypeValue} value={mealTypeValue}>
            <Stack spacing="24px" direction="row">
              <Radio name="mealType" value="breakfast">
                Breakfast
              </Radio>
              <Radio name="mealType" value="snack">
                Snack
              </Radio>
              <Radio name="mealType" value="lunch">
                Lunch
              </Radio>
              <Radio name="mealType" value="dinner">
                Dinner
              </Radio>
            </Stack>
          </RadioGroup>
        </FormControl>

        <FormControl as="fieldset" margin="20px 0">
          <Heading size="md" children="Choose unit" mb="20px" />

          <RadioGroup onChange={setUnit} value={unit}>
            <Stack spacing="24px" direction="column">
              <Radio name="unit" value="large">
                large portion
              </Radio>
              <Radio name="unit" value="medium">
                medium portion
              </Radio>
              <Radio name="unit" value="small">
                small portion
              </Radio>
              <Radio name="unit" value="oz">
                Oz
              </Radio>
              <Radio name="unit" value="litre">
                Litres
              </Radio>
              <Radio name="unit" value="g">
                Grams
              </Radio>
            </Stack>
          </RadioGroup>
        </FormControl>

        <FormControl margin="20px 0">
          <Heading size="md" children="Value" mb="20px" />
          <Input
            id="valuePerMeal"
            name="valuePerMeal"
            type="valuePerMeal"
            onChange={valueMealChange}
          />
        </FormControl>

        <FormControl margin="20px 0">
          <Heading
            size="md"
            children="Cauta alimente in baza de date"
            mb="20px"
          />
          <Input
            id="query"
            name="query"
            type="query"
            value={search}
            onChange={handleChange}
          />
        </FormControl>

        <Button
          my={6}
          onClick={() => searchNutrition(search)}
          children="Search Food"
        ></Button>

        {results === 'loading' ? (
          <CircularProgress isIndeterminate />
        ) : results === 'done' ? (
          <>
            {data.foods.map((food, index) => (
              <SearchResult key={index} food={food} index={index} />
            ))}
          </>
        ) : null}

        <Box>
          <Button
            type="submit"
            my={6}
            children="Add Meal"
            disabled={addMealBtnDisabled}
          ></Button>
        </Box>

        <MealPlan></MealPlan>
      </>
    );
  };

  const addMeal = async (type, unit, value) => {
    let newMeals;

    if (meal === false) {
      setMeal(true);
      renderMeal();
    } else {
      setMeal(false);
      renderMeal();
    }

    if (data) {
      newMeals = data.foods.map(food => {
        return {
          name: food.food_name,
          calories: food.nf_calories,
          fats: food.nf_total_fat,
          carbs: food.nf_total_carbohydrate,
          proteins: food.nf_protein,
          photo: food.photo.thumb,
        };
      });
    }

    await newMeal({
      variables: {
        name: newMeals[0].name,
        type: type,
        unit: unit,
        value: value,
        mealAuthor: user.data.username,
        calories: newMeals[0].calories,
        proteins: newMeals[0].proteins,
        carbs: newMeals[0].carbs,
        fats: newMeals[0].fats,
        photo: newMeals[0].photo,
      },
    });
  };

  return (
    <>
      <Image src={nutritionBanner} width="100%" />
      <Container maxW={'5xl'} py={12}>
        <SimpleGrid>
          <chakra.form
            method="POST"
            onSubmit={e => {
              e.preventDefault();
              return addMeal(mealTypeValue, unit, valueMeal);
            }}
          >
            <Center>
              <Heading size="lg">
                Search for food to add to your meal plan!
              </Heading>
            </Center>

            {renderMeal()}
          </chakra.form>
        </SimpleGrid>
      </Container>
    </>
  );
}
