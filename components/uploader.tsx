
interface UploaderProps {
  image: string | null;
  loading: boolean;
  onUpload: (file: File) => void;
}

export function Uploader({ image, loading, onUpload }: UploaderProps) {
  return (
    <div
      className="relative w-full rounded-lg bg-card p-4 md:mx-0"
      id="blur-card"
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="flex h-48 w-full items-center justify-center rounded-md border-2 border-dashed border-muted-foreground">
          <input
            type="file"
            onChange={(e: any) => onUpload(e.target.files[0])}
            className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
          />
          <div className="text-center flex flex-col items-center gap-4">
            {loading ? (
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
            ) : image ? (
              <img src={image} alt="" className="w-40 h-40 object-cover rounded" />
            ) : (
              <>
                <span className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40px"
                    height="40px"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-upload"
                    data-darkreader-inline-stroke=""
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                </span>{" "}
                <div>
                  <p>Coloque la imagen aquí</p>
                  <p>- o -</p>
                  <p>Haga click para cargar</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
