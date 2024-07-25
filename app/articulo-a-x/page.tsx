"use client";
import { ClipboardIcon, XIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useCompletion } from "ai/react";

export default function ArticleToX() {
  const { completion, handleInputChange, handleSubmit, isLoading } =
    useCompletion({
      api: "http://127.0.0.1:5000/article-to-x",
    });

  const copiarTextoAlPortapapeles = (id: string, texto: string) => {
    navigator.clipboard.writeText(texto).then(() => {
      console.log(`texto copiado del id: ${id}`);
    });
  };

  const setupCompletion = completion.replaceAll(
    "Here is the Twitter thread:",
    ""
  );

  return (
    <main className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
      <div className="col-span-2">
        <div className="flex justify-between">
          <div className="flex flex-col gap-2 mb-4">
            <h1 className="text-3xl font-bold  flex items-center gap-2">
              Articulo a{" "}
              <XIcon className="w-9 h-9 text-white" stroke={"#fff"} />
            </h1>
            <div className="flex gap-2">
              <Button className="bg-white hover:bg-gray-100 text-black text-sm h-6 cursor-not-allowed">
                Beta
              </Button>
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black text-sm h-6 cursor-not-allowed">
                Español
              </Button>
              <Button className="bg-teal-500 hover:bg-teal-600 text-black text-sm h-6 cursor-not-allowed">
                Inglés
              </Button>
            </div>
            <span className="text-sm">
              Agrega el titulo, descripcion para tener un mejor resultado
            </span>
          </div>

          <Button
            className="bg-green-500 hover:bg-green-600 font-bold text-lg"
            onClick={handleSubmit}
          >
            Convertir a 🧵
          </Button>
        </div>
        <textarea
          onChange={handleInputChange}
          id="article-to-x-text-area"
          className="w-full md:h-[calc(100vh-200px)] p-4 rounded-lg shadow-lg bg-black text-white"
          placeholder="Escribe tu articulo..."
        ></textarea>
      </div>
      <div className="md:overflow-auto md:pr-4 md:h-[calc(100vh-120px)]">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          Post
          {isLoading && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="animate-spin w-6 h-6"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#fff"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 3a9 9 0 1 0 9 9" />
            </svg>
          )}
        </h1>
        {/* Tweet principal */}

        {setupCompletion.length > 0 &&
          setupCompletion.includes("[TWEET]") &&
          setupCompletion
            .split("[TWEET]")
            .slice(0, 1)
            .map((tweet, index) => (
              <div
                key={`tweet-principal-${index}`}
                className="w-full border-b-2 border-white"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="w-full text-white flex gap-4 items-center">
                    <img
                      src="https://vercel.com/api/www/avatar/"
                      alt=""
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-bold text-base">AIhub</p>
                      <p className="text-sm text-gray-400">@aihub</p>
                    </div>
                  </div>
                  <div
                    className="min-w-[150px] bg-white flex justify-center items-center rounded-full cursor-pointer text-black p-1"
                    onClick={() =>
                      copiarTextoAlPortapapeles("tweet-principal", tweet)
                    }
                  >
                    <span className="text-sm">Copiar texto</span>
                    <ClipboardIcon className="w-8 h-8" stroke={"#000"} />
                  </div>
                </div>
                <p className="break-words mt-2">{tweet}</p>
                <div className="h-[30px]" />
              </div>
            ))}

        {/* thread tweet */}

        {setupCompletion.length > 0 &&
          setupCompletion.includes("[TWEET]") &&
          setupCompletion
            .split("[TWEET]")
            .slice(1)
            .map((tweet, index) => {
              if (tweet.length > 0) {
                return (
                  <div key={`tweet-thread-${index}`} className="flex gap-4">
                    <div className="flex flex-col items-center max-w-[40px] w-full">
                      <div className="w-[2px] h-[10px] bg-white"></div>
                      <img
                        src="https://vercel.com/api/www/avatar/"
                        alt=""
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="w-[2px] h-full bg-white"></div>
                    </div>

                    <div>
                      <div className="flex content-between mt-[8px]">
                        <div className="w-full text-white flex gap-2 items-center">
                          <p className="font-bold text-base">AIhub</p>
                          <p className="text-sm text-gray-400">@aihub</p>
                        </div>
                        <div
                          className="min-w-[150px] bg-white flex justify-center items-center rounded-full cursor-pointer text-black p-1"
                          onClick={() =>
                            copiarTextoAlPortapapeles(
                              `tweet-thread-${index}`,
                              tweet
                            )
                          }
                        >
                          <span className="text-sm">Copiar texto</span>
                          <ClipboardIcon className="w-8 h-8" stroke={"#000"} />
                        </div>
                      </div>
                      <p className="break-words mt-2">{tweet}</p>
                      <div className="h-[30px]" />
                    </div>
                  </div>
                );
              }
            })}
      </div>
    </main>
  );
}
