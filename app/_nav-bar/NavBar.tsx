import { Box, Container, Flex } from "@radix-ui/themes";
import Link from "next/link";
import { ImBug } from "react-icons/im";
import Profile from "./Profile";
import AppLinks from "./AppLinks";

export default function NavBar() {
  return (
    <nav className="border-b mb-5 p-5">
      <Container>
        <Flex justify={"between"}>
          <Flex align={"center"} gap={"3"}>
            <Link href={"/"}>
              <ImBug />
            </Link>
            <AppLinks />
          </Flex>

          <Box>
            <Profile />
          </Box>
        </Flex>
      </Container>
    </nav>
  );
}
