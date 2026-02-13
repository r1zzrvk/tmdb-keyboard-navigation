import "@mantine/core/styles.css";

import { MantineProvider as BaseMantineProvider } from "@mantine/core";

export const MantineProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <BaseMantineProvider defaultColorScheme="light">
      {children}
    </BaseMantineProvider>
  );
};
