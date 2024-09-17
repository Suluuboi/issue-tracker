import { Flex, Container, Text, Heading } from "@radix-ui/themes";
import { Link } from "../components";

export default function Footer() {
  return (
    <Flex p={"5"} mt={"3"}>
      <Container>
        <Heading size={"3"}>Bug Issue App</Heading>
        <div className="mt-3">
          <Text>Quick Links:</Text>
        </div>

        <div>
          <Link href={"/issues/list"}>List of Issues</Link>
        </div>
        <div>
          <Link href={"/issues/new"}>New Issues</Link>
        </div>
      </Container>
    </Flex>
  );
}
