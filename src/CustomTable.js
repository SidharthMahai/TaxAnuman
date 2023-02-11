import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import React, { useState } from "react";
function CustomTable(props) {
  var columns = props.columns;
  var rows = props.rows;
  return (
    <TableContainer>
      <Table variant="striped" colorScheme="teal">
        <TableCaption>{props.heading}</TableCaption>
        <Thead>
          <Tr>
            {columns.map((e) => (
              <Th>{e}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {rows.map((row) => (
            <Tr key={row.id}>
              {row.rowValues.map((e) => (
                <Td>{e}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default CustomTable;
