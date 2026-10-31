import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LabRegisterPage from "./LabRegisterPage";
import DlabStatementsPage from "./DlabStatementsPage";
import DlabInvoicesPage from "./DlabInvoicesPage";
import BillingAgingView from "./billing/BillingAgingView";
import CreditNoteDialog from "./billing/CreditNoteDialog";

const TABS = [
  { value: "receivables", label: "Receivables" },
  { value: "payments", label: "Payments & Credits" },
  { value: "statements", label: "Statements" },
];
// Old links (?tab=aging / credits) land on the merged tab.
const ALIAS: Record<string, string> = { aging: "receivables", credits: "payments", prices: "receivables" };

export default function DlabBillingPage() {
  const [params, setParams] = useSearchParams();
  const raw = params.get("tab") || "receivables";
  const tab = ALIAS[raw] || raw;

  return (
    <Tabs value={tab} onValueChange={(v) => setParams({ tab: v })} className="space-y-5">
      <TabsList className="flex h-auto flex-wrap justify-start">
        {TABS.map((t) => (
          <TabsTrigger key={t.value} value={t.value}>{t.label}</TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="receivables" className="space-y-8">
        <BillingAgingView />
        <DlabInvoicesPage />
      </TabsContent>
      <TabsContent value="payments" className="space-y-8">
        <LabRegisterPage kind="client-payments" />
        <div className="space-y-4">
          <div className="flex justify-end"><CreditNoteDialog /></div>
          <LabRegisterPage kind="credit-notes" />
        </div>
      </TabsContent>
      <TabsContent value="statements"><DlabStatementsPage /></TabsContent>
    </Tabs>
  );
}
