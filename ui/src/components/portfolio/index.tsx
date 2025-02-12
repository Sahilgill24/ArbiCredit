import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Overview from "./overview";
import Tokens from "./tokens";
import Transactions from "./transactions";

const Portfolio = () => {
  return (
    <>
      <Overview />
      <Tabs defaultValue="tokens" className="w-full mt-4">
        <TabsList className="grid w-[400px] grid-cols-2" variant={"outline"}>
          <TabsTrigger value="tokens" className="text-base" variant={"outline"}>
            Tokens
          </TabsTrigger>
          <TabsTrigger
            value="transactions"
            className="text-base"
            variant={"outline"}
          >
            Transactions
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tokens">
          <Tokens />
        </TabsContent>
        <TabsContent value="transactions">
          <Transactions />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Portfolio;
