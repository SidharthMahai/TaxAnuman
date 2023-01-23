import {
  FormControl,
  FormLabel,
  HStack,
  Container,
  Radio,
  RadioGroup,
  Button,
  Select,
} from "@chakra-ui/react";
import "./exemptions.css";
import "./../myLib.css";
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
  var months = [
    { monthNumber: 1, monthName: "April" },
    { monthNumber: 2, monthName: "May" },
    { monthNumber: 3, monthName: "June" },
    { monthNumber: 4, monthName: "July" },
    { monthNumber: 5, monthName: "August" },
    { monthNumber: 6, monthName: "September" },
    { monthNumber: 7, monthName: "October" },
    { monthNumber: 8, monthName: "November" },
    { monthNumber: 9, monthName: "December" },
    { monthNumber: 10, monthName: "January" },
    { monthNumber: 11, monthName: "February" },
    { monthNumber: 12, monthName: "March" },
  ];
  let [fromMonth, setFromMonth] = useState();
  let [toMonth, setToMonth] = useState();
  let [toMonthDisabled, setToMonthDisabled] = useState(1);

  function fromMonthClick(monthNumber) {
    if (monthNumber == "") {
    } else {
      setToMonthDisabled(0);
      setFromMonth(parseInt(monthNumber));
      if(toMonth < parseInt(monthNumber) && toMonth!=0) {
        setToMonth(0);
      }
    }
  }

  function toMonthClick(monthNumber) {
    if (monthNumber == "") {
    } else {
      setToMonth(parseInt(monthNumber));
    }
  }

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
      if (fromMonth >= 1 && toMonth >= 1) {
        var numberOfMonths = toMonth - fromMonth + 1;
        exempted = exempted * numberOfMonths;
        chargeable = chargeable * numberOfMonths;
        formulaOne = formulaOne * numberOfMonths;
        formulaTwo = formulaTwo * numberOfMonths;
        formulaThree = formulaThree * numberOfMonths;
      }
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
      <Container className="container custom-glass-effect">
        <span className="heading">
          House Rent Allowance Exemption Calculator
        </span>
        <FormControl isRequired className="column-input">
          <HStack>
            <FormLabel>Basic Salary:</FormLabel>
            <input
              className="custom-input"
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
            <input
              className="custom-input"
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
            <input
              className="custom-input"
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
            <input
              className="custom-input"
              width="25%"
              type="number"
              onChange={(e) => setRentPaid(e.target.value)}
              value={rentPaid}
            />
          </HStack>
        </FormControl>

        <FormControl className="column-input">
          <HStack>
            <FormLabel>Select Months Period:</FormLabel>
            <HStack>
              <Select
                onChange={(e) => fromMonthClick(e.target.value)}
                placeholder="Select"
                width="50%"
              >
                {months.map((e) => (
                  <option key={e.monthNumber} value={e.monthNumber}>
                    {e.monthName}
                  </option>
                ))}
              </Select>
              <Select
                onChange={(e) => toMonthClick(e.target.value)}
                disabled={toMonthDisabled}
                placeholder="Select"
                width="50%"
              >
                {months.map(
                  (e) =>
                    e.monthNumber >= fromMonth && (
                      <option key={e.monthNumber} value={e.monthNumber}>
                        {e.monthName}
                      </option>
                    )
                )}
              </Select>
            </HStack>
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
