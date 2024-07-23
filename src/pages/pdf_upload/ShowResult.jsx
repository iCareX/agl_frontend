import { ActionIcon, Box, Card, CopyButton, Flex, List, ListItem, Paper, rem, ScrollArea, SimpleGrid, Text, ThemeIcon, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCheck, IconCircleCheck, IconCircleX, IconCopy } from "@tabler/icons-react";
import { useRef, useState } from "react";

export default function ShowResult(props) {
  const viewport = useRef(null);
  const { data } = props;

  const scrollRefs = {
    firstGroup: useRef(null),
    secondGroup: useRef(null),
    thirdGroup: useRef(null),
    fourthGroup: useRef(null),
    lastGroup: useRef(null),
    otherGroup: useRef(null),
  };

  const handleLabel = (str) => {
    return str
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const groups = {
    firstGroup: ["immobile_sito_in", "individuazione_immobile", "identificazione_catastale", "tipologia_immobile"],
    secondGroup: ["difformita", "problematiche", "vetusta_immobile", "occupazione_bene"],
    thirdGroup: ["lavori_da_eseguire", "costi_sanatoria", "costi_istruttoria", "spese_varie", "sanatorie"],
    fourthGroup: ["referente", "riferimento_portale"],
    lastGroup: ["esecuzione_immobiliare_n"],
    otherGroup: ["base_asta", "cauzione", "data_asta", "descrizione_immobile", "offerta_minima", "rilancio_offerta", "valore_immobiliare"],
  };

  const renderGroup = (group, groupName, color) => {
    return (
      <Box>
        {group.map((item, index) => (
          <div className="mt-3">
            <Flex justify={"space-between"} align={"center"}>
              <Text color={color} fw={500}>
                {handleLabel(item)}
              </Text>
              <CopyButton value={data[item]}>
                {({ copied, copy }) => (
                  <Tooltip label={copied ? "Copied" : "Copy"} withArrow position="right">
                    <ActionIcon color={copied ? "teal" : "gray"} variant="subtle" onClick={copy}>
                      {copied ? <IconCheck style={{ width: rem(16) }} /> : <IconCopy style={{ width: rem(16) }} />}
                    </ActionIcon>
                  </Tooltip>
                )}
              </CopyButton>
            </Flex>
            <Paper withBorder radius={"sm"} px={"sm"} py={"xs"} mt={4}>
              <Text color={data[item] ? "" : "gray"} fs={data[item] ? "" : "italic"}>
                {data[item] ? data[item] : " None Data"}
              </Text>
            </Paper>
          </div>
        ))}
      </Box>
    );
  };

  const [selected, setSelected] = useState();
  const [clicked, setClicked] = useState();
  const [hoverIndex, setHoverIndex] = useState(-1);

  const calculateHeight = () => `calc(100vh - 580px)`;

  const handleScrollMove = (group) => {
    viewport.current?.scrollTo({ top: scrollRefs[group].current.offsetTop, behavior: "smooth" });
  };

  return (
    <>
      <SimpleGrid cols={{ base: 1, sm: 3 }}>
        {Object.keys(groups).map((item, index) => {
          return (
            <Card
              withBorder
              shadow="sm"
              radius={"sm"}
              p={"sm"}
              onClick={() => {
                setSelected(item);
                handleScrollMove(item);
                setClicked(index);
              }}
              onMouseOver={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(-1)}
              style={{ borderColor: hoverIndex === index || clicked === index ? "#228be6" : "" }}
            >
              <List spacing="xs" size="md" center fw={500}>
                {groups[item].map((subItem, index) => {
                  return (
                    <ListItem key={index}>
                      <Flex gap={"sm"}>
                        <ThemeIcon color={data[subItem] === undefined || data[subItem] === "<UNKNOWN>" ? "red" : "teal"} size={16} radius="xl">
                          {data[subItem] === undefined || data[subItem] === "<UNKNOWN>" ? (
                            <IconCircleX style={{ width: rem(16), height: rem(16) }} />
                          ) : (
                            <IconCircleCheck style={{ width: rem(16), height: rem(16) }} />
                          )}
                        </ThemeIcon>
                        {handleLabel(subItem)}
                      </Flex>
                    </ListItem>
                  );
                })}
              </List>
            </Card>
          );
        })}
      </SimpleGrid>
      <ScrollArea mt={"sm"} viewportRef={viewport} pr={"sm"} scrollbarSize={8} style={{ height: calculateHeight() }}>
        <div ref={scrollRefs.firstGroup}>{renderGroup(groups.firstGroup, "First Group", "teal")}</div>
        <div ref={scrollRefs.secondGroup}>{renderGroup(groups.secondGroup, "Second Group", "#228be6")}</div>
        <div ref={scrollRefs.thirdGroup}>{renderGroup(groups.thirdGroup, "Third Group", "orange")}</div>
        <div ref={scrollRefs.fourthGroup}>{renderGroup(groups.fourthGroup, "Fourth Group", "green")}</div>
        <div ref={scrollRefs.lastGroup}>{renderGroup(groups.lastGroup, "Last Group", "grape")}</div>
        <div ref={scrollRefs.otherGroup}>{renderGroup(groups.otherGroup, "Other Group", "red")}</div>
      </ScrollArea>
    </>
  );
}
