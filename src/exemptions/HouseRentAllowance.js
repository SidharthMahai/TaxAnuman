import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  HStack,
  Container,
  Radio,
  RadioGroup,
  Button,
} from "@chakra-ui/react";
import "./exemptions.css";
import React, { useState } from "react";
function HouseRentAllowance() {
  let [basicSalaryReceived, setBasicSalary] = useState(0);
  let [daReceived, setDaReceived] = useState(0);
  let [hraReceived, setHraReceived] = useState(0);
  let [rentPaid, setRentPaid] = useState(0);
  let [isMetroCity, setIsMetroCity] = useState(1);
  let [isError, setError] = useState(false);
  let [arr, setArr] = useState([]);
  let [exemptedAmount, setExemptedAmount] = useState(0);
  let [chargeableTotax, setChargeableTotax] = useState(0);

  function calculateHRAExemption() {
    if (!basicSalaryReceived || !hraReceived || !rentPaid) {
      setError(true);
    } else {
      setError(false);
      setArr([]);
      var HRA = parseInt(hraReceived);
      var BS = parseInt(basicSalaryReceived);
      var DA = parseInt(daReceived);
      var RP = parseInt(rentPaid);
      var formulaOne = HRA;
      let sumOfBPAndDA = BS + DA;
      var formulaTwo = isMetroCity
        ? (50 / 100) * sumOfBPAndDA
        : (40 / 100) * sumOfBPAndDA;
      var formulaThree = RP - (10 / 100) * sumOfBPAndDA;
      arr.push(formulaOne);
      arr.push(formulaTwo);
      arr.push(formulaThree);
      setExemptedAmount(Math.min(...arr));
      setChargeableTotax(RP - exemptedAmount);
    }
  }

  return (
    <div>
      <Container className="container">
        <span className="heading">
          House Rent Allowance Exemption Calculator
        </span>
        <FormControl isRequired className="column-input">
          <HStack>
            <FormLabel>Basic Salary:</FormLabel>
            <Input
              width="25%"
              type="number"
              onChange={(e) => setBasicSalary(e.target.value)}
              value={basicSalaryReceived}
            />
          </HStack>
        </FormControl>

        <FormControl className="column-input">
          <HStack>
            <FormLabel>DA Received:</FormLabel>
            <Input
              width="25%"
              type="number"
              onChange={(e) => setDaReceived(e.target.value)}
              value={daReceived}
            />
          </HStack>
        </FormControl>

        <FormControl isRequired className="column-input">
          <HStack>
            <FormLabel>HRA Received:</FormLabel>
            <Input
              width="25%"
              type="number"
              onChange={(e) => setHraReceived(e.target.value)}
              value={hraReceived}
            />
          </HStack>
        </FormControl>

        <FormControl isRequired className="column-input">
          <HStack>
            <FormLabel>House Rent Paid:</FormLabel>
            <Input
              width="25%"
              type="number"
              onChange={(e) => setRentPaid(e.target.value)}
              value={rentPaid}
            />
          </HStack>
        </FormControl>

        <RadioGroup className="column-input" value={isMetroCity}>
          <HStack>
            <FormLabel>Living in Delhi, Mumbai, Kolkata or Chennai?</FormLabel>
            <Radio
              colorScheme="green"
              onChange={() => setIsMetroCity(1)}
              value={1}
            >
              Yes
            </Radio>
            <Radio
              colorScheme="red"
              onChange={() => setIsMetroCity(0)}
              value={0}
            >
              No
            </Radio>
          </HStack>
        </RadioGroup>

        <Button
          onClick={calculateHRAExemption}
          className="button"
          colorScheme="blue"
        >
          Calculate
        </Button>
        <br></br>
        {isError && "Please Fill All Required Fields"}
        {exemptedAmount != 0 && "Exempted HRA Amount: " + exemptedAmount}
      </Container>

    </div>
  );
}

export default HouseRentAllowance;
