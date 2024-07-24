import { MegaphoneIcon } from "./icons";

export default function Introduction() {
  return (
    <div className="bg-[#fec800] p-6 rounded-lg gap-2 flex flex-col justify-between text-black">
      <h2 className="text-4xl font-bold mb-4">Introducción Aihub.sh</h2>
      {/* <div className="w-full h-48 bg-black rounded-full" /> */}

      <p className="text-lg ">
        AIHub es una plataforma diseñada para ofrecer un grupo de herramientas
        que ayuden a mejorar y agilizar los procesos de redacción y publicación
        de articulos de medios digitales mediante el uso de inteligencia
        artificial.
      </p>

      <p className="text-lg">
        AIHub se enfoca en optimizar sus procesos creativos y productivos,
        proporcionando soluciones integrales que abarcan desde la generación de
        contenido hasta la mejora de la productividad.
      </p>
      <div className="flex items-center space-x-2 mt-4">
        <MegaphoneIcon className="w-4 h-4" />
        <span className="text-sm">Llama 3</span>
        <span className="text-sm text-gray-700">— Generative text</span>
      </div>
    </div>
  );
}
