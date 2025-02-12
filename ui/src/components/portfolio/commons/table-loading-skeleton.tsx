import { Skeleton } from "@/components/ui/skeleton"

const TableLoadingSkeleton = () => {
  return (
    <>
      {Array(8).map((_, index) => (
        <Skeleton key={index} className="h-16 w-full my-3" />
      ))}
    </>
  )
}

export default TableLoadingSkeleton