import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  HStack,
  Container,
  Radio, 
  RadioGroup,
  Button
} from "@chakra-ui/react";
import "./exemptions.css";
function HouseRentAllowance() {
  return (
    <div>
      <Container className="container">
      <span className="heading">House Rent Allowance Exemption Calculator</span>
        <FormControl isRequired className="column-input">
          <HStack>
            <FormLabel>Basic Salary:</FormLabel>
            <Input width="25%" type="number" />
          </HStack>
        </FormControl>

        <FormControl className="column-input">
          <HStack>
            <FormLabel>DA Received:</FormLabel>
            <Input width="25%" type="number" />
          </HStack>
        </FormControl>

        <FormControl isRequired className="column-input">
          <HStack>
            <FormLabel>HRA Received:</FormLabel>
            <Input width="25%" type="number" />
          </HStack>
        </FormControl>

        <FormControl isRequired className="column-input">
          <HStack>
            <FormLabel>House Rent Paid:</FormLabel>
            <Input width="25%" type="number" />
          </HStack>
        </FormControl>

        <RadioGroup className="column-input" defaultValue="1">
          <HStack>
          <FormLabel>Living in Delhi, Mumbai, Kolkata or Chennai?</FormLabel>
            <Radio colorScheme="green" value="1">
             Yes
            </Radio>
            <Radio colorScheme="red" value="2">
              No
            </Radio>
          </HStack>
        </RadioGroup>

        <Button className="button" colorScheme='blue'>Calculate</Button>

      </Container>
    </div>
  );
}

export default HouseRentAllowance;
