import { CreateProfileLayout } from "@/components/layouts/create-profile/CreateProfileLayout";
import Image from "next/image";
import AvatarImage from "@/public/assets/svgs/icons/other/avatar.svg";
import {
  Button,
  DatePicker,
  Input,
  PhoneInput,
  SearchCombobox,
} from "@/components/atoms";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { countries } from "country-data-list";
import { Value } from "react-phone-number-input";
import { motion } from "motion/react";
import { useRouter } from "next/router";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Icon } from "@iconify/react";
import { Slider } from "@/components/ui/slider";
import { Move } from "lucide-react";

const EDITOR_PREVIEW_SIZE = 300;

export default function Location() {
  const [formData, setFormData] = useState<any>({
    birthday: null,
    country: "United States",
    address: "",
    photo: null,
  });
  const [errors, setErrors] = useState<any>();
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [photoZoom, setPhotoZoom] = useState(0);
  const [photoRotation, setPhotoRotation] = useState(0);
  const [photoOffset, setPhotoOffset] = useState({ x: 0, y: 0 });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAttachingPhoto, setIsAttachingPhoto] = useState(false);
  const dragStartRef = useRef<{
    x: number;
    y: number;
    offsetX: number;
    offsetY: number;
  } | null>(null);

  const handleInputChange = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    if (!formData.photo) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(formData.photo);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [formData.photo]);

  const handlePhotoChange = (file: File | null) => {
    setFormData((prev: any) => ({ ...prev, photo: file }));
    setPhotoZoom(0);
    setPhotoRotation(0);
    setPhotoOffset({ x: 0, y: 0 });

    if (!file && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleZoomIn = () => {
    setPhotoZoom((prev) => Math.min(prev + 10, 100));
  };

  const handleRotate = () => {
    setPhotoRotation((prev) => prev - 90);
  };

  const clampPhotoOffset = (
    offset: { x: number; y: number },
    size = EDITOR_PREVIEW_SIZE
  ) => {
    const maxOffset = Math.max(0, (size * (scale - 1)) / 2);

    return {
      x: Math.min(maxOffset, Math.max(-maxOffset, offset.x)),
      y: Math.min(maxOffset, Math.max(-maxOffset, offset.y)),
    };
  };

  const getPreviewOffset = (size: number) => {
    const scaledOffset = {
      x: (photoOffset.x * size) / EDITOR_PREVIEW_SIZE,
      y: (photoOffset.y * size) / EDITOR_PREVIEW_SIZE,
    };

    return clampPhotoOffset(scaledOffset, size);
  };

  const buildEditedPhoto = async () => {
    if (!previewUrl || !formData.photo) return null;

    const sourceImage = await new Promise<HTMLImageElement>(
      (resolve, reject) => {
        const image = new window.Image();
        image.onload = () => resolve(image);
        image.onerror = () =>
          reject(new Error("Unable to load selected photo."));
        image.src = previewUrl;
      }
    );

    const outputSize = 600;
    const previewSize = EDITOR_PREVIEW_SIZE;
    const scaleRatio = outputSize / previewSize;
    const canvas = document.createElement("canvas");
    canvas.width = outputSize;
    canvas.height = outputSize;

    const context = canvas.getContext("2d");
    if (!context) return null;

    const coverScale = Math.max(
      outputSize / sourceImage.width,
      outputSize / sourceImage.height
    );
    const imageWidth = sourceImage.width * coverScale;
    const imageHeight = sourceImage.height * coverScale;
    const clampedOffset = clampPhotoOffset(photoOffset, previewSize);
    const translateX = clampedOffset.x * scaleRatio;
    const translateY = clampedOffset.y * scaleRatio;

    context.save();
    context.beginPath();
    context.arc(outputSize / 2, outputSize / 2, outputSize / 2, 0, Math.PI * 2);
    context.clip();
    context.translate(outputSize / 2 + translateX, outputSize / 2 + translateY);
    context.rotate((photoRotation * Math.PI) / 180);
    context.scale(scale, scale);
    context.drawImage(
      sourceImage,
      -imageWidth / 2,
      -imageHeight / 2,
      imageWidth,
      imageHeight
    );
    context.restore();

    const fileType =
      formData.photo.type && formData.photo.type.startsWith("image/")
        ? formData.photo.type
        : "image/png";
    const extension = fileType.split("/")[1] || "png";
    const fileName =
      formData.photo.name?.replace(/\.[^/.]+$/, "") || "profile-photo";

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, fileType, 0.92)
    );

    if (!blob) return null;

    return new File([blob], `${fileName}-edited.${extension}`, {
      type: blob.type || fileType,
    });
  };

  const handleAttachPhoto = async () => {
    if (!formData.photo) {
      setOpen(false);
      return;
    }

    try {
      setIsAttachingPhoto(true);
      const editedPhoto = await buildEditedPhoto();

      if (!editedPhoto) return;

      handlePhotoChange(editedPhoto);
      setOpen(false);
    } catch (error) {
      console.error("Failed to attach edited photo", error);
    } finally {
      setIsAttachingPhoto(false);
    }
  };

  const handlePhotoDragStart = (e: PointerEvent<HTMLDivElement>) => {
    if (!previewUrl || photoZoom === 0) return;

    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      offsetX: photoOffset.x,
      offsetY: photoOffset.y,
    };

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePhotoDragMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!dragStartRef.current || !previewUrl || photoZoom === 0) return;

    const { x, y, offsetX, offsetY } = dragStartRef.current;

    setPhotoOffset(
      clampPhotoOffset({
        x: offsetX + (e.clientX - x),
        y: offsetY + (e.clientY - y),
      })
    );
  };

  const handlePhotoDragEnd = (e: PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }

    dragStartRef.current = null;
  };

  const scale = 1 + photoZoom / 100;
  const canMovePhoto = !!previewUrl && photoZoom > 0;

  useEffect(() => {
    setPhotoOffset((prev) => {
      const next = clampPhotoOffset(prev);

      if (next.x === prev.x && next.y === prev.y) {
        return prev;
      }

      return next;
    });
  }, [photoZoom]);

  const renderPhotoPreview = (size: number, showMoveLabel = false) => {
    if (!previewUrl) {
      return (
        <div
          className="rounded-full object-cover bg-slate-100"
          style={{ width: size, height: size }}
        />
      );
    }

    const previewOffset = getPreviewOffset(size);

    return (
      <div
        className={`relative overflow-hidden rounded-full bg-slate-100 ${
          showMoveLabel && canMovePhoto ? "cursor-move touch-none" : ""
        }`}
        style={{ width: size, height: size }}
        onPointerDown={showMoveLabel ? handlePhotoDragStart : undefined}
        onPointerMove={showMoveLabel ? handlePhotoDragMove : undefined}
        onPointerUp={showMoveLabel ? handlePhotoDragEnd : undefined}
        onPointerLeave={showMoveLabel ? handlePhotoDragEnd : undefined}
        onPointerCancel={showMoveLabel ? handlePhotoDragEnd : undefined}
      >
        <div
          className="absolute inset-0"
          style={{
            transform: `translate(${previewOffset.x}px, ${previewOffset.y}px)`,
          }}
        >
          <div
            className="relative h-full w-full transition-transform duration-200"
            style={{
              transform: `scale(${scale}) rotate(${photoRotation}deg)`,
              transformOrigin: "center",
            }}
          >
            <Image
              src={previewUrl}
              alt="Photo"
              fill
              unoptimized
              className="object-cover select-none pointer-events-none"
            />
          </div>
        </div>

        {showMoveLabel && canMovePhoto && (
          <div className="bg-white/80 absolute bottom-4 left-1/2 -translate-x-1/2 mx-auto py-1 px-2 rounded-full flex items-center gap-2">
            <Move className="w-5 h-5" />
            <span className="text-sm font-medium">Move</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <CreateProfileLayout
      title="A few last details, then you can check and publish your profile."
      description="A professional photo helps you build trust with your clients. To keep things safe and simple, they’ll pay you through us - which is why we need your personal information."
      currentStep={10}
      totalSteps={10}
      seo={{
        title:
          "A few last details, then you can check and publish your profile.",
        description:
          "A professional photo helps you build trust with your clients. To keep things safe and simple, they’ll pay you through us - which is why we need your personal information.",
        url: "/nx/create-profile/location",
      }}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handlePhotoChange(e.target.files?.[0] || null)}
      />
      <div className="flex items-start">
        <div className="flex flex-col items-center gap-6 px-6">
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => setOpen(true)}
          >
            {previewUrl ? (
              renderPhotoPreview(100)
            ) : (
              <Image src={AvatarImage} alt="Avatar" width={100} height={100} />
            )}
          </button>
          <Button
            type="outline"
            size="medium"
            label={formData?.photo ? "Edit photo" : "Upload photo"}
            icon={formData?.photo ? "mdi:pencil-outline" : "mdi:plus"}
            classname="font-medium! text-sm! py-1.5! px-5! rounded-full!"
            onClick={() => setOpen(true)}
          />
        </div>

        <form className="flex-1 space-y-6">
          <div className="flex">
            <DatePicker
              label="Date of Birth"
              placeholder="Select date"
              name="birthday"
              value={formData.birthday}
              required
              onChange={(date: Date) =>
                handleInputChange({ target: { name: "birthday", value: date } })
              }
            />
          </div>

          <div className="bg-slate-200 h-[1px]"></div>

          <SearchCombobox
            label="Country"
            labelClassName="text-sm font-medium"
            classname="w-1/2"
            name="country"
            options={countries.all.map((c) => c.name)}
            error={errors?.country}
            defaultOption={formData?.country}
            required
            onSelect={(v: string) => setFormData({ ...formData, country: v })}
          />

          <div className="flex items-center gap-6">
            <Input
              type="text"
              name="address"
              label="Street address"
              labelClassName="text-sm font-medium"
              placeholder="Enter street address"
              classname="w-2/3"
              required
              value={formData.address}
              onChange={handleInputChange}
            />

            <Input
              type="text"
              name="address"
              label="Apt/Suite"
              labelClassName="text-sm font-medium"
              placeholder="Apt/Suite (Optional)"
              classname="flex-1"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center gap-6">
            <Input
              type="text"
              name="city"
              label="City"
              labelClassName="text-sm font-medium"
              placeholder="Enter city"
              classname="flex-1"
              required
              value={formData.city}
              onChange={handleInputChange}
            />

            <Input
              type="text"
              name="state"
              label="State/Province"
              labelClassName="text-sm font-medium"
              placeholder="Enter state/province"
              classname="flex-1"
              required
              value={formData.state}
              onChange={handleInputChange}
            />

            <Input
              type="text"
              name="zip"
              label="ZIP/Postal code"
              labelClassName="text-sm font-medium"
              placeholder="Enter ZIP/Postal code"
              classname="flex-1"
              required
              value={formData.city}
              onChange={handleInputChange}
            />
          </div>

          <PhoneInput
            label="Phone"
            placeholder="Enter number"
            defaultCountry="US"
            required
            classname="w-1/2!"
            value={formData.phone}
            onChange={(v: Value) => setFormData({ ...formData, phone: v })}
          />
        </form>
      </div>

      <div className="mt-20 flex items-center justify-between font-medium">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="py-2 px-4 rounded-full text-sm border border-slate-400"
          onClick={() => router.back()}
        >
          Back
        </motion.button>

        <Button
          type="primary"
          label="Review your profile"
          classname="font-medium! text-sm! py-2.5! px-5! rounded-full!"
          onClick={() => router.push("/nx/create-profile/location")}
        />
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex min-w-3xl flex-col overflow-hidden">
          <DialogHeader className="shrink-0 p-4">
            <DialogTitle className="text-3xl">Your photo</DialogTitle>
          </DialogHeader>

          <div className="flex items-start gap-10">
            <div className="flex-1 flex flex-col items-center justify-center gap-4">
              <div className="rounded-full transition-all relative duration-200 border border-dotted border-slate-400 w-[300px] h-[300px] overflow-hidden">
                {!previewUrl ? (
                  <button
                    type="button"
                    className="cursor-pointer hover:bg-slate-100 w-full h-full flex flex-col items-center justify-center"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="flex flex-col items-center justify-center gap-2 w-[40%]">
                      <Icon
                        icon="material-symbols-light:account-circle-outline"
                        className="w-14 h-14 text-slate-800"
                      />
                      <p className="text-sm text-slate-600">
                        <span className="text-black underline">Upload</span> or
                        drop image here
                      </p>
                    </div>
                  </button>
                ) : (
                  renderPhotoPreview(300, true)
                )}
              </div>

              {!formData?.photo ? (
                <p className="text-sm text-slate-600">
                  250x250 Min size/ 5MB Max
                </p>
              ) : (
                <div className="space-y-8 w-full mt-2 px-6">
                  <div className="flex items-center gap-4">
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.95 }}
                      className="cursor-pointer"
                      onClick={handleZoomIn}
                    >
                      <Icon
                        icon="material-symbols-light:zoom-in-rounded"
                        className="w-6 h-6"
                      />
                    </motion.button>
                    <Slider
                      className="flex-1"
                      value={[photoZoom]}
                      onValueChange={(value) => setPhotoZoom(value[0] || 0)}
                      max={100}
                      step={1}
                    />
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.95 }}
                      className="cursor-pointer"
                      onClick={handleRotate}
                    >
                      <Icon
                        icon="material-symbols-light:rotate-left-rounded"
                        className="w-6 h-6"
                      />
                    </motion.button>
                  </div>

                  <div className="flex items-center justify-center">
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.95 }}
                      className="cursor-pointer text-sm font-medium flex items-center gap-2 text-blue-600"
                      onClick={() => handlePhotoChange(null)}
                    >
                      <Icon icon="mdi:trash-can-outline" className="w-5 h-5" />
                      Delete current image
                    </motion.button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex-1 space-y-4">
              <h3 className="text-3xl">
                Show clients the best version of yourself!
              </h3>

              <div className="flex items-end gap-4">
                {renderPhotoPreview(100)}
                {renderPhotoPreview(80)}
                {renderPhotoPreview(60)}
                {renderPhotoPreview(40)}
              </div>

              <div className="text-sm">
                <p className="font-medium">Must be an actual photo of you.</p>
                <p className="text-slate-900 mt-1">
                  Logos, clip-art, group photos, and digitally-altered images
                  are not allowed.
                </p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer py-2 px-4 rounded-full text-smfont-medium"
              >
                Cancel
              </motion.button>
            </DialogClose>

            <Button
              type="primary"
              label="Attach photo"
              classname="py-2.5! px-5! rounded-full! text-sm! font-medium!"
              disabled={!formData.photo}
              loading={isAttachingPhoto}
              onClick={handleAttachPhoto}
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </CreateProfileLayout>
  );
}
