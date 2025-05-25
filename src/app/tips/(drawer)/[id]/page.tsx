import SlidingDrawer from "@/components/SlidingDrawer/SlidingDrawer";
import { getTipById } from "@/lib/tips";

export default async function TipDrawerPage({ params }: { params: Promise<{ id: string }> }) {
  const tip = await getTipById((await params).id);
  
  if (!tip) return null;
  
  const tipsObject = {
    tip,
    sayings: tip.sayings || []
  };
  // @ts-ignore will be fixed in the next version
  return <SlidingDrawer tipsObject={tipsObject} />;
}