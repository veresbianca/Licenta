export default function ProgressCalendar() {
  return (
    <Stack>
      <Heading size="md">Weekly Progress</Heading>
      <SimpleGrid gridTemplateColumns="repeat(7,1fr)">
        {dayOfWeek.map((day, index) => {
          return (
            <Box>
              <Text
                borderBottom="1px solid"
                textAlign={'center'}
                padding="20px"
              >
                {day}
              </Text>
              <Text textAlign={'center'}>Number</Text>
            </Box>
          );
        })}
      </SimpleGrid>
    </Stack>
  );
}
