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
import MealPlanForClientsListing from '../MealPlanForClientsListing'
import { useLocation } from "react-router-dom";

import nutritionBanner from '../../assets/images/nutrition-baner.jpg';
import { useParams } from 'react-router-dom';

export default function Component(props) {
  const user = Auth.loggedIn() ? Auth.getProfile() : null;
  const [newMeal] = useMutation(ADD_MEAL);
  const [mealTypeValue, setMealTypeValue] = useState('');
  const [unit, setUnit] = useState('');
  const [valueMeal, setValueMeal] = useState(0);
  const [mealDate, setMealDate] = useState();
  const [meal, setMeal] = useState(false);
  const [results, setResults] = useState(null);
  const [data, setData] = useState(null);
  const [search, setSearch] = useState('');
  const [addMealBtnDisabled, setAddMealBtnDisabled] = useState(true);
  const { userId } = useParams();

  const valueMealChange = event => {
    const { value } = event.target;
    setValueMeal(parseInt(value));
  };

  const dateMealOnChange = event => {
    const { value } = event.target;
    console.log(value);
    setMealDate(value);
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
        <Stack
              bg="white"
              border={'1px solid transparent'}
              borderRadius={'8px'}
              boxShadow={'0px 0px 10px -2px #ACACAC'}
              padding="20px"
            >
             <FormControl as="fieldset" margin="20px 0">
            <Heading size="md" className="sub-heading" mb="20px">
              Alege tipul de masa
            </Heading>

            <RadioGroup onChange={setMealTypeValue} value={mealTypeValue}>
              <Stack spacing="24px" direction="row">
                <Radio name="mealType" value="breakfast">
                  Mic dejun
                </Radio>
                <Radio name="mealType" value="snack">
                  Gustare
                </Radio>
                <Radio name="mealType" value="lunch">
                  Pranz
                </Radio>
                <Radio name="mealType" value="dinner">
                  Cina
                </Radio>
              </Stack>
            </RadioGroup>
          </FormControl>

          <FormControl as="fieldset" margin="20px 0">
            <Heading size="md" className="sub-heading" mb="20px">
              Alege unitatea de masura
            </Heading>

            <RadioGroup onChange={setUnit} value={unit}>
              <Stack spacing="24px" direction="column">
                <Radio name="unit" value="large">
                  Portie mare
                </Radio>
                <Radio name="unit" value="medium">
                  Portie medie
                </Radio>
                <Radio name="unit" value="small">
                  Portie mica
                </Radio>
                <Radio name="unit" value="oz">
                  Oz
                </Radio>
                <Radio name="unit" value="litre">
                  Litrii
                </Radio>
                <Radio name="unit" value="g">
                  Grame
                </Radio>
              </Stack>
            </RadioGroup>
          </FormControl>

          <FormControl margin="20px 0">
            <Heading size="md" className="sub-heading" mb="20px">
              Valoare numerica
            </Heading>

            <Input
              id="valuePerMeal"
              name="valuePerMeal"
              type="valuePerMeal"
              onChange={valueMealChange}
            />
          </FormControl>

          <FormControl margin="20px 0">
            <Heading size="md" className="sub-heading" mb="20px">
              Data
            </Heading>

            <Input
              id="date"
              name="date"
              type="date"
              onChange={dateMealOnChange}
            />
          </FormControl>

          <FormControl margin="20px 0">
           
            <Heading size="md" className="sub-heading" mb="20px">
              Cauta alimente in baza de date
            </Heading>

            <Input
              id="query"
              name="query"
              type="query"
              value={search}
              onChange={handleChange}
            />
          </FormControl>

          <Center>
            <Button
              onClick={() => searchNutrition(search)}
              children="Cauta"
              bg={'green'}
              w="250px"
              mt="25px"
              color={'black'}
              rounded={'md'}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
            ></Button>
          </Center>

          {results === 'loading' ? (
            <CircularProgress isIndeterminate />
          ) : results === 'done' ? (
            <>
              {data.foods.map((food, index) => (
                <SearchResult key={index} food={food} index={index} />
              ))}
            </>
          ) : null}

          <Center>
            <Button
              type="submit"
              children="Adauga la planul alimentar"
              disabled={addMealBtnDisabled}
              bg={'green'}
              w="250px"
              mt="25px"
              color={'black'}
              rounded={'md'}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
            ></Button>
          </Center>
          
        </Stack>

        {userId ? (
          <MealPlanForClientsListing></MealPlanForClientsListing>
        ) : <MealPlan></MealPlan>}
      </>
      );
      
  };


  const addMeal = async (type, unit, value, date) => {
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
        userId: userId ? userId : '123',
        name: newMeals[0].name,
        type: type,
        unit: unit,
        value: value,
        date: date,
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
      <Box display="flex" bg="gray.100">
        <Container display="grid" gap="20px" maxW={'5xl'} py={12}>
          <SimpleGrid>
          <chakra.form
            method="POST"
            onSubmit={e => {
              e.preventDefault();
              return addMeal(mealTypeValue, unit, valueMeal, mealDate);
            }}
          >
              <Heading size="lg" mb="40px" align="center">
                Cauta alimente pentru a ale adauga in planul tau alimentar!
              </Heading>

            {renderMeal()}
          </chakra.form>
        </SimpleGrid>
        </Container>
      </Box>
    </>
  );
}
