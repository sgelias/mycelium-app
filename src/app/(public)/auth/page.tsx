import EmailHandler from "@/components/EmailHandler";
import Container from "@/components/ui/Container";
import Typography from "@/components/ui/Typography";

export default function Page() {
  return (
    <Container.Box type="discreet">
      <Typography as="h2">Find Me</Typography>
      <EmailHandler />
    </Container.Box>
  );
}
