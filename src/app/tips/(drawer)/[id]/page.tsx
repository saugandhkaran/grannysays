import SlidingDrawer from "@/components/SlidingDrawer/SlidingDrawer";
import { getTipById } from "@/lib/tips";

export default async function TipDrawerPage({ params }: { params: { id: string } }) {
  const tip = await getTipById(params.id);
  
  if (!tip) return null;
  
  const tipsObject = {
    tip,
    sayings: tip.sayings || []
  };
  
  return <SlidingDrawer tipsObject={tipsObject} />;
}