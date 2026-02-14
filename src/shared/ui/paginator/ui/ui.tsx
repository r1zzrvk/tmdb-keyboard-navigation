import { Group, Stack, Text } from "@mantine/core"
import type { FC } from "react"
import { PaginatorButton } from "./paginator-button"
import type { PaginatorProps } from "../model"

export const Paginator: FC<PaginatorProps> = ({ page, totalPages, onPrev, onNext }) => {
  const canGoPrev = page > 1
  const canGoNext = totalPages ? page < totalPages : false

  return (
    <Stack align="center" mt="xl">
      <Text size="sm">Page {page} of {totalPages}</Text>
      <Group gap="sm">
        <PaginatorButton
          label="Previous"
          disabled={!canGoPrev}
          onClick={onPrev}
        />
        <PaginatorButton
          label="Next"
          disabled={!canGoNext}
          onClick={onNext}
        />
      </Group>
    </Stack>
  )
}
