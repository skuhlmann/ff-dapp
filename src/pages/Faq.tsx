import {
  Box,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
} from "@chakra-ui/react";

import { SectionHeader } from "../components/SectionHeader";

function Faq() {
  return (
    <>
      <SectionHeader title="FAQ" />
      <Box px={{ base: "1rem", sm: "2rem" }} color="brand.blue">
        <Box w={{ base: "100%", md: "50%" }} mb="2rem">
          <Heading size="2xl" mb="2rem" color="brand.orange">
            Valid Shipping Locations
          </Heading>
          <Text mb="2rem" fontSize="14px">
            We are only able to ship wine to addresses in certain locations in
            United States.
          </Text>
          <div className="vs-available"></div>
        </Box>
      </Box>

      <Box px={{ base: "1rem", sm: "2rem" }} color="brand.blue">
        <Box w={{ base: "100%" }} mb="2rem">
          <Heading size="2xl" mb="2rem" color="brand.orange">
            Frequently Asked Questions
          </Heading>

          <Accordion allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left" fontSize="lg">
                    What is a ticket?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                A ticket is your digital golden grape: it gives you a unique
                skele-grape NFT and a claim to a real bottle of wine.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left" fontSize="lg">
                    Can I get the wine delivered?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Yep — US customers can redeem a ticket for a bottle shipped
                straight to their door.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left" fontSize="lg">
                    What's a skele-grape?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                It's your wine's digital twin. One-of-a-kind, collectible, and
                full of personality.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left" fontSize="lg">
                    Do I have to know blockchain?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Nope. All NFT and ticket mechanics are handled for you — just
                pick your misfit and sip.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left" fontSize="lg">
                    How long can I age my wine?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                You can keep it in your digital cellar for up to one year to see
                how it matures.
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
      </Box>
    </>
  );
}

export default Faq;
