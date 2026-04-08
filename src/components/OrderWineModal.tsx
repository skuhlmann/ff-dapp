"use client";

import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import type { WineOrderRecord } from "../utils/types";

const US_STATES = [
  "AK","AZ","CO","CT","DC","FL","GA","HI","IA","ID","IL","IN","KS","KY","LA",
  "MA","MD","MN","MO","NC","ND","NE","NH","NM","NV","NY","OH","OK","OR","PA",
  "SC","TN","TX","VT","WA","WI","WV","WY",
];

interface OrderWineModalProps {
  tokenId: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (order: WineOrderRecord) => void;
}

const emptyForm = {
  email: "",
  firstName: "",
  lastName: "",
  phone: "",
  street1: "",
  street2: "",
  city: "",
  stateCode: "",
  postalCode: "",
  dobMonth: "",
  dobDay: "",
  dobYear: "",
};

export const OrderWineModal = ({
  tokenId,
  isOpen,
  onClose,
  onSuccess,
}: OrderWineModalProps) => {
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const set = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const maxDobYear = new Date().getFullYear() - 21;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const dobYear = parseInt(form.dobYear);
    if (dobYear > maxDobYear) {
      setSubmitError("You must be 21 or older to order.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tokenId,
          customer: {
            email: form.email,
            firstName: form.firstName,
            lastName: form.lastName,
            phone: form.phone,
            address: {
              street1: form.street1,
              street2: form.street2 || null,
              city: form.city,
              postalCode: form.postalCode,
              stateCode: form.stateCode,
            },
            dateOfBirth: {
              day: parseInt(form.dobDay),
              month: parseInt(form.dobMonth),
              year: dobYear,
            },
          },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to place order.");
      }

      // Invalidate the order status cache so NftCard refetches.
      queryClient.invalidateQueries({ queryKey: [`orderStatus-${tokenId}`] });

      onSuccess({
        tokenId,
        orderNumber: data.orderNumber,
        orderStatus: data.orderStatus,
        orderProblems: data.orderProblems ?? [],
        createdAt: new Date().toISOString(),
      });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Unknown error.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyles = {
    bg: "whiteAlpha.100",
    borderColor: "whiteAlpha.300",
    _hover: { borderColor: "whiteAlpha.500" },
    _focus: { borderColor: "brand.orange", boxShadow: "none" },
    color: "white",
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay backdropFilter="blur(4px)" />
      <ModalContent bg="brand.lightPurple" borderRadius="20px" mx="1rem">
        <ModalHeader fontSize="lg" fontWeight="700" pt="1.5rem">
          Order Your Bottle
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb="2rem">
          <form onSubmit={handleSubmit}>
            <Flex direction="column" gap="1.25rem">

              {/* Customer info */}
              <SimpleGrid columns={2} gap="0.75rem">
                <FormControl isRequired>
                  <FormLabel fontSize="xs" color="whiteAlpha.700">First Name</FormLabel>
                  <Input
                    {...inputStyles}
                    value={form.firstName}
                    onChange={(e) => set("firstName", e.target.value)}
                    placeholder="Sam"
                    size="sm"
                    borderRadius="8px"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel fontSize="xs" color="whiteAlpha.700">Last Name</FormLabel>
                  <Input
                    {...inputStyles}
                    value={form.lastName}
                    onChange={(e) => set("lastName", e.target.value)}
                    placeholder="Doe"
                    size="sm"
                    borderRadius="8px"
                  />
                </FormControl>
              </SimpleGrid>

              <FormControl isRequired>
                <FormLabel fontSize="xs" color="whiteAlpha.700">Email</FormLabel>
                <Input
                  {...inputStyles}
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder="you@example.com"
                  size="sm"
                  borderRadius="8px"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontSize="xs" color="whiteAlpha.700">Phone</FormLabel>
                <Input
                  {...inputStyles}
                  type="tel"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  placeholder="5555555555"
                  size="sm"
                  borderRadius="8px"
                />
              </FormControl>

              {/* Shipping address */}
              <Text fontSize="xs" fontWeight="600" color="whiteAlpha.600" mt="0.25rem">
                SHIPPING ADDRESS
              </Text>

              <FormControl isRequired>
                <FormLabel fontSize="xs" color="whiteAlpha.700">Street</FormLabel>
                <Input
                  {...inputStyles}
                  value={form.street1}
                  onChange={(e) => set("street1", e.target.value)}
                  placeholder="123 Main St"
                  size="sm"
                  borderRadius="8px"
                />
              </FormControl>

              <FormControl>
                <FormLabel fontSize="xs" color="whiteAlpha.700">Apt / Suite (optional)</FormLabel>
                <Input
                  {...inputStyles}
                  value={form.street2}
                  onChange={(e) => set("street2", e.target.value)}
                  placeholder="Apt 4B"
                  size="sm"
                  borderRadius="8px"
                />
              </FormControl>

              <SimpleGrid columns={3} gap="0.75rem">
                <FormControl isRequired gridColumn="span 1">
                  <FormLabel fontSize="xs" color="whiteAlpha.700">City</FormLabel>
                  <Input
                    {...inputStyles}
                    value={form.city}
                    onChange={(e) => set("city", e.target.value)}
                    placeholder="Napa"
                    size="sm"
                    borderRadius="8px"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel fontSize="xs" color="whiteAlpha.700">State</FormLabel>
                  <Select
                    {...inputStyles}
                    value={form.stateCode}
                    onChange={(e) => set("stateCode", e.target.value)}
                    placeholder="—"
                    size="sm"
                    borderRadius="8px"
                  >
                    {US_STATES.map((s) => (
                      <option key={s} value={s} style={{ color: "#000" }}>
                        {s}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel fontSize="xs" color="whiteAlpha.700">ZIP</FormLabel>
                  <Input
                    {...inputStyles}
                    value={form.postalCode}
                    onChange={(e) => set("postalCode", e.target.value)}
                    placeholder="94559"
                    size="sm"
                    borderRadius="8px"
                  />
                </FormControl>
              </SimpleGrid>

              {/* Date of birth */}
              <Text fontSize="xs" fontWeight="600" color="whiteAlpha.600" mt="0.25rem">
                DATE OF BIRTH (must be 21+)
              </Text>

              <SimpleGrid columns={3} gap="0.75rem">
                <FormControl isRequired>
                  <FormLabel fontSize="xs" color="whiteAlpha.700">Month</FormLabel>
                  <Input
                    {...inputStyles}
                    type="number"
                    min={1}
                    max={12}
                    value={form.dobMonth}
                    onChange={(e) => set("dobMonth", e.target.value)}
                    placeholder="MM"
                    size="sm"
                    borderRadius="8px"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel fontSize="xs" color="whiteAlpha.700">Day</FormLabel>
                  <Input
                    {...inputStyles}
                    type="number"
                    min={1}
                    max={31}
                    value={form.dobDay}
                    onChange={(e) => set("dobDay", e.target.value)}
                    placeholder="DD"
                    size="sm"
                    borderRadius="8px"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel fontSize="xs" color="whiteAlpha.700">Year</FormLabel>
                  <Input
                    {...inputStyles}
                    type="number"
                    min={1900}
                    max={maxDobYear}
                    value={form.dobYear}
                    onChange={(e) => set("dobYear", e.target.value)}
                    placeholder="YYYY"
                    size="sm"
                    borderRadius="8px"
                  />
                </FormControl>
              </SimpleGrid>

              {submitError && (
                <Text fontSize="xs" color="red.300">
                  {submitError}
                </Text>
              )}

              <Button
                type="submit"
                isLoading={submitting}
                loadingText="Placing Order..."
                bg="brand.orange"
                color="white"
                fontWeight="700"
                borderRadius="8px"
                _hover={{ opacity: 0.9 }}
                mt="0.5rem"
              >
                Place Order
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
