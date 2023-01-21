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
import CustomTable from "../CustomTable";
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
  let [columns, setColumns] = useState([]);
  let [rows, setRows] = useState([{}]);

  function calculateHRAExemption() {
    var HRA = hraReceived == "" ? 0 : parseInt(hraReceived);
    var BS = basicSalaryReceived == "" ? 0 : parseInt(basicSalaryReceived);
    var DA = daReceived == "" ? 0 : parseInt(daReceived);
    var RP = rentPaid == "" ? 0 : parseInt(rentPaid);
    setArr([]);
    setColumns([]);
    setRows([{}]);
    setExemptedAmount(0);
    setChargeableTotax(0);
    if (BS < 1 || HRA < 1 || RP < 1) {
      setError(true);
    } else {
      setError(false);
      var formulaOne = HRA;
      let sumOfBPAndDA = BS + DA;
      var formulaTwo = isMetroCity
        ? (50 / 100) * sumOfBPAndDA
        : (40 / 100) * sumOfBPAndDA;
      var formulaThree = RP - (10 / 100) * sumOfBPAndDA;
      arr.push(formulaOne);
      arr.push(formulaTwo);
      arr.push(formulaThree);
      var exempted = Math.min(...arr);
      var chargeable = RP - exempted;
      var percentage = isMetroCity ? "50%" : "40%";
      setExemptedAmount(exempted);
      setChargeableTotax(chargeable);
      var columns = [];
      columns.push("Calculation");
      columns.push("Value");
      setColumns(columns);
      var rows = [
        {
          id: 1,
          rowValues: ["Actual HRA received", formulaOne],
        },
        {
          id: 2,
          rowValues: [percentage + " of Basic Salary", formulaTwo],
        },
        {
          id: 3,
          rowValues: ["Rent Paid in excess of 10% of salary", formulaThree],
        },
        {
          id: 4,
          rowValues: ["HRA Exempted", exempted],
        },
        {
          id: 5,
          rowValues: ["HRA Chargeable to tax", chargeable],
        },
      ];
      setRows(rows);
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
        {exemptedAmount != 0 && (
          <CustomTable
            heading="Exemption Calculation Explained"
            columns={columns}
            rows={rows}
          />
        )}
      </Container>
    </div>
  );
}

export default HouseRentAllowance;
