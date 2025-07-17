import { Input } from "@/components/ui/input";
import { SyntheticEvent, useRef, useState } from "react";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
  type Crop,
} from "react-image-crop";
import { Button } from "./ui/button";
import setCanvasPreview from "./setCanvasPreview";

const ASPECT_RATIO = 1;
const MIN_DIMENSTION = 150;

type ImageCropperProps = {
  setImage: (img: File) => void;
};

const ImageCropper = ({ setImage }: ImageCropperProps) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop | undefined>(undefined);
  const [error, setError] = useState<string>("");

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    // once the image gets fully loaded into file reader
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";

      imageElement.src = imageUrl;

      imageElement.addEventListener("load", (e) => {
        const target = e.currentTarget as HTMLImageElement;

        if (error) setError("");

        const { naturalWidth, naturalHeight } = target;

        if (naturalWidth < MIN_DIMENSTION || naturalHeight < MIN_DIMENSTION) {
          setError("Image must be at least 150 x 150 pixels");
          return setImgSrc("");
        }
      });

      setImgSrc(imageUrl);
    });
    reader.readAsDataURL(file);
  };

  const onImageLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSTION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height,
    );

    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  return (
    <>
      <Input
        id="picture"
        type="file"
        accept="image/*"
        onChange={onSelectFile}
      />
      {error && <p className="text-red-400">{error}</p>}
      {imgSrc && (
        <div className="flex gap-y-4 flex-col items-center">
          <ReactCrop
            onChange={(percentCrop) => setCrop(percentCrop)}
            crop={crop}
            circularCrop
            keepSelection
            aspect={ASPECT_RATIO}
            minWidth={MIN_DIMENSTION}
          >
            <img
              ref={imgRef}
              src={imgSrc}
              alt="Upload"
              style={{ maxHeight: "70vh" }}
              onLoad={onImageLoad}
            />
          </ReactCrop>
          <Button
            onClick={() => {
              if (imgRef.current && previewCanvasRef.current && crop) {
                setCanvasPreview(
                  imgRef.current,
                  previewCanvasRef.current,
                  convertToPixelCrop(
                    crop,
                    imgRef.current?.width,
                    imgRef.current?.height,
                  ),
                  (file) => {
                    setImage(file);
                  },
                );
              }
            }}
          >
            Crop Image
          </Button>
        </div>
      )}
      {crop && (
        <canvas
          ref={previewCanvasRef}
          className="mt-4"
          style={{
            border: "1px solid black",
            objectFit: "contain",
            width: 150,
            height: 150,
          }}
        />
      )}
    </>
  );
};

export default ImageCropper;
