import { getSayings } from "@/lib/sayings";
import { getTipById, updateTip } from "@/lib/tips";
import { NextRequest } from "next/server";

export const GET = async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  try {
    const tip = await getTipById(id);
    
    if (!tip) {
      return new Response(JSON.stringify({ error: "Tip not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    
    return new Response(JSON.stringify(tip), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch tip" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

export const PUT = async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  try {
    const data = await request.json();
    const updatedTip = await updateTip(id, data);
    
    return new Response(JSON.stringify(updatedTip), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error updating tip:", error);
    return new Response(JSON.stringify({ error: "Failed to update tip" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

