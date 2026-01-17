
import { GoogleGenAI } from "@google/genai";

export const improveDescription = async (name: string, currentDesc: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Eres un experto en ventas industriales para la empresa "Mallas y Soldadura Arce" en Perú. 
      Mejora la siguiente descripción de producto para que sea más profesional, persuasiva y técnica, pero fácil de entender. 
      Usa español peruano si es necesario.
      Producto: ${name}
      Descripción actual: ${currentDesc}
      Devuelve SOLO la descripción mejorada en un máximo de 30 palabras.`,
    });

    return response.text || currentDesc;
  } catch (error) {
    console.error("AI Error:", error);
    return currentDesc;
  }
};
