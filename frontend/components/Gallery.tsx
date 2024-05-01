import { FC, useEffect, useState } from "react";
import FsLightbox from "fslightbox-react";
import Image from "next/image";
import { useRouter } from "next/router";

const Gallery: FC<{images: any, menus: any}> = ({images, menus}) => {
  const { query } = useRouter();
  const [menuLightBox, setMenuLightBox] = useState<boolean>(false);
  const [galleryLightBox, setGalleryLightBox] = useState<boolean>(false);

  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [slide, setSlide] = useState<number>(1);

  useEffect(() => {
    setGalleryLightBox(galleryLightBox);
    setMenuLightBox(menuLightBox);
    
    setSlide(1);
  }, [query]);
  
  const toggleGallery = (sl: number) => {
    setGalleryImages(images.map((image: any, index: number) => image.attributes.url));
    setSlide(sl);
    setGalleryLightBox(!galleryLightBox);
  }

  return (
    <div className="h-max lg:pt-36 bg-primary text-tertiary flex flex-col items-center justify-center text-left lg:space-y-16 space-y-10 xl:px-margin-lg lg:px-margin-base sm:px-margin-sm px-margin-xs font-fontRegular">
        <FsLightbox
          toggler={menuLightBox}
          sources={[
            menus[0].attributes.url,
            menus[1].attributes.url
          ]}
			  />
        <FsLightbox
          toggler={galleryLightBox}
          slide={slide}
          sources={galleryImages}
			  />

        <div className="w-full lg:snap-center snap-none">
          <h3 className="font-fontBold lg:text-5xl text-3xl lg:mb-6 mb-3">Menu</h3>
          <div className="h-64 w-full overflow-hidden flex relative">
            <div onClick={() => setMenuLightBox(!menuLightBox)} className="w-64 h-full bg-primary/60 cursor-pointer text-3xl absolute font-fontBold flex items-center justify-center">+2</div>
            <Image width={1000} height={1000} src={menus[0].attributes.url} alt="" className="h-max w-64 rounded-lg" />
          </div>
        </div>
        {images[0] && <div className="w-full lg:snap-center snap-none overflow-hidden">
          <h3 className="font-fontBold lg:text-5xl text-3xl lg:mb-6 mb-3">Gallery</h3>
          <div className="grid grid-cols-3 w-max grid-rows-2 gap-x-5 gap-y-3 rounded-lg" style={{ gridTemplateColumns: "auto 1fr auto" }}>
            <div onClick={() => toggleGallery(1)} className="h-64 w-96 row-span-2 cursor-pointer relative"><Image fill={true} src={images[0].attributes.url} alt="" className="h-full rounded-lg" />{images.length > 1 && <div onClick={() => toggleGallery(2)} className="h-full lg:hidden flex  w-full rounded-lg absolute bottom-0 text-2xl font-fontBold bg-primary/60 items-center justify-center cursor-pointer">+{images.length}</div>}</div>
            {images.length > 1 && <div onClick={() => toggleGallery(2)} className="lg:block hidden h-64 w-96 row-span-2 cursor-pointer relative"><Image fill={true} src={images[1].attributes.url} alt="" className="h-full rounded-lg" />{images.length > 2 && <div onClick={() => toggleGallery(3)} className="h-full xl:hidden flex w-full rounded-lg absolute bottom-0 text-2xl font-fontBold bg-primary/60 items-center justify-center cursor-pointer">+{images.length - 1}</div>}</div>}
            {images.length > 2 && <div onClick={() => toggleGallery(3)} className="xl:block hidden h-[7.65rem] w-36 cursor-pointer relative"><Image fill={true} src={images[2].attributes.url} alt="" className="h-full rounded-lg" /></div>}
            {images.length > 3 && <div onClick={() => toggleGallery(4)} className="xl:block hidden h-[7.65rem] w-36 cursor-pointer relative"><Image fill={true} src={images[3].attributes.url} alt="" className="h-full rounded-lg" />{images.length > 4 && <div onClick={() => toggleGallery(5)} className="h-full w-full rounded-lg absolute bottom-0 text-2xl font-fontBold bg-primary/60 flex items-center justify-center cursor-pointer">+{images.length - 3}</div>}</div>}
          </div>
        </div>}
    </div>
  )
}

export default Gallery;