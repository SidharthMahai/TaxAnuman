import {
  FormControl,
  FormLabel,
  HStack,
  Container,
  Radio,
  RadioGroup,
  Button,
  Select,
  Center,
} from "@chakra-ui/react";
import "./exemptions.css";
import "./../myLib.css";
import React, { useState, useEffect } from "react";
import CustomTable from "../CustomTable";
import { isDOMComponent } from "react-dom/test-utils";

function HouseRentAllowance() {
  let [basicSalaryReceived, setBasicSalary] = useState(0);
  let [daReceived, setDaReceived] = useState(0);
  let [hraReceived, setHraReceived] = useState(0);
  let [rentPaid, setRentPaid] = useState(0);
  let [isMetroCity, setIsMetroCity] = useState(1);
  let [isError, setError] = useState(false);
  let [arr, setArr] = useState([]);
  let [exemptedAmount, setExemptedAmount] = useState(0);
  let [hasMultipleValues, sethasMultipleValues] = useState(0);
  let [chargeableTotax, setChargeableTotax] = useState(0);
  let [columns, setColumns] = useState([]);
  let [rows, setRows] = useState([{}]);
  let [bulkRows, setBulkRows] = useState([
    { id: 1, rowValues: ["", "", "", "", "", "", "" ] },
  ]);
  let [bulkColumns, setBulkColumns] = useState([
    "Basic Salary",
    "DA Received",
    "HRA Received",
    "Rent Paid",
    "Is Metro City?",
    "From Month",
    "To Month",
  ]);
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
  let [multipleValues, setMultipleValues] = useState([]);

  function fromMonthClick(monthNumber) {
    if (monthNumber === "") {
    } else {
      setToMonthDisabled(0);
      setFromMonth(parseInt(monthNumber));
      if (toMonth < parseInt(monthNumber) && toMonth !== 0) {
        setToMonth(0);
      }
    }
  }

  function generateId() {
    const chars = "0123456789";
    let id = "";

    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      id += chars[randomIndex];
    }

    return id;
  }

  function setMultipleValueChanges(value) {
    var tempBulkRows = [];
    sethasMultipleValues(value);
  }

  function checkIfRowCanBeAdded() {
    var isValid = true;
    if (bulkRows.length >= 1 && bulkRows[0].id !== 1) {
      bulkRows.forEach((row) => {
        var existingfromMonth = months.filter(
          (a) => a.monthName === row.rowValues[5]
        );
        var existingtoMonth = months.filter(
          (a) => a.monthName === row.rowValues[6]
        );
        for (
          var x = existingfromMonth[0].monthNumber;
          x <= existingtoMonth[0].monthNumber;
          x++
        ) {
          if (fromMonth === x || toMonth === x) {
            isValid = false;
            return;
          }
        }
      });
    }
    return isValid;
  }

  function addNewValueInTable() {
    var HRA = hraReceived === "" ? 0 : parseInt(hraReceived);
    var BS = basicSalaryReceived === "" ? 0 : parseInt(basicSalaryReceived);
    var DA = daReceived === "" ? 0 : parseInt(daReceived);
    var RP = rentPaid === "" ? 0 : parseInt(rentPaid);
    var MC = isMetroCity;
    if (BS < 1 || HRA < 1 || RP < 1) {
      setError(true);
    } else {
      setError(false);
      if (checkIfRowCanBeAdded()) {
        var tempRows = bulkRows;
        if (bulkRows.length === 1 && bulkRows[0].id === 1) tempRows = [];
        var newRow = {
          id: generateId(),
          rowValues: [
            BS,
            DA,
            HRA,
            RP,
            MC,
            months.find((a) => a.monthNumber === fromMonth).monthName,
            months.find((a) => a.monthNumber === toMonth).monthName
          ],
        };
        tempRows.push(newRow);
        setBulkRows(tempRows);
        setBasicSalary(0);
        setHraReceived(0);
        setDaReceived(0);
        setRentPaid(0);
        setIsMetroCity(1);
        setFromMonth();
        setToMonth();
      } else {
        setError(true);
      }
    }
  }

  function toMonthClick(monthNumber) {
    if (monthNumber === "") {
    } else {
      setToMonth(parseInt(monthNumber));
    }
  }

  function calculateHRAExemption(HRA, BS, DA, RP, isMetroCity) {
    var tempArr = [];
    var formulaOne = HRA;
    let sumOfBPAndDA = BS + DA;
    var formulaTwo = isMetroCity
      ? (50 / 100) * sumOfBPAndDA
      : (40 / 100) * sumOfBPAndDA;
    var formulaThree = RP - (10 / 100) * sumOfBPAndDA;
    tempArr.push(formulaOne);
    tempArr.push(formulaTwo);
    tempArr.push(formulaThree);
    return Math.min(...tempArr);
  }

  function returnHRAFormulaValues(HRA, BS, DA, RP, isMetroCity) {
    var tempArr = [];
    var formulaOne = HRA;
    let sumOfBPAndDA = BS + DA;
    var formulaTwo = isMetroCity
      ? (50 / 100) * sumOfBPAndDA
      : (40 / 100) * sumOfBPAndDA;
    var formulaThree = RP - (10 / 100) * sumOfBPAndDA;
    tempArr.push(formulaOne);
    tempArr.push(formulaTwo);
    tempArr.push(formulaThree);
    return tempArr;
  }

  function calculateButtonClicked() {
    var HRA = hraReceived === "" ? 0 : parseInt(hraReceived);
    var BS = basicSalaryReceived === "" ? 0 : parseInt(basicSalaryReceived);
    var DA = daReceived === "" ? 0 : parseInt(daReceived);
    var RP = rentPaid === "" ? 0 : parseInt(rentPaid);
    setArr([]);
    setColumns([]);
    setRows([{}]);
    setExemptedAmount(0);
    setChargeableTotax(0);
    if (hasMultipleValues !== 1 && (BS < 1 || HRA < 1 || RP < 1)) {
      setError(true);
    } else {
      setError(false);
      var columns = [];
      columns.push("Calculation");
      columns.push("Value");
      setColumns(columns);
      if (hasMultipleValues && bulkRows.length >=1 && bulkRows[0].id !== 1) {
        var exempted = 0;
        var chargeable = 0;
        bulkRows.forEach((row) => {
          var existingfromMonth = months.filter(
            (a) => a.monthName === row.rowValues[5]
          );
          var existingtoMonth = months.filter(
            (a) => a.monthName === row.rowValues[6]
          );
          var numberOfMonths =
            existingtoMonth[0].monthNumber -
            existingfromMonth[0].monthNumber +
            1;
          var percentage = row.rowValues[4] ? "50%" : "40%";
          var exemptedForRow =
            calculateHRAExemption(
              row.rowValues[2],
              row.rowValues[0],
              row.rowValues[1],
              row.rowValues[3],
              row.rowValues[4]
            ) * numberOfMonths;
          var formulaValues = returnHRAFormulaValues(
            row.rowValues[2],
            row.rowValues[0],
            row.rowValues[1],
            row.rowValues[3],
            row.rowValues[4]
          );
          exempted += exemptedForRow;
          var chargeableForThis =
            row.rowValues[3] * numberOfMonths - exemptedForRow;
          chargeable += chargeableForThis;
        });
        setExemptedAmount(exempted);
        setChargeableTotax(chargeable);
        var rows = [
          {
            id: 1,
            rowValues: ["HRA Exempted", exempted],
          },
          {
            id: 2,
            rowValues: ["HRA Chargeable to tax", chargeable],
          },
        ];

        setRows(rows);
      } else {
        var numberOfMonths = toMonth - fromMonth + 1;
        var exempted =
          calculateHRAExemption(HRA, BS, DA, RP, isMetroCity) * numberOfMonths;
        var formulaValues = returnHRAFormulaValues(
          HRA,
          BS,
          DA,
          RP,
          isMetroCity
        );
        var chargeable = RP * numberOfMonths - exempted;
        var percentage = isMetroCity ? "50%" : "40%";
        setExemptedAmount(exempted);
        setChargeableTotax(chargeable);
        var rows = [
          {
            id: 1,
            rowValues: [
              "Actual HRA received",
              formulaValues[0] * numberOfMonths,
            ],
          },
          {
            id: 2,
            rowValues: [
              percentage + " of Basic Salary",
              formulaValues[1] * numberOfMonths,
            ],
          },
          {
            id: 3,
            rowValues: [
              "Rent Paid in excess of 10% of salary",
              formulaValues[2] * numberOfMonths,
            ],
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
  }

  return (
    <div>
      <Container maxW="600px" className="container custom-glass-effect">
        <div className="custom-heading">
          House Rent Allowance Exemption Calculator
        </div>
        <HStack>
          <FormControl isRequired className="column-input">
            <HStack>
              <FormLabel width="50%">Basic Salary:</FormLabel>
              <input
                className="custom-input"
                width="50%"
                type="number"
                onChange={(e) => setBasicSalary(e.target.value)}
                value={basicSalaryReceived}
              />
            </HStack>
          </FormControl>

          <FormControl className="column-input">
            <HStack>
              {" "}
              <FormLabel width="50%">DA Received:</FormLabel>
              <input
                className="custom-input"
                width="50%"
                type="number"
                onChange={(e) => setDaReceived(e.target.value)}
                value={daReceived}
              />
            </HStack>
          </FormControl>
        </HStack>
        <HStack>
          <FormControl isRequired className="column-input">
            <HStack>
              <FormLabel width="50%">HRA Received:</FormLabel>
              <input
                className="custom-input"
                width="50%"
                type="number"
                onChange={(e) => setHraReceived(e.target.value)}
                value={hraReceived}
              />
            </HStack>
          </FormControl>

          <FormControl isRequired className="column-input">
            <HStack>
              <FormLabel width="50%">Rent Paid:</FormLabel>
              <input
                className="custom-input"
                width="50%"
                type="number"
                onChange={(e) => setRentPaid(e.target.value)}
                value={rentPaid}
              />
            </HStack>
          </FormControl>
        </HStack>
        <RadioGroup className="column-input" value={isMetroCity}>
          <HStack>
            <FormLabel width="71%">
              Living in Delhi, Mumbai, Kolkata or Chennai?
            </FormLabel>
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

        <RadioGroup className="column-input" value={hasMultipleValues}>
          <HStack>
            <FormLabel width="71%">
              Some values are different throughout the year?
            </FormLabel>
            <Radio
              colorScheme="green"
              onChange={() => setMultipleValueChanges(1)}
              value={1}
            >
              Yes
            </Radio>
            <Radio
              colorScheme="red"
              onChange={() => setMultipleValueChanges(0)}
              value={0}
            >
              No
            </Radio>
          </HStack>
        </RadioGroup>

        <FormControl className="column-input">
          <HStack>
            <FormLabel width="36%">Select Months Period:</FormLabel>
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
              <FormLabel style={{ fontWeight: "normal" }} width="10%">
                To:
              </FormLabel>
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

        {hasMultipleValues === 1 && (
          <Center>
            <Button
              style={{ textAlign: "center", marginRight: "2%" }}
              onClick={addNewValueInTable}
              className="button"
              colorScheme="blue"
            >
              Add to Table
            </Button>
          </Center>
        )}
        {hasMultipleValues === 1 && (
          <CustomTable
            heading="Multiple Value Changes"
            columns={bulkColumns}
            rows={bulkRows}
          />
        )}

        <Center>
          <Button
            style={{ textAlign: "center", marginRight: "2%" }}
            onClick={calculateButtonClicked}
            className="button"
            colorScheme="green"
          >
            Calculate
          </Button>
        </Center>
        <br></br>
        {isError && "Please Fill All Required Fields"}
        {exemptedAmount !== 0 && "Exempted HRA Amount: " + exemptedAmount}
        {exemptedAmount !== 0 && (
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
