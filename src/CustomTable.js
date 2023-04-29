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
  IconButton,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
function CustomTable({
  columns,
  rows,
  actions,
  onChangeEdit,
  onChangeDelete,
  heading,
}) {
  return (
    <TableContainer>
      <Table variant="striped" colorScheme="teal">
        <TableCaption>{heading}</TableCaption>
        <Thead>
          <Tr>
            {columns.map((e) => (
              <Th>{e}</Th>
            ))}
            {actions === "true" && (
              <>
                <Th>Actions</Th>
              </>
            )}
          </Tr>
        </Thead>
        <Tbody>
          {rows.map((row) => (
            <Tr key={row.id}>
              {row.rowValues.map((e) => (
                <Td>{e}</Td>
              ))}
              {actions && rows && rows[0].rowValues[0] &&  (
                <>
                  <Td>
                    <IconButton
                      style={{marginRight: 3}}
                      colorScheme="blue"
                      icon={<EditIcon />}
                      onClick={() => onChangeEdit(row)}
                    />
                    <IconButton
                      colorScheme="red"
                      icon={<DeleteIcon />}
                      onClick={() => onChangeDelete(row)}
                    />
                  </Td>
                </>
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default CustomTable;
