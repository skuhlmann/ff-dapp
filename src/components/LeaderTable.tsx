import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { LeaderAvatar } from "./LeaderAvatar";
import { EnsData, LeadersRes } from "../utils/types";

export const LeaderTable = ({ leaders }: { leaders: LeadersRes }) => {
  const refreshDate = new Date(
    new Date().setHours(0, 0, 0, 0)
  ).toLocaleString();
  return (
    <TableContainer bg="brand.gray" borderRadius="9px" p="1rem" mb="3rem">
      <Table>
        <TableCaption color="brand.white">
          Last updated {refreshDate}
        </TableCaption>
        <Thead>
          <Tr>
            <Th color="brand.orange">Farmer</Th>
            <Th color="brand.orange">Points</Th>
          </Tr>
        </Thead>
        <Tbody>
          {leaders.map((leader, i) => {
            return (
              <Tr
                fontSize={{ base: "20px", md: "40px" }}
                key={leader[1] as string}
              >
                <Td p="20px">
                  <LeaderAvatar
                    rank={i + 1}
                    address={leader[1] as string}
                    ens={leader[2] as EnsData}
                  />
                </Td>
                <Td>{leader[0] as number}</Td>
              </Tr>
            );
          })}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Farmer</Th>
            <Th>Points</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};
