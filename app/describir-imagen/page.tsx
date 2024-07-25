"use client";
import { CustomParameters } from "@/components/custom-accordion";
import { DescribeImageExample } from "@/components/describe-image";
import { Button } from "@/components/ui/button";
import { Uploader } from "@/components/uploader";
import { CONFIG } from "@/lib/config";
import { useState } from "react";

export default function DescribeImages() {
  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [parameters, setParameters] = useState({
    temperature: 0.2,
    topP: 0.7,
    maxTokens: 576,
  });

  const handleUploadImage = async (image: File) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", image);

    const response = await fetch(
      `${CONFIG.api}/describe-image/upload-image`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    setTimeout(() => {
      setImage(data.file);
      setLoading(false);
    }, 3000); // Simula una carga de 3 segundos
  };

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
      <div>
        <div className="flex flex-col gap-2 mb-4">
          <h1 className="text-3xl font-bold">Describir imagen</h1>
          <div className="flex gap-2">
            <Button className="bg-white hover:bg-gray-100 text-black text-sm h-6 cursor-not-allowed">
              beta
            </Button>
            <Button className="bg-teal-500 hover:bg-teal-600 text-black text-sm h-6 cursor-not-allowed">
              Inglés
            </Button>
          </div>
          <span className="text-sm">
            Carga una imagen para poder describirla y generar un alt
          </span>
        </div>

        <Uploader
          image={image}
          loading={loading}
          onUpload={handleUploadImage}
        />

        <h2 className="text-2xl font-bold mt-8 mb-4">Ejemplos</h2>

        <DescribeImageExample />

        <CustomParameters
          parameters={parameters}
          setParameters={setParameters}
        />

        <p></p>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6 mt-8 md:mt-0">Resultado</h2>

        <div className="flex flex-col gap-2">
          <p className="text-sm mb-4">
            The image depicts an unusual and potentially dangerous situation.
            There is a person standing on the back of a moving yellow taxi,
            attempting to iron clothes while the vehicle is in motion. This is
            not only unsafe for the individual but also poses risks to other
            road users as it can be distracting or lead to accidents due to
            unexpected movements from both the passenger and driver. It's
            important to note that such actions are against traffic laws and are
            generally discouraged for safety reasons.
          </p>

          <img src="/images/examples/extreme_ironing.jpg" alt="" />
          <span className="text-sm">
            Man ironing clothes while riding in back of yellow taxi amidst city
            traffic.
          </span>
        </div>
      </div>
    </main>
  );
}

// llava:13b
