import { getSayings } from "@/lib/sayings";
import { getTipById, updateTip } from "@/lib/tips";
import { NextRequest } from "next/server";

export const GET = async (request: Request, { params }: { params: { slug: string } }) => {
  const { slug } = params;
  try {
    const tip = await getTipById(slug);
    
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

export const PUT = async (request: NextRequest, { params }: { params: { slug: string } }) => {
  const { slug } = params;
  try {
    const data = await request.json();
    const updatedTip = await updateTip(slug, data);
    
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

